/**
 * Creates crawlable HTML snapshots for service and blog routes after Vite
 * builds the SPA. Firebase Hosting gives exact static files precedence over
 * the catch-all SPA rewrite, so these pages provide correct metadata and
 * useful visible content to non-JavaScript crawlers as well as visitors.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { servicesData } from '../src/data/servicesData.js';
import { getLocalServiceContent } from '../src/data/localServiceContent.js';
import { blogPosts } from '../src/data/blogData.js';
import {
    generateArticleSchema,
    generateBreadcrumbSchema,
    generateFAQSchema,
    generateOrganizationSchema,
    generateServiceSchema,
    generateWebSiteSchema,
} from '../src/lib/seo/schemaGenerators.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDirectory = path.resolve(__dirname, '../dist');
const siteUrl = 'https://fintaxvers.com';
const defaultImage = `${siteUrl}/image_c26745.png`;

const escapeHtml = (value = '') => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const schemaJson = (schema) => JSON.stringify(schema).replaceAll('<', '\\u003c');

const inlineMarkdown = (value) => escapeHtml(value)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.+?)`/g, '<code>$1</code>');

const markdownToHtml = (value = '') => value
    .replaceAll('\r', '')
    .split(/\n\s*\n/)
    .map((block) => {
        const lines = block.trim().split('\n').filter(Boolean);
        if (lines.length === 0) return '';
        const first = lines[0];

        if (first.startsWith('## ')) return `<h2>${inlineMarkdown(first.slice(3))}</h2>`;
        if (first.startsWith('### ')) return `<h3>${inlineMarkdown(first.slice(4))}</h3>`;
        if (lines.every((line) => line.trim().startsWith('- '))) {
            return `<ul>${lines.map((line) => `<li>${inlineMarkdown(line.trim().slice(2))}</li>`).join('')}</ul>`;
        }
        if (lines.every((line) => line.trim().startsWith('|'))) {
            return `<p>${inlineMarkdown(lines.join(' ').replaceAll('|', ' · '))}</p>`;
        }
        return `<p>${inlineMarkdown(lines.join(' '))}</p>`;
    })
    .join('\n');

const staticStyles = `
<style id="fintaxvers-static-seo-styles">
  #root[data-seo-prerendered="true"] { min-height: 100vh; color: #14233f; background: #f7f9fc; font-family: Inter, Arial, sans-serif; }
  .seo-page-header { display:flex; justify-content:space-between; gap:20px; align-items:center; padding:18px max(24px, calc((100% - 1120px)/2)); background:#fff; border-bottom:1px solid #e4eaf2; }
  .seo-page-brand { color:#102347; font-size:1.15rem; font-weight:800; text-decoration:none; }
  .seo-page-nav { display:flex; gap:18px; flex-wrap:wrap; }
  .seo-page-nav a { color:#4e607d; font-size:.9rem; font-weight:700; text-decoration:none; }
  .seo-page-main { width:min(1120px, calc(100% - 40px)); margin:0 auto; padding:38px 0 70px; }
  .seo-breadcrumb { margin-bottom:20px; color:#62728d; font-size:.86rem; }
  .seo-breadcrumb a { color:#186f45; text-decoration:none; }
  .seo-hero { padding:clamp(28px, 5vw, 58px); border-radius:24px; background:linear-gradient(135deg,#0e2349,#1e4a83); color:#fff; box-shadow:0 20px 42px rgba(17,45,91,.16); }
  .seo-kicker { color:#b9f0d1; font-size:.72rem; font-weight:800; letter-spacing:.1em; text-transform:uppercase; }
  .seo-hero h1 { max-width:800px; margin:12px 0; font-size:clamp(2rem, 5vw, 3.4rem); line-height:1.1; letter-spacing:-.04em; }
  .seo-hero p { max-width:780px; margin:0; color:rgba(255,255,255,.84); line-height:1.7; }
  .seo-content-grid { display:grid; grid-template-columns:minmax(0,1.5fr) minmax(280px,.75fr); gap:24px; margin-top:24px; }
  .seo-card { padding:28px; border:1px solid #e0e8f3; border-radius:18px; background:#fff; box-shadow:0 10px 26px rgba(27,67,122,.05); }
  .seo-card h2 { margin:0 0 12px; color:#14233f; font-size:1.35rem; }
  .seo-card h3 { margin:22px 0 8px; color:#17345f; font-size:1.05rem; }
  .seo-card p,.seo-card li { color:#52647e; line-height:1.72; }
  .seo-card ul { padding-left:20px; }
  .seo-card a { color:#0d7144; font-weight:700; }
  .seo-faq { display:grid; gap:10px; margin-top:24px; }
  .seo-faq details { padding:16px 18px; border:1px solid #e0e8f3; border-radius:13px; background:#fff; }
  .seo-faq summary { color:#14233f; cursor:pointer; font-weight:800; }
  .seo-faq p { margin:12px 0 0; color:#52647e; line-height:1.65; }
  .seo-cta { display:inline-block; margin-top:10px; padding:12px 17px; border-radius:10px; background:#16804c; color:#fff !important; text-decoration:none; }
  .seo-article-meta { margin:0 0 18px; color:#64748b; font-size:.88rem; }
  .seo-article { max-width:820px; margin:28px auto 0; padding:clamp(24px,4vw,44px); border:1px solid #e0e8f3; border-radius:20px; background:#fff; }
  .seo-article h2 { margin:32px 0 12px; color:#14233f; font-size:1.45rem; }
  .seo-article h3 { margin:24px 0 8px; color:#17345f; }
  .seo-article p,.seo-article li { color:#52647e; line-height:1.78; }
  .seo-article code { padding:2px 5px; border-radius:4px; background:#eef3f8; color:#213d64; }
  .seo-footer { margin-top:32px; color:#60708b; font-size:.84rem; text-align:center; }
  @media (max-width:720px) { .seo-page-header { align-items:flex-start; flex-direction:column; } .seo-content-grid { grid-template-columns:1fr; } .seo-page-main { width:min(100% - 28px,1120px); padding-top:24px; } }
</style>`;

const staticNavigation = `
<header class="seo-page-header">
  <a class="seo-page-brand" href="/">FinTaxVers</a>
  <nav class="seo-page-nav" aria-label="Primary navigation">
    <a href="/">Home</a><a href="/services/gst-returns-solutions">Services</a><a href="/calculators">Calculators</a><a href="/blog">Guides</a>
  </nav>
</header>`;

const cleanTemplateHead = (template) => template
    .replace(/<title>[\s\S]*?<\/title>\s*/i, '')
    .replace(/<meta\b[^>]*>\s*/gi, '')
    .replace(/<link\s+rel="canonical"[^>]*>\s*/gi, '')
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi, '');

const pageHead = ({ title, description, canonical, type = 'website', schemas }) => `
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
  <link rel="canonical" href="${escapeHtml(canonical)}" />
  <meta property="og:type" content="${type}" />
  <meta property="og:site_name" content="FinTaxVers Consultancy Services" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${escapeHtml(canonical)}" />
  <meta property="og:image" content="${defaultImage}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${defaultImage}" />
  ${schemas.map((schema) => `<script type="application/ld+json">${schemaJson(schema)}</script>`).join('\n  ')}
  ${staticStyles}`;

const createDocument = (template, { title, description, canonical, type, schemas, body }) => {
    const cleaned = cleanTemplateHead(template);
    const withHead = cleaned.replace('</head>', `${pageHead({ title, description, canonical, type, schemas })}\n</head>`);
    return withHead.replace('<div id="root"></div>', `<div id="root" data-seo-prerendered="true">${body}</div>`);
};

const staticPageFrame = ({ breadcrumb, hero, content }) => `
${staticNavigation}
<main class="seo-page-main">
  <div class="seo-breadcrumb">${breadcrumb}</div>
  ${hero}
  ${content}
  <footer class="seo-footer">FinTaxVers Consultancy Services · Nagpur &amp; Pan-India</footer>
</main>`;

const makeServicePage = (service) => {
    const localGuide = getLocalServiceContent(service.id, service.title);
    const canonical = `${siteUrl}/services/${service.id}`;
    const title = service.seoTitle || localGuide.seo.title;
    const description = service.metaDescription || localGuide.seo.description;
    const faqs = [...(service.faq || []), ...(localGuide.faqs || [])];
    const schemas = [
        generateOrganizationSchema(),
        generateWebSiteSchema(),
        generateServiceSchema({
            name: service.title,
            description: service.shortDesc || service.overview,
            category: service.category,
            url: canonical,
        }),
        generateBreadcrumbSchema([
            { name: 'Home', url: `${siteUrl}/` },
            { name: 'Services', url: `${siteUrl}/#services` },
            { name: service.title, url: canonical },
        ]),
        ...(faqs.length > 0 ? [generateFAQSchema(faqs)] : []),
    ];
    const hero = `<section class="seo-hero"><span class="seo-kicker">${escapeHtml(service.category)}</span><h1>${escapeHtml(service.title)}</h1><p>${escapeHtml(service.overview)}</p></section>`;
    const content = `
      <div class="seo-content-grid">
        <section class="seo-card"><h2>${escapeHtml(localGuide.heading)}</h2><p>${escapeHtml(localGuide.intro)}</p><h3>${escapeHtml(localGuide.checklistTitle)}</h3><ul>${localGuide.checklist.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul></section>
        <aside class="seo-card"><h2>Speak with FinTaxVers</h2><p>Discuss the relevant documents and next steps for your situation.</p><a class="seo-cta" href="tel:+918928895195">Call 8928895195</a></aside>
      </div>
      <section class="seo-card" style="margin-top:24px"><h2>About this service</h2>${service.detailedDescription}</section>
      <section class="seo-faq" aria-label="Frequently asked questions">${faqs.map((faq) => `<details><summary>${escapeHtml(faq.question)}</summary><p>${escapeHtml(faq.answer)}</p></details>`).join('')}</section>`;
    return { path: path.join(distDirectory, 'services', `${service.id}.html`), document: createDocument(template, {
        title,
        description,
        canonical,
        type: 'website',
        schemas,
        body: staticPageFrame({ breadcrumb: `<a href="/">Home</a> / <a href="/#services">Services</a> / ${escapeHtml(service.title)}`, hero, content }),
    }) };
};

const makeBlogPage = (post) => {
    const canonical = `${siteUrl}/blog/${post.slug}`;
    const title = post.metaTitle || `${post.title} | FinTaxVers`;
    const description = post.metaDescription || post.excerpt;
    const schemas = [
        generateOrganizationSchema(),
        generateWebSiteSchema(),
        generateArticleSchema({
            title: post.title,
            description,
            url: canonical,
            author: post.author || 'FinTaxVers',
            datePublished: post.date,
            dateModified: post.date,
            image: post.image || defaultImage,
        }),
        generateBreadcrumbSchema([
            { name: 'Home', url: `${siteUrl}/` },
            { name: 'Guides', url: `${siteUrl}/blog` },
            { name: post.title, url: canonical },
        ]),
        ...(post.faq?.length ? [generateFAQSchema(post.faq.map((faq) => ({ question: faq.q, answer: faq.a })))] : []),
    ];
    const hero = `<section class="seo-hero"><span class="seo-kicker">${escapeHtml(post.category || 'Guide')}</span><h1>${escapeHtml(post.title)}</h1><p>${escapeHtml(post.excerpt || description)}</p></section>`;
    const content = `<article class="seo-article"><p class="seo-article-meta">By ${escapeHtml(post.author || 'FinTaxVers')} · ${escapeHtml(post.date || '')} · ${escapeHtml(post.readTime || '')}</p>${markdownToHtml(post.content)}${post.faq?.length ? `<section class="seo-faq" aria-label="Frequently asked questions">${post.faq.map((faq) => `<details><summary>${escapeHtml(faq.q)}</summary><p>${escapeHtml(faq.a)}</p></details>`).join('')}</section>` : ''}</article>`;
    return { path: path.join(distDirectory, 'blog', `${post.slug}.html`), document: createDocument(template, {
        title,
        description,
        canonical,
        type: 'article',
        schemas,
        body: staticPageFrame({ breadcrumb: `<a href="/">Home</a> / <a href="/blog">Guides</a> / ${escapeHtml(post.title)}`, hero, content }),
    }) };
};

const template = await readFile(path.join(distDirectory, 'index.html'), 'utf8');
const pages = [
    ...Object.values(servicesData).map(makeServicePage),
    ...blogPosts.map(makeBlogPage),
];

await Promise.all(pages.map(async ({ path: outputPath, document }) => {
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, document, 'utf8');
}));

console.log(`Generated ${pages.length} crawlable static SEO pages.`);
