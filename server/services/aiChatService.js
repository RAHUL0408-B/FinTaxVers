/**
 * FinTaxVers AI Chat Service — RAG + LLM Pipeline
 * 
 * Retrieves relevant Fintaxvers knowledge, calls LLM with strict system prompt,
 * detects service intent, triggers lead capture and human handoff.
 * 
 * IMPORTANT SAFETY CONSTRAINTS:
 * - Does NOT claim to be a human CA, lawyer, or government official
 * - Does NOT invent tax rates, deadlines, or government rules
 * - Does NOT make personalized legal or financial decisions
 * - Always recommends human expert contact for specific situations
 */
import { searchKnowledge } from './vectorStore.js';
import { config, isLLMConfigured } from '../config/env.js';

const SYSTEM_PROMPT = `You are Fintaxvers AI, a helpful digital assistant for FinTaxVers Consultancy Services based in Nagpur, India.

ABOUT FINTAXVERS:
FinTaxVers is a professional financial and tax consultancy firm founded by Yugant V. Rahele.
Services: GST Registration & Return Filing, Income Tax Filing & Tax Planning, Tax Audit (Section 44AB), Internal Audit, Accounting & Bookkeeping, Business Registration, Company Formation (Pvt Ltd/LLP), Business Loans (CMA/MUDRA/CGTMSE), MSME Udyam Registration, Government Subsidy Consulting, ROC Compliance, Digital Signature Certificates (DSC).
Contact: +91-8928895195, +91-9011424236 | Email: contact@fintaxvers.com | Location: Nagpur, Maharashtra.

STRICT RULES — YOU MUST FOLLOW THESE EXACTLY:
1. You are an informational assistant ONLY. You are NOT a Chartered Accountant, lawyer, or government official.
2. Do NOT invent or fabricate tax rates, deadlines, penalties, or legal rules not provided in context.
3. Do NOT guarantee loan approvals, tax refunds, or specific financial outcomes.
4. Do NOT make personalized tax calculations or legal decisions.
5. When information is uncertain or situation-specific, ALWAYS say so and recommend human expert consultation.
6. Always identify yourself as "Fintaxvers AI" — never claim to be a human.
7. Keep responses concise, factual, and helpful. Do not write long essays.
8. For specific client situations requiring personalized advice, always offer to connect them with the Fintaxvers team.
9. Use simple, clear language. Avoid jargon where possible.
10. If knowledge context is provided below, use it. If not, be honest about knowledge limits.

FORMAT:
- Use short paragraphs or bullet points for clarity.
- Include relevant Fintaxvers contact info when offering human connection.
- When offering to generate a lead/callback, clearly ask for the user's name, phone number, and service needed.`;

const INTENT_KEYWORDS = {
    GST_REGISTRATION: ['gst registration', 'gstin', 'get gst number', 'gst apply', 'register for gst'],
    GST_FILING: ['gst return', 'gstr', 'gstr-1', 'gstr-3b', 'gstr-9', 'file gst', 'gst filing'],
    ITR_FILING: ['itr', 'income tax return', 'income tax filing', 'file income tax', 'tax filing'],
    TAX_AUDIT: ['tax audit', 'section 44ab', '3ca', '3cb', '3cd', 'audit report'],
    BUSINESS_LOAN: ['business loan', 'mudra', 'cgtmse', 'cma data', 'loan application', 'working capital', 'od', 'cc limit'],
    COMPANY_REGISTRATION: ['company registration', 'pvt ltd', 'llp', 'opc', 'incorporate', 'start company'],
    MSME: ['msme', 'udyam', 'udyog aadhaar', 'msme loan', 'msme registration'],
    SUBSIDY: ['subsidy', 'pmegp', 'cmegp', 'government scheme', 'grant'],
    HUMAN_HANDOFF: ['talk to human', 'speak to agent', 'contact team', 'call me', 'callback', 'get consultation', 'need expert', 'speak to consultant', 'human', 'agent'],
};

function detectIntent(message) {
    const lower = message.toLowerCase();
    for (const [intent, keywords] of Object.entries(INTENT_KEYWORDS)) {
        if (keywords.some(kw => lower.includes(kw))) {
            return intent;
        }
    }
    return null;
}

function requiresHumanCheck(message, intent, aiResponse) {
    const humanTriggers = [
        'quote', 'quotation', 'pricing', 'how much', 'fee', 'cost',
        'upload document', 'share document', 'sensitive', 'specific advice',
        'my situation', 'my case', 'my business',
    ];
    if (intent === 'HUMAN_HANDOFF') return true;
    if (humanTriggers.some(t => message.toLowerCase().includes(t))) return true;
    // If AI responded with uncertainty markers
    if (aiResponse && (
        aiResponse.includes("I'm unable to find") ||
        aiResponse.includes("not in my knowledge") ||
        aiResponse.includes("specific situation")
    )) return true;
    return false;
}

async function callOpenAI(messages) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.llmApiKey}`,
        },
        body: JSON.stringify({
            model: config.llmModel,
            messages,
            temperature: config.llmTemperature,
            max_tokens: config.llmMaxTokens,
        }),
    });
    if (!response.ok) {
        const err = await response.text();
        throw new Error(`OpenAI API error ${response.status}: ${err}`);
    }
    const data = await response.json();
    return data.choices[0].message.content;
}

async function callGemini(messages) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${config.llmModel}:generateContent?key=${config.llmApiKey}`;
    // Convert OpenAI message format to Gemini
    const geminiContents = messages
        .filter(m => m.role !== 'system')
        .map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }],
        }));
    
    const systemInstruction = messages.find(m => m.role === 'system')?.content || '';
    
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            system_instruction: { parts: [{ text: systemInstruction }] },
            contents: geminiContents,
            generationConfig: {
                temperature: config.llmTemperature,
                maxOutputTokens: config.llmMaxTokens,
            },
        }),
    });
    if (!response.ok) {
        const err = await response.text();
        throw new Error(`Gemini API error ${response.status}: ${err}`);
    }
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

/**
 * Main chat function — RAG + LLM pipeline.
 * @param {{ message: string, conversationHistory: Array<{role, content}>, channel: string }} opts
 * @returns {Promise<{ reply: string, sources: Array, intent: string|null, requiresHuman: boolean }>}
 */
export async function processChat({ message, conversationHistory = [], channel = 'WEBSITE' }) {
    const intent = detectIntent(message);
    
    // Immediate human handoff if explicitly requested
    if (intent === 'HUMAN_HANDOFF') {
        return {
            reply: "Of course! I'll connect you with the FinTaxVers team right away.\n\nYou can reach them directly:\n📞 **+91-8928895195** or **+91-9011424236**\n✉️ contact@fintaxvers.com\n\nAlternatively, please share your **name**, **phone number**, and what you need help with, and the team will call you back shortly.",
            sources: [],
            intent,
            requiresHuman: true,
        };
    }
    
    // RAG: Search knowledge base
    let contextChunks = [];
    let sources = [];
    
    try {
        contextChunks = await searchKnowledge(message, config.ragTopK, config.ragRelevanceThreshold);
        sources = contextChunks
            .filter(c => c.source && !sources.find(s => s === c.source))
            .slice(0, 3)
            .map(c => ({ title: c.title, url: c.source }));
    } catch (err) {
        console.warn('[AIChatService] Knowledge search error:', err.message);
    }
    
    const contextText = contextChunks.length > 0
        ? contextChunks.map(c => `[${c.title}]\n${c.content}`).join('\n\n---\n\n')
        : '';
    
    const userMessageWithContext = contextText
        ? `Context from FinTaxVers knowledge base:\n\n${contextText}\n\n---\n\nUser question: ${message}`
        : message;
    
    // Build message history (limited window to avoid token overflow)
    const historyWindow = conversationHistory.slice(-6);
    
    const messages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...historyWindow,
        { role: 'user', content: userMessageWithContext },
    ];
    
    let reply;
    
    if (!isLLMConfigured()) {
        // Graceful degradation without LLM
        if (contextChunks.length > 0) {
            reply = `Based on FinTaxVers information:\n\n${contextChunks[0].content.substring(0, 600)}...\n\nFor personalized assistance, please contact the FinTaxVers team:\n📞 +91-8928895195 | ✉️ contact@fintaxvers.com`;
        } else {
            reply = config.ragFallbackMessage;
        }
    } else {
        try {
            if (config.llmProvider === 'gemini') {
                reply = await callGemini(messages);
            } else {
                reply = await callOpenAI(messages);
            }
        } catch (err) {
            console.error('[AIChatService] LLM error:', err.message);
            if (contextChunks.length > 0) {
                reply = `I found some relevant information for you:\n\n${contextChunks[0].content.substring(0, 500)}...\n\nFor detailed assistance, please contact:\n📞 +91-8928895195 | ✉️ contact@fintaxvers.com`;
            } else {
                reply = "I'm experiencing a temporary issue. Please contact the FinTaxVers team directly:\n📞 **+91-8928895195** | ✉️ contact@fintaxvers.com";
            }
        }
    }
    
    const needsHuman = requiresHumanCheck(message, intent, reply);
    
    return { reply, sources, intent, requiresHuman: needsHuman };
}