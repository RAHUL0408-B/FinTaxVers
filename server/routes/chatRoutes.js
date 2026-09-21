/**
 * FinTaxVers Chat API Routes
 * POST /api/chat — Process chat message with RAG+LLM
 * POST /api/chat/handoff — Generate secure WhatsApp handoff token
 * GET /api/chat/handoff/:token — Verify and consume handoff token
 */
import { Router } from 'express';
import { processChat } from '../services/aiChatService.js';
import {
    findOrCreateCustomer,
    getActiveConversation,
    createConversation,
    getMessages,
    addMessage,
    updateConversationStatus,
    createLead,
    createHandoffToken,
    verifyAndConsumeHandoffToken,
    getConversation,
} from '../services/conversationStore.js';
import { config } from '../config/env.js';

const router = Router();

// Simple rate limiting store (per IP)
const requestCounts = new Map();
setInterval(() => requestCounts.clear(), config.rateLimitWindowMs);

function rateLimit(req, res, next) {
    const ip = req.ip || req.connection.remoteAddress;
    const count = (requestCounts.get(ip) || 0) + 1;
    requestCounts.set(ip, count);
    if (count > config.rateLimitMaxRequests) {
        return res.status(429).json({ error: 'Too many requests. Please slow down.' });
    }
    next();
}

function sanitize(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/<[^>]*>/g, '').substring(0, 2000).trim();
}

/**
 * POST /api/chat
 * Body: { conversationId?, message, channel?, customerName?, customerPhone? }
 */
router.post('/', rateLimit, async (req, res) => {
    try {
        const message = sanitize(req.body.message || '');
        if (!message) return res.status(400).json({ error: 'message is required' });
        
        const channel = req.body.channel === 'WHATSAPP' ? 'WHATSAPP' : 'WEBSITE';
        const customerName = sanitize(req.body.customerName || '');
        const customerPhone = sanitize(req.body.customerPhone || '');
        const customerEmail = sanitize(req.body.customerEmail || '');
        let conversationId = sanitize(req.body.conversationId || '');
        
        // Find or create customer
        const customer = findOrCreateCustomer({
            phone: customerPhone || null,
            name: customerName || null,
            email: customerEmail || null,
        });
        
        // Find or create conversation
        let conversation;
        if (conversationId) {
            conversation = getConversation(conversationId);
        }
        if (!conversation) {
            conversation = getActiveConversation(customer.id, channel) || createConversation({ customerId: customer.id, channel });
        }
        conversationId = conversation.id;
        
        // Get conversation history for context window
        const history = getMessages(conversationId, 10).map(m => ({
            role: m.sender === 'USER' ? 'user' : 'assistant',
            content: m.message,
        }));
        
        // Store user message
        addMessage({ conversationId, sender: 'USER', message, messageType: 'TEXT' });
        
        // AI processing
        const { reply, sources, intent, requiresHuman } = await processChat({
            message,
            conversationHistory: history,
            channel,
        });
        
        // Store AI response
        addMessage({
            conversationId,
            sender: 'AI',
            message: reply,
            messageType: 'TEXT',
            metadata: { sources, intent },
        });
        
        // Auto-update conversation status if human is required
        if (requiresHuman) {
            updateConversationStatus(conversationId, 'HUMAN_REQUIRED');
        }
        
        // Auto-create lead if service intent detected
        let leadCreated = false;
        const serviceIntents = ['GST_REGISTRATION', 'GST_FILING', 'ITR_FILING', 'TAX_AUDIT', 'BUSINESS_LOAN', 'COMPANY_REGISTRATION', 'MSME', 'SUBSIDY'];
        if (serviceIntents.includes(intent) && customerPhone) {
            createLead({
                customerId: customer.id,
                service: intent,
                name: customerName || null,
                phone: customerPhone,
                email: customerEmail || null,
                requirement: message.substring(0, 300),
                sourceChannel: channel,
            });
            leadCreated = true;
        }
        
        return res.json({
            conversationId,
            customerId: customer.id,
            message: reply,
            sources,
            intent,
            requiresHuman,
            leadCreated,
        });
        
    } catch (err) {
        console.error('[ChatRoute] Error:', err.message);
        return res.status(500).json({
            error: 'An error occurred while processing your message.',
            message: "I'm unable to respond right now. Please contact FinTaxVers directly: +91-8928895195 or contact@fintaxvers.com",
        });
    }
});

/**
 * POST /api/chat/handoff
 * Generate a secure token for Website → WhatsApp conversation continuity.
 * Body: { conversationId }
 */
router.post('/handoff', async (req, res) => {
    try {
        const conversationId = sanitize(req.body.conversationId || '');
        if (!conversationId) return res.status(400).json({ error: 'conversationId is required' });
        
        const conversation = getConversation(conversationId);
        if (!conversation) return res.status(404).json({ error: 'Conversation not found' });
        
        const tokenEntry = createHandoffToken(conversationId, config.handoffTokenExpirySeconds);
        
        // Build WhatsApp deep link with token embedded in message
        const waNumber = config.whatsappPhoneNumberId ? '918928895195' : '918928895195';
        const startMessage = encodeURIComponent(`Hi FinTaxVers! I'm continuing my conversation from your website. My token is: ${tokenEntry.token}`);
        const waLink = `https://wa.me/${waNumber}?text=${startMessage}`;
        
        return res.json({
            token: tokenEntry.token,
            expiresAt: tokenEntry.expiresAt,
            whatsappLink: waLink,
        });
    } catch (err) {
        console.error('[ChatRoute/handoff] Error:', err.message);
        return res.status(500).json({ error: 'Failed to generate handoff token.' });
    }
});

/**
 * GET /api/chat/handoff/:token
 * Verify a handoff token (used by WhatsApp webhook to link conversation).
 */
router.get('/handoff/:token', async (req, res) => {
    try {
        const token = sanitize(req.params.token || '');
        const entry = verifyAndConsumeHandoffToken(token);
        if (!entry) {
            return res.status(404).json({ error: 'Invalid or expired handoff token.' });
        }
        const conversation = getConversation(entry.conversationId);
        return res.json({ conversationId: entry.conversationId, conversation });
    } catch (err) {
        console.error('[ChatRoute/handoff/verify] Error:', err.message);
        return res.status(500).json({ error: 'Failed to verify handoff token.' });
    }
});

export default router;