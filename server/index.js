/**
 * FinTaxVers Backend Server
 * Express server providing:
 *   POST /api/chat              — AI chatbot with RAG
 *   POST /api/chat/handoff      — Website→WhatsApp secure token
 *   GET  /api/chat/handoff/:token — Verify handoff token
 *   GET  /api/whatsapp/webhook  — WhatsApp verification
 *   POST /api/whatsapp/webhook  — WhatsApp incoming messages
 *   GET  /api/admin/*           — Admin management endpoints
 * 
 * The main Vite React frontend is served separately.
 * In development, Vite proxies /api requests to this server (port 5000).
 * In production, deploy this server behind your hosting platform and point
 * the proxy/rewrites accordingly.
 */
import express from 'express';
import cors from 'cors';
import { config } from './config/env.js';
import chatRoutes from './routes/chatRoutes.js';
import whatsappRoutes from './routes/whatsappRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { buildIndex } from './services/vectorStore.js';

const app = express();

// Capture raw body for WhatsApp signature verification
app.use((req, res, next) => {
    let raw = '';
    req.on('data', chunk => { raw += chunk.toString(); });
    req.on('end', () => { req.rawBody = raw; next(); });
});

// CORS — Allow frontend origin and WhatsApp/Meta
const allowedOrigins = [
    config.siteUrl,
    'http://localhost:5173',  // Vite dev
    'http://localhost:3000',
];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('CORS: Not allowed - ' + origin));
        }
    },
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
}));

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'FinTaxVers API', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/chat', chatRoutes);
app.use('/api/whatsapp/webhook', whatsappRoutes);
app.use('/api/admin', adminRoutes);

// 404 for unknown /api routes
app.use('/api/*', (req, res) => {
    res.status(404).json({ error: 'API endpoint not found.' });
});

// Global error handler — never expose stack traces to clients
app.use((err, req, res, next) => {
    console.error('[Server] Unhandled error:', err.message);
    res.status(500).json({ error: 'An internal server error occurred.' });
});

// Start server
app.listen(config.port, async () => {
    console.log(`[Server] FinTaxVers API running on port ${config.port}`);
    // Pre-build knowledge base index on startup
    try {
        await buildIndex();
    } catch (err) {
        console.warn('[Server] Knowledge base index build failed (will retry on first request):', err.message);
    }
});

export default app;