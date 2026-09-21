/**
 * FinTaxVers Embedding Service
 * Generates vector embeddings for knowledge base content and user queries.
 * Supports OpenAI text-embedding-3-small (default) and Gemini embeddings.
 * Falls back to TF-IDF keyword matching if AI API is unavailable.
 */
import { config } from '../config/env.js';

// Simple TF-IDF fallback embedding (no API dependency)
function termFrequency(text) {
    const words = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
    const freq = {};
    for (const word of words) {
        freq[word] = (freq[word] || 0) + 1;
    }
    return freq;
}

function cosineSimilarityTFIDF(a, b) {
    const aFreq = termFrequency(a);
    const bFreq = termFrequency(b);
    const allWords = new Set([...Object.keys(aFreq), ...Object.keys(bFreq)]);
    let dot = 0, magA = 0, magB = 0;
    for (const word of allWords) {
        const va = aFreq[word] || 0;
        const vb = bFreq[word] || 0;
        dot += va * vb;
        magA += va * va;
        magB += vb * vb;
    }
    if (magA === 0 || magB === 0) return 0;
    return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

async function embedWithOpenAI(text) {
    const response = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.embeddingApiKey}`,
        },
        body: JSON.stringify({
            model: config.embeddingModel,
            input: text.substring(0, 8000),
        }),
    });
    if (!response.ok) {
        throw new Error(`OpenAI Embeddings API error: ${response.status}`);
    }
    const data = await response.json();
    return data.data[0].embedding;
}

async function embedWithGemini(text) {
    const model = config.embeddingModel || 'models/text-embedding-004';
    const url = `https://generativelanguage.googleapis.com/v1beta/${model}:embedContent?key=${config.embeddingApiKey}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: { parts: [{ text: text.substring(0, 8000) }] } }),
    });
    if (!response.ok) {
        throw new Error(`Gemini Embeddings API error: ${response.status}`);
    }
    const data = await response.json();
    return data.embedding.values;
}

/**
 * Generate an embedding for text. Returns null if API is unavailable.
 * @param {string} text
 * @returns {Promise<number[]|null>}
 */
export async function generateEmbedding(text) {
    if (!config.embeddingApiKey) return null;
    try {
        if (config.llmProvider === 'gemini') {
            return await embedWithGemini(text);
        }
        return await embedWithOpenAI(text);
    } catch (err) {
        console.warn('[EmbeddingService] Embedding API unavailable, will use TF-IDF fallback:', err.message);
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

/**
 * Fallback similarity when embeddings are not available.
 * Uses TF-IDF keyword matching.
 */
export function fallbackSimilarity(queryText, chunkText) {
    return cosineSimilarityTFIDF(queryText, chunkText);
}