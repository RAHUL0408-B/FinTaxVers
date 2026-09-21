/**
 * FinTaxVers WhatsApp Business Cloud API Webhook
 * Handles Meta WhatsApp Business Platform verification and incoming messages.
 * Official API only — no unofficial WhatsApp Web automation.
 * 
 * Setup required in Meta Developer Console:
 * 1. Create a WhatsApp Business App
 * 2. Set webhook URL: https://yourdomain.com/api/whatsapp/webhook
 * 3. Verify token: value of WHATSAPP_VERIFY_TOKEN in .env
 * 4. Subscribe to: messages
 */
import { Router } from 'express';
import crypto from 'crypto';
import { processChat } from '../services/aiChatService.js';
import {
    findOrCreateCustomer,
    getActiveConversation,
    createConversation,
    getMessages,
    addMessage,
    updateConversationStatus,
    createLead,
    verifyAndConsumeHandoffToken,
    getConversation,
} from '../services/conversationStore.js';
import { config, isWhatsAppConfigured } from '../config/env.js';

const router = Router();

/**
 * GET /api/whatsapp/webhook
 * Meta webhook verification challenge.
 */
router.get('/', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
    
    if (mode === 'subscribe' && token === config.whatsappVerifyToken) {
        console.log('[WhatsApp] Webhook verified successfully.');
        return res.status(200).send(challenge);
    }
    console.warn('[WhatsApp] Webhook verification failed. Check WHATSAPP_VERIFY_TOKEN.');
    return res.status(403).json({ error: 'Forbidden: Invalid verify token.' });
});

/**
 * Verify HMAC-SHA256 signature from Meta to ensure authenticity.
 */
function verifySignature(req) {
    if (!config.whatsappAppSecret) return true; // Skip if not configured
    const signature = req.headers['x-hub-signature-256'];
    if (!signature) return false;
    const expectedSig = 'sha256=' + crypto
        .createHmac('sha256', config.whatsappAppSecret)
        .update(req.rawBody || '')
        .digest('hex');
    return crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expectedSig)
    );
}

/**
 * Send a WhatsApp message via Meta Cloud API.
 */
async function sendWhatsAppMessage(to, text) {
    if (!isWhatsAppConfigured()) {
        console.warn('[WhatsApp] Outbound message skipped — WhatsApp API not configured.');
        return null;
    }
    try {
        const response = await fetch(
            `https://graph.facebook.com/v19.0/${config.whatsappPhoneNumberId}/messages`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${config.whatsappAccessToken}`,
                },
                body: JSON.stringify({
                    messaging_product: 'whatsapp',
                    to,
                    type: 'text',
                    text: { body: text.substring(0, 4000) },
                }),
            }
        );
        if (!response.ok) {
            const err = await response.text();
            console.error('[WhatsApp] Send message failed:', err);
        }
        return response;
    } catch (err) {
        console.error('[WhatsApp] Network error sending message:', err.message);
        return null;
    }
}

/**
 * POST /api/whatsapp/webhook
 * Process incoming WhatsApp messages.
 */
router.post('/', async (req, res) => {
    // Acknowledge receipt immediately (Meta requires fast 200 response)
    res.status(200).json({ status: 'ok' });
    
    try {
        if (!verifySignature(req)) {
            console.warn('[WhatsApp] Invalid webhook signature rejected.');
            return;
        }
        
        const body = req.body;
        if (!body?.object) return;
        if (body.object !== 'whatsapp_business_account') return;
        
        const entry = body.entry?.[0];
        const change = entry?.changes?.[0];
        const value = change?.value;
        
        if (!value?.messages?.length) return; // Status update or other non-message event
        
        const waMessage = value.messages[0];
        if (waMessage.type !== 'text') {
            // For now, handle only text messages
            await sendWhatsAppMessage(waMessage.from, 'I can currently handle text messages only. For other queries, please call: +91-8928895195');
            return;
        }
        
        const fromPhone = waMessage.from; // e.g. "918928895195"
        const messageText = waMessage.text?.body || '';
        const waMessageId = waMessage.id;
        
        console.log(`[WhatsApp] Incoming from ${fromPhone}: ${messageText.substring(0, 100)}`);
        
        // Find or create customer by phone
        const customer = findOrCreateCustomer({ phone: fromPhone });
        
        // Check for handoff token in message
        const tokenMatch = messageText.match(/token[:\s]+([a-f0-9]{60,})/i);
        let conversation = null;
        
        if (tokenMatch) {
            const entry = verifyAndConsumeHandoffToken(tokenMatch[1]);
            if (entry) {
                conversation = getConversation(entry.conversationId);
                if (conversation) {
                    console.log(`[WhatsApp] Handoff token matched. Conversation ${conversation.id} linked.`);
                    addMessage({
                        conversationId: conversation.id,
                        sender: 'USER',
                        message: messageText,
                        messageType: 'TEXT',
                        metadata: { whatsappMessageId: waMessageId },
                    });
                    // Greet with context awareness
                    const history = getMessages(conversation.id, 4);
                    const prevTopics = history.filter(m => m.sender === 'USER').map(m => m.message.substring(0, 50)).join(', ');
                    const greetMsg = `Hi! I can see you were previously discussing: "${prevTopics || 'a topic'}" on the FinTaxVers website. Let's continue here on WhatsApp! How can I help you further?`;
                    await sendWhatsAppMessage(fromPhone, greetMsg);
                    addMessage({ conversationId: conversation.id, sender: 'AI', message: greetMsg, messageType: 'TEXT' });
                    return;
                }
            }
        }
        
        // Find or create WhatsApp conversation
        if (!conversation) {
            conversation = getActiveConversation(customer.id, 'WHATSAPP') || createConversation({ customerId: customer.id, channel: 'WHATSAPP' });
        }
        
        // Store user message
        addMessage({
            conversationId: conversation.id,
            sender: 'USER',
            message: messageText,
            messageType: 'TEXT',
            metadata: { whatsappMessageId: waMessageId },
        });
        
        // Get conversation history
        const history = getMessages(conversation.id, 10).map(m => ({
            role: m.sender === 'USER' ? 'user' : 'assistant',
            content: m.message,
        }));
        
        // AI processing
        const { reply, sources, intent, requiresHuman } = await processChat({
            message: messageText,
            conversationHistory: history,
            channel: 'WHATSAPP',
        });
        
        // Store AI response
        addMessage({
            conversationId: conversation.id,
            sender: 'AI',
            message: reply,
            messageType: 'TEXT',
            metadata: { sources, intent },
        });
        
        if (requiresHuman) {
            updateConversationStatus(conversation.id, 'HUMAN_REQUIRED');
        }
        
        // Auto-create lead for service intent + phone available
        const serviceIntents = ['GST_REGISTRATION', 'GST_FILING', 'ITR_FILING', 'TAX_AUDIT', 'BUSINESS_LOAN', 'COMPANY_REGISTRATION', 'MSME', 'SUBSIDY'];
        if (serviceIntents.includes(intent)) {
            createLead({
                customerId: customer.id,
                service: intent,
                name: customer.name,
                phone: fromPhone,
                email: customer.email,
                requirement: messageText.substring(0, 300),
                sourceChannel: 'WHATSAPP',
            });
        }
        
        // Send AI reply via WhatsApp
        await sendWhatsAppMessage(fromPhone, reply);
        
    } catch (err) {
        console.error('[WhatsApp] Webhook processing error:', err.message, err.stack);
    }
});

export default router;