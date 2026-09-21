/**
 * FinTaxVers Admin API Routes
 * Protected endpoints for conversations, leads, knowledge base management, and AI settings.
 * Authentication: Verifies admin token in Authorization header.
 */
import { Router } from 'express';
import { getAllConversations, getAllLeads, getMessages, updateLeadStatus, updateConversationStatus } from '../services/conversationStore.js';
import { reIndex, getIndexStats } from '../services/vectorStore.js';
import { config } from '../config/env.js';

const router = Router();

// Simple admin auth middleware
function requireAdmin(req, res, next) {
    const token = req.headers['authorization']?.replace('Bearer ', '');
    const adminToken = process.env.ADMIN_API_TOKEN;
    if (!adminToken) {
        // If no token configured, reject admin access (secure by default)
        return res.status(503).json({ error: 'Admin API not configured. Set ADMIN_API_TOKEN environment variable.' });
    }
    if (!token || token !== adminToken) {
        return res.status(401).json({ error: 'Unauthorized.' });
    }
    next();
}

// GET /api/admin/conversations
router.get('/conversations', requireAdmin, (req, res) => {
    const { channel, status } = req.query;
    const convs = getAllConversations({ channel, status });
    return res.json({ conversations: convs });
});

// GET /api/admin/conversations/:id/messages
router.get('/conversations/:id/messages', requireAdmin, (req, res) => {
    const messages = getMessages(req.params.id, 50);
    return res.json({ messages });
});

// PATCH /api/admin/conversations/:id/status
router.patch('/conversations/:id/status', requireAdmin, (req, res) => {
    const { status } = req.body;
    const allowed = ['OPEN', 'HUMAN_REQUIRED', 'CLOSED'];
    if (!allowed.includes(status)) {
        return res.status(400).json({ error: `status must be one of: ${allowed.join(', ')}` });
    }
    const updated = updateConversationStatus(req.params.id, status);
    if (!updated) return res.status(404).json({ error: 'Conversation not found.' });
    return res.json({ conversation: updated });
});

// GET /api/admin/leads
router.get('/leads', requireAdmin, (req, res) => {
    const { status, sourceChannel } = req.query;
    const leads = getAllLeads({ status, sourceChannel });
    return res.json({ leads });
});

// PATCH /api/admin/leads/:id/status
router.patch('/leads/:id/status', requireAdmin, (req, res) => {
    const { status } = req.body;
    const allowed = ['NEW', 'CONTACTED', 'IN_PROGRESS', 'CONVERTED', 'CLOSED'];
    if (!allowed.includes(status)) {
        return res.status(400).json({ error: `status must be one of: ${allowed.join(', ')}` });
    }
    const updated = updateLeadStatus(req.params.id, status);
    if (!updated) return res.status(404).json({ error: 'Lead not found.' });
    return res.json({ lead: updated });
});

// POST /api/admin/knowledge/reindex
router.post('/knowledge/reindex', requireAdmin, async (req, res) => {
    try {
        const result = await reIndex();
        return res.json({ success: true, ...result });
    } catch (err) {
        console.error('[AdminRoute/reindex] Error:', err.message);
        return res.status(500).json({ error: 'Re-indexing failed: ' + err.message });
    }
});

// GET /api/admin/knowledge/stats
router.get('/knowledge/stats', requireAdmin, (req, res) => {
    return res.json(getIndexStats());
});

// GET /api/admin/settings — Return non-sensitive AI config
router.get('/settings', requireAdmin, (req, res) => {
    return res.json({
        llmProvider: config.llmProvider,
        llmModel: config.llmModel,
        llmTemperature: config.llmTemperature,
        llmMaxTokens: config.llmMaxTokens,
        ragTopK: config.ragTopK,
        ragRelevanceThreshold: config.ragRelevanceThreshold,
        ragFallbackMessage: config.ragFallbackMessage,
        isWhatsAppConfigured: Boolean(config.whatsappAccessToken && config.whatsappPhoneNumberId),
        isLLMConfigured: Boolean(config.llmApiKey),
    });
});

export default router;