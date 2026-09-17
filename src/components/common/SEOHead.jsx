import React from 'react';
import { Helmet } from 'react-helmet-async';

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
    const fullTitle = title ? `${title} | FinTaxVers Consultancy – Nagpur` : 'Trusted Financial Consultancy Services in Nagpur | FinTaxVers – Yugant Rahele';
    const metaDesc = description || 'FinTaxVers Consultancy Services – Best financial consultant in Nagpur. Expert GST registration, income tax filing, business loan project reports & CMA reports. Founded by Yugant Rahele. Call +91-8928895195.';
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
            'addressCountry': 'IN'
        },
        'geo': {
            '@type': 'GeoCoordinates',
            'latitude': 21.1458,
            'longitude': 79.0882
        },
        'areaServed': [
            {
                '@type': 'AdministrativeArea',
                'name': 'Nagpur'
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
        'knowsAbout': [
            'GST Registration & Filing',
            'Income Tax Filing',
            'CMA Data & Project Financing Reports',
            'Business Loan Assistance',
            'MSME & Udyam Registration',
            'ROC & Company Compliance',
            'Digital Signature Certificate (DSC)',
            'Government Subsidy Consulting'
        ],
        'sameAs': [
            'https://fintaxvers.com',
            'https://share.google/1IwDqOBS8P4PNxiBU'
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
            {keywords && <meta name="keywords" content={keywords} />}
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

