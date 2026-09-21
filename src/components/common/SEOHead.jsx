import React from 'react';
import { Helmet } from 'react-helmet-async';
import { generateOrganizationSchema, generateWebSiteSchema } from '../../lib/seo/schemaGenerators';

const DEFAULT_KEYWORDS = 'FinTaxVers, FinTaxVers Consultancy Services, FinTaxVers Nagpur, Yugant Rahele, GST, GST Nagpur, GST registration Nagpur, GST return filing Nagpur, Income Tax, Income Tax Nagpur, Income Tax Filing Nagpur, ITR filing Nagpur, Tax Audit, Tax Audit Nagpur, Tax Audit services 44AB Nagpur, Internal Audit, Internal Audit Nagpur, Internal Audit services, Accounting, Accounting services Nagpur, bookkeeping Nagpur, Business Registration, Business Registration Nagpur, startup registration Nagpur, Business Loan, Business Loan Nagpur, business loan project report Nagpur, CMA report Nagpur, MSME Loan, MSME Loan Nagpur, MSME registration Nagpur, Udyam registration Nagpur, Subsidy Loan, Subsidy Loan Nagpur, government subsidy consulting, PMEGP subsidy Nagpur, ROC Compliance, ROC Compliance Nagpur, MCA filing Nagpur, Company Registration, Company Registration Nagpur, Pvt Ltd company registration Nagpur, LLP registration Nagpur, financial consultant near me Nagpur, best financial advisor Nagpur, financial consultancy India';

/**
 * SEOHead — universal SEO + AEO + GEO meta component.
 *
 * Props:
 *   title          — page title prefix (without site suffix)
 *   description    — meta description
 *   keywords       — extra keywords (merged with defaults)
 *   canonical      — full canonical URL
 *   ogImage        — Open Graph image URL
 *   schema         — additional JSON-LD schema object (e.g. Service schema)
 *   articleSchema  — Article schema object
 *   faqSchema      — FAQPage schema object
 *   breadcrumbSchema — BreadcrumbList schema object
 *   noIndex        — set true ONLY for private/admin pages
 */
const SEOHead = ({ 
    title, 
    description, 
    keywords, 
    canonical, 
    ogImage = 'https://fintaxvers.com/image_c26745.png', 
    schema = null, 
    articleSchema = null,
    faqSchema = null,
    breadcrumbSchema = null,
    noIndex = false,
}) => {
    const fullTitle = title 
        ? `${title} | FinTaxVers Consultancy – Nagpur & Pan-India` 
        : 'FinTaxVers | GST, Income Tax, Tax Audit, Internal Audit, Accounting, Business & MSME Loans, ROC Compliance, Company Registration | Nagpur & Pan-India';
    
    const metaDesc = description || 'FinTaxVers Consultancy Services – Top financial & tax consultant in Nagpur & Pan-India. Expert GST, Income Tax filing, Tax Audit, Internal Audit, Accounting, Business Registration, Business Loans, MSME Loans, Subsidy Loans, ROC Compliance & Company Registration. Founded by Yugant Rahele. Call +91-8928895195.';
    const metaKeywords = keywords ? `${keywords}, ${DEFAULT_KEYWORDS}` : DEFAULT_KEYWORDS;
    const canonicalUrl = canonical || 'https://fintaxvers.com/';

    // Use centralized schema generators for consistency across all pages
    const orgSchema = generateOrganizationSchema();
    const siteSchema = generateWebSiteSchema();

    return (
        <Helmet>
            {/* Standard SEO */}
            <title>{fullTitle}</title>
            <meta name="description" content={metaDesc} />
            <meta name="keywords" content={metaKeywords} />
            <link rel="canonical" href={canonicalUrl} />
            <meta name="author" content="Yugant V. Rahele - FinTaxVers Consultancy Services" />
            <meta name="publisher" content="FinTaxVers Consultancy Services" />

            {/* Robots */}
            {noIndex
                ? <meta name="robots" content="noindex, nofollow" />
                : <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
            }
            {!noIndex && <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />}
            {!noIndex && <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large" />}

            {/* AEO — AI Answer Engine bots */}
            {!noIndex && <meta name="chatgpt-bot" content="index, follow" />}
            {!noIndex && <meta name="perplexity-bot" content="index, follow" />}
            {!noIndex && <meta name="anthropic-ai" content="index, follow" />}
            {!noIndex && <meta name="claudebot" content="index, follow" />}
            {!noIndex && <meta name="gptbot" content="index, follow" />}

            {/* GEO — Geographic & Regional Targeting */}
            <meta name="geo.region" content="IN-MH" />
            <meta name="geo.placename" content="Nagpur" />
            <meta name="geo.position" content="21.1458;79.0882" />
            <meta name="ICBM" content="21.1458, 79.0882" />

            {/* Citation & AI Verification Tags (GEO / AEO) */}
            <meta name="citation_title" content={fullTitle} />
            <meta name="citation_publisher" content="FinTaxVers Consultancy Services" />
            <meta name="ai-content-declaration" content="verified-financial-consultancy" />
            <meta name="content-authority" content="financial-tax-consultancy-india" />

            {/* Open Graph */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDesc} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:type" content={articleSchema ? 'article' : 'website'} />
            <meta property="og:site_name" content="FinTaxVers Consultancy Services" />
            <meta property="og:locale" content="en_IN" />

            {/* Twitter / X Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDesc} />
            <meta name="twitter:image" content={ogImage} />

            {/* JSON-LD — Organization + Website always present on public pages */}
            {!noIndex && <script type="application/ld+json">{JSON.stringify(orgSchema)}</script>}
            {!noIndex && <script type="application/ld+json">{JSON.stringify(siteSchema)}</script>}

            {/* Dynamic page-level schemas */}
            {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
            {articleSchema && <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>}
            {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
            {breadcrumbSchema && <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>}
        </Helmet>
    );
};

export default SEOHead;

