/**
 * FinTaxVers Schema.org JSON-LD Generators
 * AEO (Answer Engine Optimization) + GEO (Generative Engine Optimization)
 * All schema values must accurately represent visible page content.
 */

const SITE_URL = 'https://fintaxvers.com';
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const ORG_NAME = 'FinTaxVers Consultancy Services';

export const generateOrganizationSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    '@id': ORG_ID,
    name: ORG_NAME,
    alternateName: ['FinTaxVers', 'FinTaxVers Nagpur', 'FinTaxYug'],
    url: SITE_URL,
    logo: `${SITE_URL}/image_c26745.png`,
    telephone: ['+91-8928895195', '+91-9011424236', '+91-7057167045'],
    email: 'contact@fintaxvers.com',
    hasMap: 'https://share.google/1IwDqOBS8P4PNxiBU',
    address: {
        '@type': 'PostalAddress',
        addressLocality: 'Nagpur',
        addressRegion: 'Maharashtra',
        addressCountry: 'IN',
        postalCode: '440001',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 21.1458, longitude: 79.0882 },
    areaServed: [
        { '@type': 'City', name: 'Nagpur' },
        { '@type': 'AdministrativeArea', name: 'Vidarbha' },
        { '@type': 'AdministrativeArea', name: 'Maharashtra' },
        { '@type': 'Country', name: 'India' },
    ],
    founder: {
        '@type': 'Person',
        name: 'Yugant V. Rahele',
        jobTitle: 'Founder & Financial Consultant',
    },
    serviceType: [
        'GST Registration & Return Filing',
        'Income Tax Filing & Tax Planning',
        'Tax Audit (Section 44AB) Services',
        'Internal Audit & Risk Controls',
        'Accounting & Bookkeeping Services',
        'Business Registration & Setup',
        'Business Loan Project Reports (CMA)',
        'MSME Loan & Udyam Registration',
        'Subsidy Loan & Government Grants',
        'ROC Compliance & Annual Filings',
        'Company Registration (Pvt Ltd & LLP)',
    ],
    sameAs: [
        SITE_URL,
        'https://share.google/1IwDqOBS8P4PNxiBU',
        'https://www.linkedin.com/in/yugant-rahele-333101148/',
        'https://www.facebook.com/yugant.rahele',
        'https://www.instagram.com/fintaxvers',
    ],
});

export const generateWebSiteSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: ORG_NAME,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-IN',
    potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/blog?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
    },
});

/**
 * @param {{ name: string, description: string, url: string, image?: string, category?: string }} opts
 */
export const generateServiceSchema = ({ name, description, url, image, category }) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    ...(image ? { image } : {}),
    ...(category ? { serviceType: category } : {}),
    provider: { '@id': ORG_ID },
    areaServed: [
        { '@type': 'City', name: 'Nagpur' },
        { '@type': 'Country', name: 'India' },
    ],
});

/**
 * @param {Array<{question: string, answer: string}>} faqs
 */
export const generateFAQSchema = (faqs) => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
});

/**
 * @param {{ title: string, description: string, url: string, author: string, datePublished: string, dateModified?: string, image?: string }} opts
 */
export const generateArticleSchema = ({ title, description, url, author, datePublished, dateModified, image }) => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    author: { '@type': 'Person', name: author },
    publisher: {
        '@id': ORG_ID,
        '@type': 'Organization',
        name: ORG_NAME,
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/image_c26745.png` },
    },
    datePublished,
    dateModified: dateModified || datePublished,
    ...(image ? { image } : {}),
    inLanguage: 'en-IN',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
});

/**
 * @param {Array<{name: string, url: string}>} crumbs
 */
export const generateBreadcrumbSchema = (crumbs) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url,
    })),
});