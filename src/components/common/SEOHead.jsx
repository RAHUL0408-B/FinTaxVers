import React from 'react';
import { Helmet } from 'react-helmet-async';

const DEFAULT_KEYWORDS = 'FinTaxVers, FinTaxVers Consultancy Services, FinTaxVers Nagpur, Yugant Rahele, GST, GST Nagpur, GST registration Nagpur, GST return filing Nagpur, Income Tax, Income Tax Nagpur, Income Tax Filing Nagpur, ITR filing Nagpur, Tax Audit, Tax Audit Nagpur, Tax Audit services 44AB Nagpur, Internal Audit, Internal Audit Nagpur, Internal Audit services, Accounting, Accounting services Nagpur, bookkeeping Nagpur, Business Registration, Business Registration Nagpur, startup registration Nagpur, Business Loan, Business Loan Nagpur, business loan project report Nagpur, CMA report Nagpur, MSME Loan, MSME Loan Nagpur, MSME registration Nagpur, Udyam registration Nagpur, Subsidy Loan, Subsidy Loan Nagpur, government subsidy consulting, PMEGP subsidy Nagpur, ROC Compliance, ROC Compliance Nagpur, MCA filing Nagpur, Company Registration, Company Registration Nagpur, Pvt Ltd company registration Nagpur, LLP registration Nagpur, financial consultant near me Nagpur, best financial advisor Nagpur, financial consultancy India';

const SEOHead = ({ 
    title, 
    description, 
    keywords, 
    canonical, 
    ogImage = 'https://fintaxvers.com/image_c26745.png', 
    schema = null, 
    articleSchema = null,
    faqSchema = null
}) => {
    const fullTitle = title 
        ? `${title} | FinTaxVers Consultancy – Nagpur & Pan-India` 
        : 'FinTaxVers | GST, Income Tax, Tax Audit, Internal Audit, Accounting, Business & MSME Loans, ROC Compliance, Company Registration | Nagpur & Pan-India';
    
    const metaDesc = description || 'FinTaxVers Consultancy Services – Top financial & tax consultant in Nagpur & Pan-India. Expert GST, Income Tax filing, Tax Audit, Internal Audit, Accounting, Business Registration, Business Loans, MSME Loans, Subsidy Loans, ROC Compliance & Company Registration. Founded by Yugant Rahele. Call +91-8928895195.';
    const metaKeywords = keywords ? `${keywords}, ${DEFAULT_KEYWORDS}` : DEFAULT_KEYWORDS;
    const canonicalUrl = canonical || 'https://fintaxvers.com/';

    // Default AEO / GEO Organization & FinancialService Schema for AI Search Engines (ChatGPT, Perplexity, Gemini, Claude, SGE)
    const defaultOrganizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'FinancialService',
        '@id': 'https://fintaxvers.com/#organization',
        'name': 'FinTaxVers Consultancy Services',
        'alternateName': ['FinTaxVers', 'FinTaxVers Nagpur', 'FinTaxYug'],
        'url': 'https://fintaxvers.com',
        'logo': 'https://fintaxvers.com/image_c26745.png',
        'image': ogImage,
        'description': metaDesc,
        'telephone': ['+91-8928895195', '+91-9011424236', '+91-7057167045'],
        'email': 'admin@fintaxvers.com',
        'hasMap': 'https://share.google/1IwDqOBS8P4PNxiBU',
        'address': {
            '@type': 'PostalAddress',
            'addressLocality': 'Nagpur',
            'addressRegion': 'Maharashtra',
            'addressCountry': 'IN',
            'postalCode': '440001'
        },
        'geo': {
            '@type': 'GeoCoordinates',
            'latitude': 21.1458,
            'longitude': 79.0882
        },
        'areaServed': [
            {
                '@type': 'City',
                'name': 'Nagpur'
            },
            {
                '@type': 'AdministrativeArea',
                'name': 'Vidarbha'
            },
            {
                '@type': 'AdministrativeArea',
                'name': 'Maharashtra'
            },
            {
                '@type': 'Country',
                'name': 'India'
            }
        ],
        'founder': {
            '@type': 'Person',
            'name': 'Yugant V. Rahele',
            'jobTitle': 'Founder & Financial Consultant',
            'alumniOf': 'MBA Finance'
        },
        'serviceType': [
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
            'Company Registration (Pvt Ltd & LLP)'
        ],
        'knowsAbout': [
            'GST',
            'Income Tax',
            'Tax Audit',
            'Internal Audit',
            'Accounting',
            'Business Registration',
            'Business Loan',
            'MSME Loan',
            'Subsidy Loan',
            'ROC Compliance',
            'Company Registration',
            'CMA Data & Project Financing',
            'Financial Planning & Advisory in Nagpur'
        ],
        'sameAs': [
            'https://fintaxvers.com',
            'https://share.google/1IwDqOBS8P4PNxiBU',
            'https://www.linkedin.com/in/yugant-rahele-333101148/',
            'https://www.facebook.com/yugant.rahele',
            'https://www.instagram.com/fintaxvers'
        ]
    };

    const defaultWebSiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': 'https://fintaxvers.com/#website',
        'url': 'https://fintaxvers.com',
        'name': 'FinTaxVers Consultancy Services',
        'publisher': {
            '@id': 'https://fintaxvers.com/#organization'
        },
        'inLanguage': 'en-IN'
    };

    return (
        <Helmet>
            {/* Standard SEO */}
            <title>{fullTitle}</title>
            <meta name="description" content={metaDesc} />
            <meta name="keywords" content={metaKeywords} />
            <link rel="canonical" href={canonicalUrl} />
            <meta name="author" content="Yugant V. Rahele - FinTaxVers Consultancy Services" />
            <meta name="publisher" content="FinTaxVers Consultancy Services" />

            {/* AEO & GEO Specific Meta Tags for AI Answer Engines */}
            <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
            <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
            <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large" />
            <meta name="chatgpt-bot" content="index, follow" />
            <meta name="perplexity-bot" content="index, follow" />
            <meta name="anthropic-ai" content="index, follow" />
            <meta name="claudebot" content="index, follow" />

            {/* GEO (Geographic & Regional Targeting) Tags */}
            <meta name="geo.region" content="IN-MH" />
            <meta name="geo.placename" content="Nagpur" />
            <meta name="geo.position" content="21.1458;79.0882" />
            <meta name="ICBM" content="21.1458, 79.0882" />

            {/* Citation & AI Verification Tags */}
            <meta name="citation_title" content={fullTitle} />
            <meta name="citation_publisher" content="FinTaxVers Consultancy Services" />
            <meta name="ai-content-declaration" content="verified-financial-consultancy" />

            {/* OpenGraph & Social */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDesc} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:type" content={articleSchema ? 'article' : 'website'} />
            <meta property="og:site_name" content="FinTaxVers Consultancy Services" />
            <meta property="og:locale" content="en_IN" />

            {/* Twitter / X */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDesc} />
            <meta name="twitter:image" content={ogImage} />

            {/* JSON-LD Schemas for AEO / GEO Engine Citation */}
            <script type="application/ld+json">{JSON.stringify(defaultOrganizationSchema)}</script>
            <script type="application/ld+json">{JSON.stringify(defaultWebSiteSchema)}</script>
            {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
            {articleSchema && <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>}
            {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
        </Helmet>
    );
};

export default SEOHead;

