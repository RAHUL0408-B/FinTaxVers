/**
 * FinTaxVers Knowledge Base
 * Structured, factual information about Indian taxation, GST, business compliance,
 * and FinTaxVers services. All information grounded in official Indian government sources.
 * 
 * IMPORTANT: This knowledge base contains general informational content only.
 * Specific tax calculations or legal decisions require personalized professional advice.
 * 
 * Sources:
 * - GST Portal: https://www.gst.gov.in
 * - Income Tax Department: https://www.incometax.gov.in
 * - MCA: https://www.mca.gov.in
 * - MSME Ministry: https://msme.gov.in
 * - RBI: https://www.rbi.org.in
 */
export const knowledgeBase = [
    // ==================== ORGANIZATION ====================
    {
        id: 'org-001',
        type: 'organization',
        title: 'About FinTaxVers Consultancy Services',
        content: `FinTaxVers Consultancy Services is a financial and tax consultancy firm based in Nagpur, Maharashtra, India, serving clients across Nagpur, Vidarbha, Maharashtra, and Pan-India. 
        
        Founded by Yugant V. Rahele, FinTaxVers provides services including: GST Registration & Return Filing, Income Tax Filing & Tax Planning, Tax Audit (Section 44AB), Internal Audit & Risk Controls, Accounting & Bookkeeping, Business Registration & Setup, Business Loans & CMA Reports, MSME Loan & Udyam Registration, Government Subsidy Consulting, ROC Compliance & Annual Filings, Company Registration (Pvt Ltd & LLP), and Digital Signature Certificates (DSC).
        
        Contact: Phone: +91-8928895195, +91-9011424236, +91-7057167045. Email: contact@fintaxvers.com. Location: Nagpur, Maharashtra, India, 440001.
        
        WhatsApp: +91-8928895195. Office: Nagpur, Maharashtra.`,
        source: 'https://fintaxvers.com',
        tags: ['fintaxvers', 'about', 'contact', 'location', 'services'],
    },

    // ==================== GST ====================
    {
        id: 'gst-001',
        type: 'service',
        title: 'GST Registration in India',
        content: `GST Registration is the process of obtaining a GSTIN (Goods and Services Tax Identification Number) from the government.

        Who needs GST registration:
        - Businesses with annual aggregate turnover exceeding ₹40 lakhs (₹20 lakhs for services; ₹10 lakhs for special category states) must register for GST.
        - Interstate suppliers regardless of turnover.
        - E-commerce operators and sellers on e-commerce platforms.
        - Casual taxable persons and non-resident taxable persons.
        - Businesses required to deduct TDS under GST.
        
        Documents required for GST registration:
        - PAN card of business/proprietor/partners/directors
        - Aadhaar card
        - Proof of business registration (partnership deed, MOA/AOA, etc.)
        - Bank account details (cancelled cheque or bank statement)
        - Proof of address of principal place of business (electricity bill, rent agreement, etc.)
        - Passport-size photograph of proprietor/authorized signatory
        
        GST registration process:
        1. Visit the GST portal (gst.gov.in) and click on 'Register Now'
        2. Fill Part A of REG-01 form with PAN, mobile, and email
        3. Verify OTP and receive Temporary Reference Number (TRN)
        4. Fill Part B using TRN with detailed business information
        5. Upload required documents
        6. Submit and receive Application Reference Number (ARN)
        7. Verification by GST officer (usually 3-7 working days)
        8. Receive GSTIN upon approval
        
        FinTaxVers provides end-to-end GST registration assistance. Call +91-8928895195.`,
        source: 'https://www.gst.gov.in',
        tags: ['gst', 'registration', 'gstin', 'gst portal'],
    },
    {
        id: 'gst-002',
        type: 'service',
        title: 'GST Return Filing — GSTR-1, GSTR-3B, GSTR-9',
        content: `GST return filing is the process of reporting applicable GST-related transactions through the relevant GST return forms to the government.

        Key GST returns:
        - GSTR-1: Monthly/quarterly statement of outward supplies (sales invoices). Due 11th of following month (monthly) or 13th of month following quarter (quarterly QRMP).
        - GSTR-3B: Monthly self-assessed summary return for tax payment. Due 20th of following month.
        - GSTR-9: Annual GST return. Due December 31st of following financial year.
        - GSTR-9C: Annual reconciliation statement (for businesses with turnover above ₹5 crore). Due with GSTR-9.
        - GSTR-2B: Auto-populated Input Tax Credit (ITC) statement.
        
        Invoice Management System (IMS):
        The GST portal's IMS allows buyers to accept, reject, or keep pending supplier invoices. Only accepted invoices qualify for Input Tax Credit.
        
        Common mistakes in GST filing:
        - Mismatch between GSTR-1 and GSTR-3B
        - Incorrect ITC claims
        - Missing reverse charge mechanism entries
        - Late filing penalties: ₹50/day (₹20/day for nil returns), maximum ₹10,000 per return.
        
        FinTaxVers manages complete GST lifecycle including registration, monthly/quarterly filings, ITC reconciliation, and GST notice handling.`,
        source: 'https://www.gst.gov.in',
        tags: ['gst', 'gstr-1', 'gstr-3b', 'gstr-9', 'return filing', 'itc'],
    },
    {
        id: 'gst-003',
        type: 'faq',
        title: 'GST Frequently Asked Questions',
        content: `Q: What is the GST threshold for mandatory registration?
        A: Businesses with aggregate annual turnover exceeding ₹40 lakhs (for goods) or ₹20 lakhs (for services) must register for GST. For special category states, the threshold is ₹10 lakhs.
        
        Q: What is GSTIN?
        A: GSTIN (Goods and Services Tax Identification Number) is a 15-digit unique identification number assigned to every GST-registered business in India.
        
        Q: What is Input Tax Credit (ITC)?
        A: ITC allows businesses to deduct the GST paid on inputs/purchases from the GST collected on sales, so tax is paid only on the value addition.
        
        Q: What is the penalty for late GST filing?
        A: Late fee is ₹50 per day (₹25 CGST + ₹25 SGST), maximum ₹10,000 per return. For nil returns, it is ₹20 per day maximum ₹10,000.
        
        Q: What is e-invoicing under GST?
        A: E-invoicing is the system where invoices are authenticated by the Invoice Registration Portal (IRP) and assigned an Invoice Reference Number (IRN). Mandatory for businesses with turnover above ₹5 crore (as of 2026).
        
        Q: What is the difference between CGST, SGST, and IGST?
        A: CGST (Central GST) and SGST (State GST) are charged on intra-state transactions, each at half the GST rate. IGST (Integrated GST) is charged on inter-state transactions at the full GST rate.`,
        source: 'https://www.gst.gov.in',
        tags: ['gst', 'faq', 'gstin', 'itc', 'e-invoicing'],
    },

    // ==================== INCOME TAX ====================
    {
        id: 'itr-001',
        type: 'service',
        title: 'Income Tax Return (ITR) Filing in India',
        content: `Income Tax Return (ITR) filing is the process of reporting income, deductions, and tax liability to the Income Tax Department of India.

        Who must file ITR:
        - Individuals with gross income exceeding the basic exemption limit (₹3 lakhs for new regime, ₹2.5 lakhs for old regime for individuals below 60 years as of AY 2025-26)
        - Companies and firms (mandatory regardless of profit/loss)
        - Individuals claiming refunds
        - Individuals with foreign assets or foreign income
        - Individuals with income from house property or capital gains
        
        ITR forms:
        - ITR-1 (SAHAJ): Salaried individuals, one house property, other sources up to ₹50 lakhs
        - ITR-2: Individuals with capital gains, more than one property, or foreign assets
        - ITR-3: Individuals with business or professional income
        - ITR-4 (SUGAM): Presumptive taxation under Section 44AD/44ADA/44AE
        - ITR-5: Partnership firms, LLPs
        - ITR-6: Companies
        - ITR-7: Trusts, political parties, etc.
        
        Key deductions (Old Tax Regime):
        - Section 80C: Up to ₹1.5 lakhs (ELSS, PPF, NSC, life insurance, home loan principal)
        - Section 80D: Medical insurance premium (up to ₹25,000; ₹50,000 for senior citizens)
        - Section 24(b): Home loan interest up to ₹2 lakhs
        - Section 80CCD(1B): NPS additional deduction up to ₹50,000
        
        Due dates (typically, subject to official notification each year):
        - Non-audit individuals/HUF: July 31st
        - Businesses requiring audit: October 31st
        - Belated return: December 31st (with penalty)
        
        FinTaxVers provides expert ITR filing for salaried individuals, businesses, capital gains, and NRIs.`,
        source: 'https://www.incometax.gov.in',
        tags: ['income tax', 'itr', 'tax return', 'deductions', 'salary', 'capital gains'],
    },

    // ==================== TAX AUDIT ====================
    {
        id: 'audit-001',
        type: 'service',
        title: 'Tax Audit under Section 44AB — Income Tax Act',
        content: `Tax Audit under Section 44AB of the Income Tax Act 1961 is a mandatory audit of accounts of certain businesses and professionals.

        Who requires Tax Audit:
        - Business entities with total sales/turnover exceeding ₹1 crore in a financial year (₹10 crores if cash transactions are less than or equal to 5% of total transactions)
        - Professionals with gross receipts exceeding ₹50 lakhs
        - Persons covered under presumptive taxation opting out and having income below the presumptive limit
        
        Forms required:
        - Form 3CA: Audit report for entities already required to get accounts audited under another law
        - Form 3CB: Audit report for entities not required to get accounts audited under any other law
        - Form 3CD: Statement of particulars (detailed annexure to 3CA or 3CB)
        
        Due date: Usually September 30th of the assessment year.
        
        Penalty for non-compliance: Lower of 0.5% of turnover or ₹1,50,000 under Section 271B.
        
        FinTaxVers provides complete Tax Audit services including Form 3CA, 3CB, and 3CD preparation.`,
        source: 'https://www.incometax.gov.in',
        tags: ['tax audit', 'section 44ab', '3ca', '3cb', '3cd', 'turnover'],
    },

    // ==================== BUSINESS REGISTRATION ====================
    {
        id: 'reg-001',
        type: 'service',
        title: 'Company Registration in India — Pvt Ltd, LLP, OPC',
        content: `Company registration in India is the process of formally incorporating a business entity under the Companies Act, 2013 or LLP Act, 2008 with the Ministry of Corporate Affairs (MCA).

        Types of business structures:
        - Private Limited Company (Pvt Ltd): Minimum 2 directors, 2 shareholders. Limited liability protection. Preferred for startups seeking investment.
        - Limited Liability Partnership (LLP): Minimum 2 partners. Combines features of partnership and limited liability. Lower compliance compared to Pvt Ltd.
        - One Person Company (OPC): Single director and single shareholder. Suitable for solo entrepreneurs.
        - Partnership Firm: Minimum 2 partners. Governed by Partnership Act. No limited liability.
        - Sole Proprietorship: Single owner. Simplest structure but no limited liability.
        
        Documents required for Pvt Ltd/LLP:
        - PAN card of all directors/partners
        - Aadhaar card of all directors/partners
        - Passport/Driving license/Voter ID
        - Bank statement/utility bill (address proof)
        - Proof of registered office (NOC from owner, electricity bill, rent agreement)
        - Passport-size photographs
        
        Process (Pvt Ltd via SPICe+):
        1. Obtain Digital Signature Certificate (DSC) for all directors
        2. Apply for Director Identification Number (DIN) (integrated in SPICe+)
        3. Name reservation via RUN (Reserve Unique Name) application
        4. File SPICe+ form (INC-32) with MCA21
        5. Draft and upload MOA (Memorandum of Association) and AOA (Articles of Association)
        6. Payment of MCA fees and stamp duty
        7. Receive Certificate of Incorporation (COI), CIN, PAN, and TAN
        8. Open company bank account
        
        FinTaxVers handles complete company/LLP formation including all MCA filings.`,
        source: 'https://www.mca.gov.in',
        tags: ['company registration', 'pvt ltd', 'llp', 'opc', 'incorporation', 'spice+', 'mca'],
    },

    // ==================== MSME ====================
    {
        id: 'msme-001',
        type: 'service',
        title: 'MSME Udyam Registration — Benefits & Process',
        content: `Udyam Registration (previously Udyog Aadhaar) is the official government registration for Micro, Small, and Medium Enterprises (MSMEs) in India.

        MSME classification (Revised):
        - Micro Enterprise: Investment in plant & machinery/equipment ≤ ₹1 crore AND Turnover ≤ ₹5 crores
        - Small Enterprise: Investment ≤ ₹10 crores AND Turnover ≤ ₹50 crores
        - Medium Enterprise: Investment ≤ ₹50 crores AND Turnover ≤ ₹250 crores

        Benefits of Udyam Registration:
        - Priority sector lending from banks
        - Eligibility for government schemes: PMEGP, CGTMSE, MUDRA
        - Collateral-free loans through CGTMSE scheme
        - Subsidies on patent registration, trademark registration
        - Protection against delayed payments under MSMED Act (Section 16)
        - 1% interest subvention on bank loans
        - Eligibility for government procurement preferences
        - Reimbursement of ISO certification fees
        
        Process:
        1. Visit udyamregistration.gov.in
        2. Enter Aadhaar number of entrepreneur/proprietor/director
        3. Verify with OTP
        4. Fill business details (PAN, GSTIN, bank account, NIC code)
        5. Self-certify investment and turnover
        6. Submit and receive Udyam Registration Certificate
        
        FinTaxVers assists with Udyam Registration and MSME loan applications including PMEGP and CGTMSE schemes.`,
        source: 'https://udyamregistration.gov.in',
        tags: ['msme', 'udyam', 'udyog aadhaar', 'msme registration', 'mudra', 'cgtmse', 'pmegp'],
    },

    // ==================== BUSINESS LOANS ====================
    {
        id: 'loan-001',
        type: 'service',
        title: 'Business Loans — CMA Data, MUDRA, CGTMSE, Business Finance',
        content: `Business loans are financial products for funding business operations, expansion, working capital, or capital expenditure.

        Types of business loans:
        - Term Loan: Fixed amount for capital expenditure or project. Repaid in fixed installments.
        - Working Capital (CC/OD): Cash Credit (CC) or Overdraft (OD) for day-to-day operations.
        - MUDRA Loan (Pradhan Mantri MUDRA Yojana - PMMY): Collateral-free loans up to ₹10 lakhs for non-corporate, non-farm micro enterprises.
          * Shishu: Up to ₹50,000
          * Kishore: ₹50,001 to ₹5 lakhs
          * Tarun: ₹5 lakhs to ₹10 lakhs
        - CGTMSE: Credit Guarantee Scheme providing collateral-free loans up to ₹5 crore for MSMEs.
        - Project Finance: Loans for new manufacturing/service projects based on CMA data.
        
        CMA (Credit Monitoring Arrangement) Data:
        Banks require CMA data for project financing and term loans. It includes:
        - Analysis of past financial statements (2-3 years)
        - Projected financial statements (3-5 years): Balance Sheet, P&L, Cash Flow
        - Fund Flow Statement
        - Working Capital Assessment
        - Key financial ratios
        
        Key documents for business loan application:
        - KYC documents (PAN, Aadhaar)
        - Business registration proof
        - GST registration certificate
        - ITR for past 2-3 years with CA certification
        - Balance sheet and P&L for past 2-3 years
        - Bank statements for past 12 months
        - Project report / CMA data (for term loans)
        - Property documents (for secured loans)
        
        FinTaxVers prepares bankable CMA reports, Detailed Project Reports (DPR), and assists with MUDRA, CGTMSE, PMEGP loan applications.`,
        source: 'https://www.mudra.org.in',
        tags: ['business loan', 'cma', 'mudra', 'cgtmse', 'pmegp', 'term loan', 'working capital'],
    },

    // ==================== ROC COMPLIANCE ====================
    {
        id: 'roc-001',
        type: 'service',
        title: 'ROC Compliance & Annual Filings for Companies and LLPs',
        content: `ROC (Registrar of Companies) compliance refers to statutory annual filings and other regulatory requirements for companies and LLPs with MCA (Ministry of Corporate Affairs).

        Annual compliance for Private Limited Companies:
        - Form AOC-4: Filing of financial statements (Balance Sheet, P&L, Directors Report). Due within 30 days of AGM.
        - Form MGT-7/MGT-7A: Annual Return. Due within 60 days of AGM.
        - AGM (Annual General Meeting): Must be held within 6 months of financial year end (September 30th).
        - Form ADT-1: Appointment of auditor. Due within 15 days of AGM.
        - DIR-3 KYC: Annual KYC of directors. Due September 30th each year.
        
        Annual compliance for LLPs:
        - Form 11 (LLP Annual Return): Due May 30th.
        - Form 8 (Statement of Accounts): Due October 30th.
        
        Penalties for non-compliance:
        - Additional fees apply for late filing of ROC forms.
        - Strike off from company register for prolonged non-compliance.
        
        FinTaxVers manages complete ROC annual compliance including AGM resolutions, DIR-3 KYC, and MCA filings.`,
        source: 'https://www.mca.gov.in',
        tags: ['roc', 'mca', 'annual compliance', 'aoc-4', 'mgt-7', 'dir-3 kyc', 'agm'],
    },

    // ==================== GOVERNMENT SUBSIDIES ====================
    {
        id: 'subsidy-001',
        type: 'service',
        title: 'Government Subsidy Consulting — PMEGP, CMEGP, PSI Maharashtra',
        content: `Government subsidy consulting involves identifying eligible government schemes and assisting businesses in claiming subsidies, grants, and financial assistance.

        Key government schemes:
        - PMEGP (Prime Minister's Employment Generation Programme): Subsidy up to 35% for setting up new micro-enterprises. Administered by KVIC, KVIB, and District Industries Centre (DIC). Loan amount: ₹10 lakhs to ₹50 lakhs for service, up to ₹2 crore for manufacturing.
        - CMEGP (Chief Minister's Employment Generation Programme - Maharashtra): State scheme similar to PMEGP for Maharashtra.
        - PSI (Package Scheme of Incentives - Maharashtra): Industrial subsidies for new and expansion units including electricity tariff subsidy, interest subsidy, stamp duty exemption.
        - Interest Subvention on MUDRA Loans.
        
        Eligibility criteria vary by scheme and are subject to government notifications.
        
        FinTaxVers assists with scheme identification, eligibility assessment, application preparation, and claim follow-up. Contact +91-8928895195 for guidance on available subsidies.`,
        source: 'https://www.kviconline.gov.in',
        tags: ['subsidy', 'pmegp', 'cmegp', 'psi maharashtra', 'government scheme', 'grant'],
    },

    // ==================== ACCOUNTING ====================
    {
        id: 'acc-001',
        type: 'service',
        title: 'Accounting & Bookkeeping Services for Businesses',
        content: `Accounting and bookkeeping services involve recording, classifying, and summarizing financial transactions of a business.

        Core accounting services:
        - Daily bookkeeping (recording transactions in Tally, Zoho Books, QuickBooks, or other software)
        - Bank reconciliation
        - Accounts payable and receivable management
        - Ledger maintenance
        - Monthly/quarterly P&L preparation
        - Balance Sheet preparation
        - MIS (Management Information System) reporting
        - Payroll processing and salary calculation
        - TDS deduction and challan payment
        - GST bookkeeping and reconciliation
        
        TDS (Tax Deducted at Source) compliance:
        - Deduct TDS as per applicable rates on salary, contractor payments, rent, professional fees, etc.
        - File quarterly TDS returns (Form 24Q for salary, 26Q for non-salary)
        - Issue Form 16/16A to deductees
        - Due dates: Quarterly returns due July 31st, October 31st, January 31st, May 31st.
        
        FinTaxVers provides end-to-end accounting, bookkeeping, and TDS compliance services.`,
        source: 'https://www.incometax.gov.in',
        tags: ['accounting', 'bookkeeping', 'tally', 'tds', 'payroll', 'bank reconciliation'],
    },

    // ==================== DSC ====================
    {
        id: 'dsc-001',
        type: 'service',
        title: 'Digital Signature Certificate (DSC) in India',
        content: `Digital Signature Certificate (DSC) is an electronic form of signature used to authenticate and secure electronic documents in India.

        Types of DSC:
        - Class 3 DSC: Most widely used. Required for Income Tax filing, GST registration, MCA filings, e-tendering, e-procurement.
        
        Who needs DSC:
        - Directors signing MCA forms
        - GST registration and authorized signatories
        - Income Tax e-filing (for certain categories)
        - E-tendering participants
        - Companies filing statutory forms
        
        Validity: Usually 1 or 2 years.
        
        Process for paperless Class 3 DSC (Aadhaar-based):
        1. Provide PAN and Aadhaar details
        2. Biometric/OTP verification
        3. DSC issued digitally (no physical token in newer paperless DSCs)
        
        FinTaxVers provides quick paperless Class 3 DSC with minimal documentation.`,
        source: 'https://www.mca.gov.in',
        tags: ['dsc', 'digital signature', 'class 3 dsc', 'e-filing', 'paperless dsc'],
    },

    // ==================== INTERNAL AUDIT ====================
    {
        id: 'intaudit-001',
        type: 'service',
        title: 'Internal Audit & Risk Controls',
        content: `Internal audit is an independent, objective assurance and consulting activity designed to add value and improve an organization's operations.

        Scope of internal audit services:
        - Internal Financial Controls (IFC) review and testing
        - Standard Operating Procedures (SOP) review and improvement
        - Risk assessment and fraud risk management
        - Operational efficiency reviews
        - Management audit
        - Compliance audit (taxation, statutory, regulatory)
        - IT system and access controls review
        
        Who needs internal audit:
        - Companies required under Companies Act 2013 (listed companies, unlisted public companies with paid-up share capital ≥ ₹50 crore, OPC/private companies with turnover ≥ ₹200 crore or outstanding loans ≥ ₹100 crore)
        - Businesses wanting to strengthen internal controls before external audit or loan application
        
        FinTaxVers provides internal audit services including risk assessment and IFC testing.`,
        source: 'https://www.mca.gov.in',
        tags: ['internal audit', 'ifc', 'risk assessment', 'fraud', 'sop', 'management audit'],
    },
];

export default knowledgeBase;