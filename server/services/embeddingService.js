/**
 * FinTaxVers Embedding Service
 * Generates vector embeddings for knowledge base content and user queries.
 * Supports OpenAI text-embedding-3-small and Gemini text-embedding-004.
 * Includes enhanced BM25-style keyword matching fallback when API key is not present.
 */
import { config } from '../config/env.js';

// Enhanced tokenization and stop words filter for Indian financial domain
const STOP_WORDS = new Set([
    'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'as', 'at',
    'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can', 'did', 'do',
    'does', 'doing', 'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', 'has', 'have', 'having',
    'he', 'her', 'here', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'i', 'if', 'in', 'into', 'is', 'it',
    'its', 'itself', 'just', 'me', 'more', 'most', 'my', 'myself', 'no', 'nor', 'not', 'now', 'of', 'off', 'on',
    'once', 'only', 'or', 'other', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'she', 'should', 'so',
    'some', 'such', 'than', 'that', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'these',
    'they', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'we', 'were', 'what',
    'when', 'where', 'which', 'while', 'who', 'whom', 'why', 'with', 'would', 'you', 'your', 'yours'
]);

function tokenize(text) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter(w => w.length > 1 && !STOP_WORDS.has(w));
}

function termFrequency(tokens) {
    const freq = {};
    for (const token of tokens) {
        freq[token] = (freq[token] || 0) + 1;
    }
    return freq;
}

/**
 * Enhanced similarity matching with exact phrase & keyword boosting
 */
export function fallbackSimilarity(queryText, chunkText) {
    const qTokens = tokenize(queryText);
    const cTokens = tokenize(chunkText);
    if (qTokens.length === 0 || cTokens.length === 0) return 0;

    const qFreq = termFrequency(qTokens);
    const cFreq = termFrequency(cTokens);

    let matchCount = 0;
    let weightedScore = 0;

    for (const [token, qCount] of Object.entries(qFreq)) {
        if (cFreq[token]) {
            matchCount++;
            // Log frequency weight
            weightedScore += (1 + Math.log(qCount)) * (1 + Math.log(cFreq[token]));
        }
    }

    // Exact string bonus
    const queryClean = queryText.toLowerCase().trim();
    const chunkClean = chunkText.toLowerCase();
    if (chunkClean.includes(queryClean)) {
        weightedScore += 2.5;
    }

    // Keyword coverage ratio (how much of user query is satisfied)
    const coverage = matchCount / qTokens.length;
    const baseScore = weightedScore / (Math.sqrt(qTokens.length) * Math.sqrt(cTokens.length) + 1);

    return Math.min(1.0, (baseScore * 2.0) + (coverage * 0.5));
}

async function embedWithOpenAI(text) {
    const response = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.embeddingApiKey}`,
        },
        body: JSON.stringify({
            model: config.embeddingModel || 'text-embedding-3-small',
            input: text.substring(0, 8000),
        }),
    });
    if (!response.ok) {
        throw new Error(`OpenAI Embeddings error: ${response.status}`);
    }
    const data = await response.json();
    return data.data[0].embedding;
}

async function embedWithGemini(text) {
    let modelName = config.embeddingModel || 'text-embedding-004';
    if (!modelName.startsWith('models/')) {
        modelName = `models/${modelName}`;
    }
    const url = `https://generativelanguage.googleapis.com/v1beta/${modelName}:embedContent?key=${config.embeddingApiKey}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            content: { parts: [{ text: text.substring(0, 8000) }] }
        }),
    });
    if (!response.ok) {
        throw new Error(`Gemini Embeddings error: ${response.status}`);
    }
    const data = await response.json();
    return data.embedding.values;
}

/**
 * Generate an embedding vector. Gracefully returns null if no API key or network failure.
 */
export async function generateEmbedding(text) {
    if (!config.embeddingApiKey) return null;
    try {
        if (config.llmProvider === 'gemini') {
            return await embedWithGemini(text);
        }
        return await embedWithOpenAI(text);
    } catch (err) {
        return null;
    }
}

/**
 * Compute cosine similarity between two vectors.
 */
export function cosineSimilarity(vecA, vecB) {
    if (!vecA || !vecB || vecA.length !== vecB.length) return 0;
    let dot = 0, magA = 0, magB = 0;
    for (let i = 0; i < vecA.length; i++) {
        dot += vecA[i] * vecB[i];
        magA += vecA[i] * vecA[i];
        magB += vecB[i] * vecB[i];
    }
    if (magA === 0 || magB === 0) return 0;
    return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}