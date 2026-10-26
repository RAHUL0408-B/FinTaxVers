import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { servicesData } from '../src/data/servicesData.js';
import { blogPosts } from '../src/data/blogData.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteUrl = 'https://fintaxvers.com';
const outputPath = path.resolve(__dirname, '../public/sitemap.xml');

const staticRoutes = [
    { path: '/', changefreq: 'weekly', priority: '1.0' },
    { path: '/calculators', changefreq: 'monthly', priority: '0.8' },
    { path: '/links', changefreq: 'monthly', priority: '0.7' },
    { path: '/blog', changefreq: 'weekly', priority: '0.8' },
];

const escapeXml = (value) => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

const toUrl = ({ path: routePath, lastmod, changefreq, priority }) => [
    '  <url>',
    `    <loc>${escapeXml(`${siteUrl}${routePath}`)}</loc>`,
    lastmod ? `    <lastmod>${escapeXml(lastmod)}</lastmod>` : '',
    changefreq ? `    <changefreq>${changefreq}</changefreq>` : '',
    priority ? `    <priority>${priority}</priority>` : '',
    '  </url>',
].filter(Boolean).join('\n');

const routes = [
    ...staticRoutes,
    ...Object.keys(servicesData).map((id) => ({
        path: `/services/${id}`,
        changefreq: 'monthly',
        priority: '0.7',
    })),
    ...blogPosts.map((post) => ({
        path: `/blog/${post.slug}`,
        lastmod: post.date,
        changefreq: 'monthly',
        priority: '0.7',
    })),
];

const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...routes.map(toUrl),
    '</urlset>',
    '',
].join('\n');

await writeFile(outputPath, sitemap, 'utf8');
console.log(`Generated sitemap with ${routes.length} public URLs.`);
