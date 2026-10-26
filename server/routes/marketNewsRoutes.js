/**
 * Public, read-only market news proxy.
 *
 * Keeping the provider credential here prevents it from being embedded in the
 * frontend bundle. Responses are cached briefly to respect the provider's API
 * limits and reduce repeat requests from visitors.
 */
import { Router } from 'express';
import { config } from '../config/env.js';

const router = Router();
const CACHE_TTL_MS = 10 * 60 * 1000;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 20;

let cachedResponse = null;
let cachedAt = 0;
const requestCounts = new Map();

setInterval(() => requestCounts.clear(), RATE_LIMIT_WINDOW_MS).unref();

function rateLimit(req, res, next) {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const count = (requestCounts.get(ip) || 0) + 1;
    requestCounts.set(ip, count);

    if (count > RATE_LIMIT_MAX) {
        return res.status(429).json({ error: 'Too many news requests. Please try again shortly.' });
    }

    return next();
}

function asText(value, maxLength) {
    return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function safeUrl(value) {
    try {
        const url = new URL(value);
        return url.protocol === 'https:' ? url.href : '';
    } catch {
        return '';
    }
}

function classifyArticle(title, description, index) {
    const text = `${title} ${description}`.toLowerCase();
    if (text.includes('crypto') || text.includes('bitcoin') || text.includes('btc') || text.includes('ethereum')) return 'crypto';
    if (text.includes('fed') || text.includes('powell') || text.includes('inflation') || text.includes('interest rate') || text.includes('cpi')) return 'fed';
    if (text.includes('earning') || text.includes('revenue') || text.includes('profit') || text.includes('q3') || text.includes('q4') || text.includes('results')) return 'earnings';
    if (text.includes('gdp') || text.includes('imf') || text.includes('growth') || text.includes('economy')) return 'economy';
    return ['markets', 'economy', 'earnings'][index % 3];
}

router.get('/', rateLimit, async (_req, res) => {
    if (!config.newsApiKey) {
        return res.status(503).json({
            code: 'NEWS_SOURCE_NOT_CONFIGURED',
            error: 'Live market news is not configured.',
        });
    }

    if (cachedResponse && Date.now() - cachedAt < CACHE_TTL_MS) {
        return res.json({ ...cachedResponse, cached: true });
    }

    try {
        const response = await fetch('https://newsapi.org/v2/top-headlines?category=business&language=en&pageSize=20', {
            headers: { 'X-Api-Key': config.newsApiKey },
        });

        if (!response.ok) {
            console.warn(`[MarketNews] Provider returned HTTP ${response.status}`);
            return res.status(502).json({ error: 'Live market news is temporarily unavailable.' });
        }

        const data = await response.json();
        const articles = Array.isArray(data.articles)
            ? data.articles.map((article, index) => {
                const title = asText(article.title, 240);
                const description = asText(article.description, 500);
                return {
                    title,
                    description,
                    url: safeUrl(article.url),
                    source: asText(article.source?.name, 100) || 'News source',
                    publishedAt: article.publishedAt,
                    category: classifyArticle(title, description, index),
                    featured: index === 0,
                };
            }).filter((article) => article.title && article.url)
            : [];

        cachedResponse = {
            articles,
            source: 'NewsAPI',
            fetchedAt: new Date().toISOString(),
            cached: false,
        };
        cachedAt = Date.now();

        return res.json(cachedResponse);
    } catch (error) {
        console.error('[MarketNews] Request failed:', error.message);
        return res.status(502).json({ error: 'Live market news is temporarily unavailable.' });
    }
});

export default router;
