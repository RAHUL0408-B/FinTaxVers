/**
 * FinTaxVers AI Chat Service — RAG + LLM Pipeline
 * 
 * Retrieves relevant Fintaxvers knowledge, calls LLM with strict system prompt,
 * detects service intent, triggers lead capture and human handoff.
 */
import { searchKnowledge } from './vectorStore.js';
import { config, isLLMConfigured } from '../config/env.js';

const SYSTEM_PROMPT = `You are FinTaxVers AI, the official AI Tax & Compliance Assistant for FinTaxVers Consultancy Services, Nagpur, Maharashtra, India.
Founder: Yugant V. Rahele | Website: https://fintaxvers.com

OFFICIAL SERVICES:
1. Income Tax: ITR-1 to ITR-7, Tax Audit (Sec 44AB), Capital Gains, NRI Taxation, Demand Notice replies.
2. GST: Registration (REG-01), GSTR-1, GSTR-3B, GSTR-9, GSTR-9C filing, ITC Reconciliation, Revocation of Cancellation.
3. Business Setup & ROC: Pvt Ltd, LLP, OPC Incorporation, Partnership, Shop Act, MSME/Udyam, MCA annual filings.
4. Business Loans & Subsidies: CMA Data, Project Reports, Working Capital (CC/OD), Term Loans, CGTMSE, MUDRA, PMEGP, CMEGP.
5. Assurance & Compliance: IFC, Accounting, Bookkeeping, DSC (Class 3).

CORE BEHAVIOR RULES:
1. Give comprehensive, accurate, and clearly structured answers. Use **bold** for key terms and bullet points for lists.
2. Always cite relevant sections of Indian law (Income Tax Act 1961, CGST/SGST Acts, Companies Act 2013) where applicable.
3. If asked about specific fees or pricing, explain that fees vary case-by-case and encourage the user to describe their situation so you can provide a detailed estimate or framework.
4. Never fabricate tax rates, portal procedures, or guarantee loan approvals. If uncertain, say so clearly and explain what factors apply.
5. Answer every question as thoroughly as possible — the user is seeking expert-level information.
6. Maintain a professional, warm, and helpful tone throughout.`;

const INTENT_KEYWORDS = {
    GST_REGISTRATION: ['gst registration', 'gstin', 'get gst number', 'gst apply', 'register for gst', 'gst new'],
    GST_FILING: ['gst return', 'gstr', 'gstr-1', 'gstr-3b', 'gstr-9', 'gstr-9c', 'file gst', 'gst filing', 'itc reconciliation'],
    ITR_FILING: ['itr', 'income tax return', 'income tax filing', 'file income tax', 'tax filing', 'itr-1', 'itr-2', 'itr-3', 'itr-4', 'section 80c'],
    TAX_AUDIT: ['tax audit', 'section 44ab', '3ca', '3cb', '3cd', 'audit report', 'turnover limit'],
    BUSINESS_LOAN: ['business loan', 'mudra', 'cgtmse', 'cma data', 'project report', 'loan application', 'working capital', 'od', 'cc limit', 'bank loan'],
    COMPANY_REGISTRATION: ['company registration', 'pvt ltd', 'private limited', 'llp', 'opc', 'incorporate', 'incorporation', 'start company', 'mca'],
    MSME: ['msme', 'udyam', 'udyog aadhaar', 'msme certificate', 'udyam registration'],
    SUBSIDY: ['subsidy', 'pmegp', 'cmegp', 'subsidy scheme', 'government subsidy', 'grant'],
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



async function callOpenAI(messages) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.llmApiKey}`,
        },
        body: JSON.stringify({
            model: config.llmModel || 'gpt-4o-mini',
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
    const modelsToTry = [
        config.llmModel || 'gemini-2.0-flash',
        'gemini-2.0-flash',
        'gemini-2.0-flash-lite',
        'gemini-1.5-flash',
        'gemini-1.5-flash-8b',
    ];
    // deduplicate models
    const uniqueModels = [...new Set(modelsToTry.map(m => m.replace(/^models\//, '')))];

    const geminiContents = messages
        .filter(m => m.role !== 'system')
        .map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }],
        }));
    
    const systemInstruction = messages.find(m => m.role === 'system')?.content || '';
    let lastError = null;

    for (const model of uniqueModels) {
        try {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${config.llmApiKey}`;
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
            if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
                return data.candidates[0].content.parts[0].text;
            }
        } catch (err) {
            lastError = err;
            console.warn(`[AIChatService] Model ${model} failed, trying next candidate:`, err.message);
        }
    }

    throw lastError || new Error('All Gemini candidate models failed');
}

/**
 * Intelligent domain-informed fallback generator when no LLM key is configured
 */
function buildSmartDomainFallback(userQuery, chunks, intent) {
    if (chunks && chunks.length > 0) {
        const topChunk = chunks[0];
        return `**${topChunk.title}**\n\n${topChunk.content.substring(0, 600).trim()}\n\n---\n📌 For a detailed analysis of your specific case, visit **https://fintaxvers.com** or email **contact@fintaxvers.com**.`;
    }

    if (intent === 'GST_REGISTRATION' || intent === 'GST_FILING') {
        return `**Goods & Services Tax (GST) — Key Information**\n\n- **GST Registration** is mandatory if annual turnover exceeds ₹40L (goods) or ₹20L (services).\n- Apply via the GST portal using **Form REG-01** with PAN, Aadhaar, bank details & business proof.\n- Monthly filings: **GSTR-1** (outward supplies) & **GSTR-3B** (tax payment).\n- Annual: **GSTR-9** (all taxpayers), **GSTR-9C** (turnover > ₹5Cr).\n\nFinTaxVers handles end-to-end GST Registration and Return Filing across India.`;
    }

    if (intent === 'ITR_FILING' || intent === 'TAX_AUDIT') {
        return `**Income Tax Filing & Tax Audit — Key Information**\n\n- **ITR-1**: Salaried individuals (income up to ₹50L).\n- **ITR-2**: Capital gains, HRA, foreign assets.\n- **ITR-3/4**: Business income / presumptive taxation.\n- **Tax Audit (Sec 44AB)**: Mandatory if business turnover > ₹1Cr (or ₹10Cr with digital payments) or professional receipts > ₹50L.\n- Forms **3CA / 3CB / 3CD** must be filed along with the ITR.\n\nFinTaxVers provides accurate, on-time filing for all ITR forms and audit reports.`;
    }

    if (intent === 'BUSINESS_LOAN' || intent === 'SUBSIDY') {
        return `**Business Loans & Govt Subsidy Schemes — Key Information**\n\n- **MUDRA Loan**: Up to ₹10L for micro/small businesses (Shishu / Kishor / Tarun).\n- **CGTMSE**: Collateral-free loans up to ₹2Cr for MSMEs.\n- **PMEGP**: Up to 35% margin subsidy for new enterprises (max project ₹25L manufacturing / ₹10L service).\n- **CMEGP** (Maharashtra): State-level subsidy for entrepreneurs.\n- FinTaxVers prepares **CMA Data Reports & Detailed Project Reports (DPR)** required for bank processing.`;
    }

    if (intent === 'COMPANY_REGISTRATION' || intent === 'MSME') {
        return `**Business Registration — Key Information**\n\n- **Pvt Ltd Company**: Min 2 directors, 2 shareholders. Requires DSC, DIN, MOA/AOA, Certificate of Incorporation via MCA portal.\n- **LLP**: Flexible structure; ideal for professionals. Governed by LLP Act 2008.\n- **OPC**: Single-person company — suitable for solo entrepreneurs.\n- **MSME/Udyam**: Register at udyamregistration.gov.in for benefits like priority lending, subsidies, and government tenders.\n\nFinTaxVers handles complete incorporation documentation and MCA filings.`;
    }

    return `**FinTaxVers — Tax & Business Compliance Experts**\n\nI can answer detailed questions on:\n- 📋 **GST** (Registration, GSTR Filing, ITC Reconciliation)\n- 💰 **Income Tax** (ITR Filing, Capital Gains, NRI Taxation, Notices)\n- 🏢 **Company Registration** (Pvt Ltd, LLP, OPC, MSME/Udyam)\n- 🏦 **Business Loans** (CMA Data, MUDRA, CGTMSE, Project Reports)\n- 🎯 **Govt Subsidies** (PMEGP, CMEGP and more)\n\nPlease ask your specific question and I will provide a detailed answer!`;
}

/**
 * Main chat function — RAG + LLM pipeline.
 */
export async function processChat({ message, conversationHistory = [], channel = 'WEBSITE' }) {
    const intent = detectIntent(message);
    
    // RAG: Search knowledge base
    let contextChunks = [];
    let sources = [];
    
    try {
        contextChunks = await searchKnowledge(message, config.ragTopK, config.ragRelevanceThreshold);
        sources = contextChunks
            .filter(c => c.source && !sources.find(s => s.url === c.source))
            .slice(0, 3)
            .map(c => ({ title: c.title, url: c.source }));
    } catch (err) {
        console.warn('[AIChatService] Knowledge search warning:', err.message);
    }
    
    let reply;
    
    if (!isLLMConfigured()) {
        // High quality domain fallback without external API dependency
        reply = buildSmartDomainFallback(message, contextChunks, intent);
    } else {
        const contextText = contextChunks.length > 0
            ? contextChunks.map(c => `### ${c.title}\n${c.content}`).join('\n\n---\n\n')
            : '';
        
        const userMessageWithContext = contextText
            ? `FinTaxVers Verified Reference Context:\n${contextText}\n\nClient Inquiry: ${message}`
            : message;
        
        const historyWindow = conversationHistory.slice(-6);
        const messages = [
            { role: 'system', content: SYSTEM_PROMPT },
            ...historyWindow,
            { role: 'user', content: userMessageWithContext },
        ];

        try {
            if (config.llmProvider === 'openai') {
                reply = await callOpenAI(messages);
            } else {
                reply = await callGemini(messages);
            }
        } catch (err) {
            console.error('[AIChatService] LLM API call error, falling back to local domain engine:', err.message);
            reply = buildSmartDomainFallback(message, contextChunks, intent);
        }
    }
    
    return { reply, sources, intent };
}