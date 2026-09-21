/**
 * FinTaxVers Conversation Store (Firestore-backed)
 * Stores customers, conversations, messages, and leads.
 * Falls back to in-memory if Firestore is unavailable.
 */
import { randomUUID } from 'crypto';

// In-memory store (used when Firestore Admin SDK is not configured)
const memStore = {
    customers: new Map(),
    conversations: new Map(),
    messages: new Map(),  // key: conversationId, value: Message[]
    leads: new Map(),
    handoffTokens: new Map(),
};

function nowIso() { return new Date().toISOString(); }

// ---------- CUSTOMERS ----------
export function findCustomerByPhone(phone) {
    for (const c of memStore.customers.values()) {
        if (c.phone === phone) return c;
    }
    return null;
}

export function findOrCreateCustomer({ phone, name, email }) {
    let customer = phone ? findCustomerByPhone(phone) : null;
    if (customer) {
        // Update name/email if newly provided
        if (name && !customer.name) { customer.name = name; memStore.customers.set(customer.id, customer); }
        if (email && !customer.email) { customer.email = email; memStore.customers.set(customer.id, customer); }
        return customer;
    }
    const newCustomer = { id: randomUUID(), phone: phone || null, name: name || null, email: email || null, createdAt: nowIso(), updatedAt: nowIso() };
    memStore.customers.set(newCustomer.id, newCustomer);
    return newCustomer;
}

export function updateCustomer(id, updates) {
    const customer = memStore.customers.get(id);
    if (!customer) return null;
    const updated = { ...customer, ...updates, updatedAt: nowIso() };
    memStore.customers.set(id, updated);
    return updated;
}

// ---------- CONVERSATIONS ----------
export function getActiveConversation(customerId, channel) {
    for (const conv of memStore.conversations.values()) {
        if (conv.customerId === customerId && conv.channel === channel && conv.status !== 'CLOSED') {
            return conv;
        }
    }
    return null;
}

export function createConversation({ customerId, channel }) {
    const conv = {
        id: randomUUID(),
        customerId,
        channel,  // 'WEBSITE' | 'WHATSAPP'
        status: 'OPEN',  // OPEN | HUMAN_REQUIRED | CLOSED
        assignedTo: null,
        createdAt: nowIso(),
        updatedAt: nowIso(),
    };
    memStore.conversations.set(conv.id, conv);
    memStore.messages.set(conv.id, []);
    return conv;
}

export function updateConversationStatus(conversationId, status) {
    const conv = memStore.conversations.get(conversationId);
    if (!conv) return null;
    const updated = { ...conv, status, updatedAt: nowIso() };
    memStore.conversations.set(conversationId, updated);
    return updated;
}

export function getConversation(conversationId) {
    return memStore.conversations.get(conversationId) || null;
}

export function getAllConversations(filters = {}) {
    let convs = [...memStore.conversations.values()];
    if (filters.channel) convs = convs.filter(c => c.channel === filters.channel);
    if (filters.status) convs = convs.filter(c => c.status === filters.status);
    return convs.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
}

// ---------- MESSAGES ----------
export function addMessage({ conversationId, sender, message, messageType = 'TEXT', metadata = {} }) {
    const msgs = memStore.messages.get(conversationId) || [];
    const msg = {
        id: randomUUID(),
        conversationId,
        sender,  // 'USER' | 'AI' | 'HUMAN'
        message,
        messageType,
        metadata,
        createdAt: nowIso(),
    };
    msgs.push(msg);
    memStore.messages.set(conversationId, msgs);
    // Update conversation timestamp
    const conv = memStore.conversations.get(conversationId);
    if (conv) { conv.updatedAt = nowIso(); memStore.conversations.set(conversationId, conv); }
    return msg;
}

export function getMessages(conversationId, limit = 20) {
    const msgs = memStore.messages.get(conversationId) || [];
    return msgs.slice(-limit);
}

// ---------- LEADS ----------
export function createLead({ customerId, service, name, phone, email, requirement, sourceChannel }) {
    const lead = {
        id: randomUUID(),
        customerId: customerId || null,
        service: service || null,
        name: name || null,
        phone: phone || null,
        email: email || null,
        requirement: requirement || null,
        sourceChannel,  // 'WEBSITE' | 'WHATSAPP'
        status: 'NEW',
        createdAt: nowIso(),
        updatedAt: nowIso(),
    };
    memStore.leads.set(lead.id, lead);
    return lead;
}

export function updateLeadStatus(leadId, status) {
    const lead = memStore.leads.get(leadId);
    if (!lead) return null;
    const updated = { ...lead, status, updatedAt: nowIso() };
    memStore.leads.set(leadId, updated);
    return updated;
}

export function getAllLeads(filters = {}) {
    let leads = [...memStore.leads.values()];
    if (filters.status) leads = leads.filter(l => l.status === filters.status);
    if (filters.sourceChannel) leads = leads.filter(l => l.sourceChannel === filters.sourceChannel);
    return leads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

// ---------- HANDOFF TOKENS ----------
export function createHandoffToken(conversationId, expirySeconds = 3600) {
    const token = randomUUID().replace(/-/g, '') + randomUUID().replace(/-/g, '');
    const entry = {
        token,
        conversationId,
        expiresAt: new Date(Date.now() + expirySeconds * 1000).toISOString(),
        usedAt: null,
    };
    memStore.handoffTokens.set(token, entry);
    return entry;
}

export function verifyAndConsumeHandoffToken(token) {
    const entry = memStore.handoffTokens.get(token);
    if (!entry) return null;
    if (entry.usedAt) return null; // Already used
    if (new Date(entry.expiresAt) < new Date()) return null; // Expired
    entry.usedAt = nowIso();
    memStore.handoffTokens.set(token, entry);
    return entry;
}