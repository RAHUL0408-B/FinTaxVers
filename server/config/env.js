/**
 * FinTaxVers Server - Environment Configuration
 * All sensitive credentials must be in .env file; never in frontend code.
 */
import dotenv from 'dotenv';
dotenv.config();

const required = (key) => {
    if (!process.env[key]) {
        console.warn(`[Config] WARNING: Environment variable ${key} is not set.`);
    }
    return process.env[key] || '';
};

export const config = {
    port: parseInt(process.env.PORT || '5000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',

    // AI Provider — supports 'openai' or 'gemini'
    llmProvider: process.env.LLM_PROVIDER || 'openai',
    llmApiKey: required('LLM_API_KEY'),
    llmModel: process.env.LLM_MODEL || 'gpt-4o-mini',
    llmTemperature: parseFloat(process.env.LLM_TEMPERATURE || '0.3'),
    llmMaxTokens: parseInt(process.env.LLM_MAX_TOKENS || '800', 10),

    // Embeddings
    embeddingApiKey: process.env.EMBEDDING_API_KEY || process.env.LLM_API_KEY || '',
    embeddingModel: process.env.EMBEDDING_MODEL || 'text-embedding-3-small',

    // RAG
    ragTopK: parseInt(process.env.RAG_TOP_K || '5', 10),
    ragRelevanceThreshold: parseFloat(process.env.RAG_RELEVANCE_THRESHOLD || '0.55'),
    ragFallbackMessage: process.env.RAG_FALLBACK_MESSAGE || "I'm unable to find specific information about that in the Fintaxvers knowledge base right now. For accurate guidance on your situation, please contact the Fintaxvers team directly.",

    // WhatsApp Business Cloud API
    whatsappAccessToken: process.env.WHATSAPP_ACCESS_TOKEN || '',
    whatsappPhoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || '',
    whatsappVerifyToken: process.env.WHATSAPP_VERIFY_TOKEN || 'fintaxvers_webhook_verify',
    whatsappAppSecret: process.env.WHATSAPP_APP_SECRET || '',

    // Site
    siteUrl: process.env.VITE_SITE_URL || 'https://fintaxvers.com',

    // Firebase (server-side Admin SDK if needed, optional)
    firebaseProjectId: process.env.VITE_FIREBASE_PROJECT_ID || '',

    // Handoff token expiry (seconds)
    handoffTokenExpirySeconds: parseInt(process.env.HANDOFF_TOKEN_EXPIRY_SECONDS || '3600', 10),

    // Rate limiting
    rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10),
    rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX || '30', 10),
};

export const isWhatsAppConfigured = () =>
    Boolean(config.whatsappAccessToken && config.whatsappPhoneNumberId);

export const isLLMConfigured = () =>
    Boolean(config.llmApiKey);