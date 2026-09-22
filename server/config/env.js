/**
 * FinTaxVers Server - Environment Configuration
 * All sensitive credentials must be in .env / .env.local file; never in frontend code.
 */
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env and .env.local from project root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

const getEnv = (key, fallback = '') => process.env[key] || fallback;

export const config = {
    port: parseInt(process.env.PORT || '5000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',

    // AI Provider — supports 'gemini' (default recommended) or 'openai'
    llmProvider: (process.env.LLM_PROVIDER || (process.env.GEMINI_API_KEY ? 'gemini' : 'gemini')).toLowerCase(),
    llmApiKey: process.env.LLM_API_KEY || process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY || '',
    llmModel: process.env.LLM_MODEL || (process.env.LLM_PROVIDER === 'openai' ? 'gpt-4o-mini' : 'gemini-flash-latest'),
    llmTemperature: parseFloat(process.env.LLM_TEMPERATURE || '0.25'),
    llmMaxTokens: parseInt(process.env.LLM_MAX_TOKENS || '900', 10),

    // Embeddings
    embeddingApiKey: process.env.EMBEDDING_API_KEY || process.env.LLM_API_KEY || process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY || '',
    embeddingModel: process.env.EMBEDDING_MODEL || (process.env.LLM_PROVIDER === 'openai' ? 'text-embedding-3-small' : 'gemini-embedding-001'),

    // RAG Optimization Settings
    ragTopK: parseInt(process.env.RAG_TOP_K || '4', 10),
    ragRelevanceThreshold: parseFloat(process.env.RAG_RELEVANCE_THRESHOLD || '0.12'), // Optimized for TF-IDF + hybrid vector retrieval
    ragFallbackMessage: process.env.RAG_FALLBACK_MESSAGE || "I'd be happy to guide you on this! To get the most accurate and up-to-date assessment for your specific case, our Senior Consultants at FinTaxVers are available directly via WhatsApp or call.",

    // WhatsApp Business Cloud API
    whatsappAccessToken: process.env.WHATSAPP_ACCESS_TOKEN || '',
    whatsappPhoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || '',
    whatsappVerifyToken: process.env.WHATSAPP_VERIFY_TOKEN || 'fintaxvers_webhook_verify',
    whatsappAppSecret: process.env.WHATSAPP_APP_SECRET || '',

    // Site & Firebase
    siteUrl: process.env.VITE_SITE_URL || 'https://fintaxvers.com',
    firebaseProjectId: process.env.VITE_FIREBASE_PROJECT_ID || '',

    // Handoff token expiry
    handoffTokenExpirySeconds: parseInt(process.env.HANDOFF_TOKEN_EXPIRY_SECONDS || '3600', 10),

    // Rate limiting
    rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10),
    rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX || '60', 10),
};

export const isWhatsAppConfigured = () =>
    Boolean(config.whatsappAccessToken && config.whatsappPhoneNumberId);

export const isLLMConfigured = () =>
    Boolean(config.llmApiKey && config.llmApiKey.trim().length > 0);