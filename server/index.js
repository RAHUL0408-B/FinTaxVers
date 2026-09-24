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
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import { config } from './config/env.js';
import chatRoutes from './routes/chatRoutes.js';
import whatsappRoutes from './routes/whatsappRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { buildIndex } from './services/vectorStore.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../dist');

const app = express();

// CORS — Allow frontend origin
const allowedOrigins = [
    config.siteUrl,
    'https://fintaxvers.com',
    'https://www.fintaxvers.com',
    'https://fintaxvers.onrender.com',
    'https://fintxyug.web.app',
    'https://fintxyug.firebaseapp.com',
    'http://localhost:5173',  // Vite dev
    'http://localhost:3000',
];
app.use(cors({
    origin: (origin, callback) => {
        if (
            !origin ||
            allowedOrigins.includes(origin) ||
            origin.endsWith('.onrender.com') ||
            origin.endsWith('fintaxvers.com') ||
            origin.endsWith('.web.app') ||
            origin.endsWith('.firebaseapp.com')
        ) {
            callback(null, true);
        } else {
            callback(null, false);
        }
    },
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
}));

// Parse JSON bodies — capture rawBody safely inside verify (does NOT consume the stream)
app.use(express.json({
    limit: '2mb',
    verify: (req, res, buf) => { req.rawBody = buf.toString(); }
}));
app.use(express.urlencoded({ extended: true }));

// Serve static frontend from Vite build (dist)
app.use(express.static(distPath));

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'FinTaxVers API', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/chat', chatRoutes);
app.use('/api/whatsapp/webhook', whatsappRoutes);
app.use('/api/admin', adminRoutes);

// 404 for unknown /api routes
app.all('/api/*', (req, res) => {
    res.status(404).json({ error: 'API endpoint not found.' });
});

// SPA fallback: any non-API GET request serves React index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
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