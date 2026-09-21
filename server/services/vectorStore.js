/**
 * FinTaxVers Vector Store
 * In-memory vector store backed by knowledge base data.
 * On startup, indexes all knowledge base entries with embeddings.
 * Falls back to TF-IDF similarity when embeddings are unavailable.
 */
import { generateEmbedding, cosineSimilarity, fallbackSimilarity } from './embeddingService.js';
import { knowledgeBase } from '../data/knowledgeBase.js';
import { config } from '../config/env.js';

/** @type {{ id: string, title: string, content: string, source: string, tags: string[], type: string, embedding: number[]|null }[]} */
let indexedChunks = [];
let indexed = false;

/**
 * Build the in-memory index from the knowledge base.
 * Generates embeddings if API key is available; else stores null for TF-IDF fallback.
 */
export async function buildIndex() {
    if (indexed) return;
    console.log(`[VectorStore] Building knowledge base index (${knowledgeBase.length} entries)...`);
    const chunks = [];
    for (const entry of knowledgeBase) {
        // Chunk long entries into ~500 word segments for better retrieval
        const text = entry.content;
        const words = text.split(/\s+/);
        const chunkSize = 500;
        const overlap = 50;
        
        if (words.length <= chunkSize) {
            const embedding = await generateEmbedding(`${entry.title}. ${text}`);
            chunks.push({ ...entry, embedding });
        } else {
            let start = 0;
            let chunkIdx = 0;
            while (start < words.length) {
                const end = Math.min(start + chunkSize, words.length);
                const chunkText = words.slice(start, end).join(' ');
                const embedding = await generateEmbedding(`${entry.title}. ${chunkText}`);
                chunks.push({
                    ...entry,
                    id: `${entry.id}-chunk${chunkIdx}`,
                    content: chunkText,
                    embedding,
                });
                start = end - overlap;
                chunkIdx++;
                if (end >= words.length) break;
            }
        }
    }
    indexedChunks = chunks;
    indexed = true;
    console.log(`[VectorStore] Index ready: ${indexedChunks.length} chunks indexed.`);
}

/**
 * Search the knowledge base for relevant chunks.
 * @param {string} query - User question
 * @param {number} topK - Number of results to return
 * @param {number} threshold - Minimum similarity score (0-1)
 * @returns {Promise<Array<{id, title, content, source, type, score}>>}
 */
export async function searchKnowledge(query, topK = null, threshold = null) {
    if (!indexed) await buildIndex();
    
    const k = topK || config.ragTopK;
    const minScore = threshold !== null ? threshold : config.ragRelevanceThreshold;
    
    const queryEmbedding = await generateEmbedding(query);
    
    const scored = indexedChunks.map((chunk) => {
        let score;
        if (queryEmbedding && chunk.embedding) {
            score = cosineSimilarity(queryEmbedding, chunk.embedding);
        } else {
            // Fallback: TF-IDF keyword matching
            score = fallbackSimilarity(query, `${chunk.title} ${chunk.content} ${chunk.tags.join(' ')}`);
        }
        return { ...chunk, score };
    });
    
    return scored
        .filter((c) => c.score >= minScore)
        .sort((a, b) => b.score - a.score)
        .slice(0, k)
        .map(({ embedding, ...rest }) => rest); // Strip embeddings from result
}

/** Re-index the knowledge base (admin action) */
export async function reIndex() {
    indexed = false;
    indexedChunks = [];
    await buildIndex();
    return { chunks: indexedChunks.length };
}

export function getIndexStats() {
    return { indexed, chunkCount: indexedChunks.length };
}