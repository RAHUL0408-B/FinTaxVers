import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    ArrowRight,
    Calculator,
    ChevronDown,
    CircleDollarSign,
    House,
    Landmark,
    ReceiptText,
    ShieldCheck,
    TrendingUp,
    WalletCards,
} from 'lucide-react';
import SIPCalculator from '../../components/calculators/SIPCalculator';
import StepUpSIPCalculator from '../../components/calculators/StepUpSIPCalculator';
import MFCalculator from '../../components/calculators/MFCalculator';
import CAGRCalculator from '../../components/calculators/CAGRCalculator';
import EMICalculator from '../../components/calculators/EMICalculator';
import HomeAffordabilityCalculator from '../../components/calculators/HomeAffordabilityCalculator';
import EMISIPCalculator from '../../components/calculators/EMISIPCalculator';
import IncomeTaxCalculator from '../../components/calculators/IncomeTaxCalculator';
import HRACalculator from '../../components/calculators/HRACalculator';
import NPSCalculator from '../../components/calculators/NPSCalculator';
import SWPCalculator from '../../components/calculators/SWPCalculator';
import EmergencyFundCalculator from '../../components/calculators/EmergencyFundCalculator';
import GoalCalculator from '../../components/calculators/GoalCalculator';
import EducationCalculator from '../../components/calculators/EducationCalculator';
import RetirementCalculator from '../../components/calculators/RetirementCalculator';
import WealthTargetCalculator from '../../components/calculators/WealthTargetCalculator';
import NetworthCalculator from '../../components/calculators/NetworthCalculator';
import CostOfDelayCalculator from '../../components/calculators/CostOfDelayCalculator';
import PurchasingPowerCalculator from '../../components/calculators/PurchasingPowerCalculator';
import Navbar from '../../components/common/Navbar';
import SEOHead from '../../components/common/SEOHead';
import Footer from '../../components/common/Footer';
import './Calculators.css';

const categories = [
    { id: 'all', label: 'All tools', Icon: Calculator },
    { id: 'investment', label: 'Investing', Icon: TrendingUp },
    { id: 'loans', label: 'Loans', Icon: House },
    { id: 'tax', label: 'Tax', Icon: ReceiptText },
    { id: 'planning', label: 'Planning', Icon: WalletCards },
];

const categoryVisuals = {
    investment: { label: 'Investing', Icon: TrendingUp },
    loans: { label: 'Loans', Icon: House },
    tax: { label: 'Tax', Icon: ReceiptText },
    planning: { label: 'Planning', Icon: WalletCards },
};

const calculatorsList = [
    { id: 'sip', title: 'SIP Calculator', desc: 'Estimate the potential value of a regular monthly investment.', category: 'investment' },
    { id: 'step-up-sip', title: 'Step-up SIP Calculator', desc: 'See how increasing a SIP each year could affect an estimate.', category: 'investment' },
    { id: 'mf', title: 'Lumpsum Calculator', desc: 'Project the possible value of a one-time investment.', category: 'investment' },
    { id: 'cagr', title: 'CAGR Calculator', desc: 'Calculate the annualised growth rate between two values.', category: 'investment' },
    { id: 'emi', title: 'EMI Calculator', desc: 'Estimate monthly instalments, interest and total repayment.', category: 'loans' },
    { id: 'home-affordability', title: 'Home Affordability', desc: 'Explore a home budget based on your repayment capacity.', category: 'loans' },
    { id: 'emi-sip', title: 'EMI & SIP Calculator', desc: 'Compare a loan repayment with a potential SIP approach.', category: 'loans' },
    { id: 'income-tax', title: 'Income Tax Calculator', desc: 'Get a quick new-regime income-tax estimate.', category: 'tax' },
    { id: 'hra', title: 'HRA Calculator', desc: 'Estimate HRA exemption using your salary and rent inputs.', category: 'tax' },
    { id: 'nps', title: 'NPS Calculator', desc: 'Explore a potential National Pension System corpus.', category: 'planning' },
    { id: 'swp', title: 'SWP Calculator', desc: 'Estimate the value of a corpus during scheduled withdrawals.', category: 'investment' },
    { id: 'emergency-fund', title: 'Emergency Fund', desc: 'Plan a practical cash reserve for unexpected expenses.', category: 'planning' },
    { id: 'goal', title: 'Goal Planner', desc: 'Estimate the monthly amount needed for a financial goal.', category: 'planning' },
    { id: 'education', title: 'Education Planner', desc: 'Plan for a child’s future education costs.', category: 'planning' },
    { id: 'retirement', title: 'Retirement Planner', desc: 'Explore a retirement corpus and monthly investment estimate.', category: 'planning' },
    { id: 'wealth-target', title: 'Wealth Target', desc: 'Estimate the investment required for a future wealth target.', category: 'investment' },
    { id: 'networth', title: 'Net Worth', desc: 'Bring assets and liabilities together for a clearer snapshot.', category: 'planning' },
    { id: 'cost-of-delay', title: 'Cost of Delay', desc: 'See how postponing an investment can affect an estimate.', category: 'investment' },
    { id: 'purchasing-power', title: 'Purchasing Power', desc: 'Explore how inflation can affect future value.', category: 'planning' },
];

const calculatorComponents = {
    sip: SIPCalculator,
    'step-up-sip': StepUpSIPCalculator,
    mf: MFCalculator,
    cagr: CAGRCalculator,
    emi: EMICalculator,
    'home-affordability': HomeAffordabilityCalculator,
    'emi-sip': EMISIPCalculator,
    'income-tax': IncomeTaxCalculator,
    hra: HRACalculator,
    nps: NPSCalculator,
    swp: SWPCalculator,
    'emergency-fund': EmergencyFundCalculator,
    goal: GoalCalculator,
    education: EducationCalculator,
    retirement: RetirementCalculator,
    'wealth-target': WealthTargetCalculator,
    networth: NetworthCalculator,
    'cost-of-delay': CostOfDelayCalculator,
    'purchasing-power': PurchasingPowerCalculator,
};

const calcSEO = {
    sip: { title: 'SIP Calculator India – Calculate SIP Returns', desc: 'Use FinTaxVers’ free SIP calculator to estimate a potential investment value from monthly contributions and an assumed rate of return.' },
    emi: { title: 'EMI Calculator India – Calculate Loan EMI', desc: 'Use FinTaxVers’ free EMI calculator to estimate monthly instalments, interest and repayment for a loan.' },
    'income-tax': { title: 'Income Tax Calculator India – New Regime Estimate', desc: 'Use FinTaxVers’ income-tax calculator for a quick new-regime estimate. Check current rules before filing.' },
    hra: { title: 'HRA Calculator India – Estimate HRA Exemption', desc: 'Use FinTaxVers’ free HRA calculator for an indicative HRA exemption estimate based on your inputs.' },
};

const calcFAQs = [
    { q: 'What do these calculators show?', a: 'They provide planning estimates based on the values you enter. Investment performance, lending terms and tax outcomes can differ from an estimate.' },
    { q: 'How is a SIP estimate calculated?', a: 'The SIP calculator uses your monthly contribution, an assumed annual return and your chosen time period to estimate a potential future value.' },
    { q: 'How is an EMI estimate calculated?', a: 'The EMI calculator uses the loan amount, interest rate and tenure to estimate an equal monthly instalment and the related interest amount.' },
    { q: 'Can I rely on the tax result for filing?', a: 'Use it as a preliminary estimate only. Tax laws, deductions and personal circumstances should be checked against current official guidance before filing.' },
    { q: 'Are the calculators free to use?', a: 'Yes. The FinTaxVers calculators are free to use and do not require registration.' },
];

const featuredIds = ['sip', 'emi', 'income-tax'];

function Calculators() {
    const [selectedCalc, setSelectedCalc] = useState(null);
    const [activeCategory, setActiveCategory] = useState('all');
    const [dismissedLocationKey, setDismissedLocationKey] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const routeCalcId = calculatorComponents[location.state?.calcId] ? location.state.calcId : null;
    const activeCalcId = selectedCalc || (routeCalcId && dismissedLocationKey !== location.key ? routeCalcId : null);
    const selectedCalculator = calculatorsList.find((calculator) => calculator.id === activeCalcId);
    const ActiveCalculator = activeCalcId ? calculatorComponents[activeCalcId] : null;
    const activeSEO = activeCalcId ? calcSEO[activeCalcId] : null;
    const visibleCalculators = useMemo(
        () => activeCategory === 'all'
            ? calculatorsList
            : calculatorsList.filter((calculator) => calculator.category === activeCategory),
        [activeCategory],
    );
    const calcSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: calcFAQs.map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
    };

    const openCalculator = (calculatorId) => {
        setSelectedCalc(calculatorId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const requestGuidance = () => {
        const calculatorName = selectedCalculator?.title || 'financial calculator';
        navigate(`/?message=${encodeURIComponent(`I used the ${calculatorName} and would like guidance on my next step. `)}&type=${encodeURIComponent('Financial Planning')}`);
    };

    return (
        <div className="calculators-page">
            <SEOHead
                title={activeSEO?.title || 'Free Financial Calculators India – SIP, EMI, Income Tax & More'}
                description={activeSEO?.desc || 'Explore free FinTaxVers financial calculators for SIP, EMI, income tax, HRA, retirement and more. Results are planning estimates.'}
                keywords="financial calculators India, SIP calculator, EMI calculator, income tax calculator, HRA calculator, retirement calculator, FinTaxVers"
                canonical="https://fintaxvers.com/calculators"
                schema={!activeCalcId ? calcSchema : undefined}
            />
            <Navbar />

            <main className="calculators-shell">
                {activeCalcId && selectedCalculator && ActiveCalculator ? (
                    <section className="calculator-active-view" aria-labelledby="active-calculator-title">
                        <button className="calculator-back" type="button" onClick={() => { setSelectedCalc(null); setDismissedLocationKey(location.key); }}>
                            <ArrowLeft size={17} aria-hidden="true" />
                            All calculators
                        </button>
                        <div className="calculator-active-heading">
                            <h1 id="active-calculator-title">{selectedCalculator.title}</h1>
                            <p>{selectedCalculator.desc}</p>
                        </div>
                        <ActiveCalculator />
                        <aside className="calculator-estimate-note">
                            <ShieldCheck size={20} aria-hidden="true" />
                            <p><strong>Plan with context.</strong> Results are estimates, not financial, lending or tax advice. Review current rules and your individual details before acting.</p>
                        </aside>
                        <section className="calculator-guidance-card" aria-label="Get guidance from FinTaxVers">
                            <div>
                                <span>Need a second look?</span>
                                <h2>Discuss your estimate with FinTaxVers</h2>
                                <p>Bring your inputs and goals for a more personal discussion.</p>
                            </div>
                            <button type="button" onClick={requestGuidance}>
                                Get guidance <ArrowRight size={16} aria-hidden="true" />
                            </button>
                        </section>
                    </section>
                ) : (
                    <>
                        <section className="calculator-hero" aria-labelledby="calculator-page-title">
                            <div className="calculator-hero-copy">
                                <h1 id="calculator-page-title">Make the next money decision clearer.</h1>
                                <p>Explore simple, private calculators for investing, loans, tax and life goals—built to turn a few inputs into a useful starting point.</p>
                                <div className="calculator-hero-metrics" aria-label="Calculator highlights">
                                    <div><strong>{calculatorsList.length}</strong><span>free tools</span></div>
                                    <div><strong>4</strong><span>planning areas</span></div>
                                    <div><strong>0</strong><span>sign-up needed</span></div>
                                </div>
                            </div>
                            <div className="calculator-hero-art" aria-hidden="true">
                                <div className="calculator-art-glow" />
                                <div className="calculator-art-panel calculator-art-panel-main">
                                    <Calculator size={30} strokeWidth={1.8} />
                                    <span>Plan</span>
                                    <strong>with confidence</strong>
                                </div>
                                <div className="calculator-art-panel calculator-art-panel-top"><TrendingUp size={19} /><span>Growth</span></div>
                                <div className="calculator-art-panel calculator-art-panel-bottom"><CircleDollarSign size={19} /><span>Clarity</span></div>
                            </div>
                        </section>

                        <section className="calculator-quick-start" aria-labelledby="quick-start-title">
                            <div className="section-intro">
                                <span>Popular starting points</span>
                                <h2 id="quick-start-title">Start with the question you have today.</h2>
                            </div>
                            <div className="calculator-quick-grid">
                                {calculatorsList.filter((calculator) => featuredIds.includes(calculator.id)).map((calculator) => {
                                    const visual = categoryVisuals[calculator.category];
                                    return (
                                        <button className="calculator-quick-card" key={calculator.id} type="button" onClick={() => openCalculator(calculator.id)}>
                                            <span className={`calculator-icon calculator-icon-${calculator.category}`}>{React.createElement(visual.Icon, { size: 21, 'aria-hidden': true })}</span>
                                            <span className="calculator-quick-copy"><strong>{calculator.title}</strong><small>{calculator.desc}</small></span>
                                            <ArrowRight size={18} aria-hidden="true" />
                                        </button>
                                    );
                                })}
                            </div>
                        </section>

                        <section className="calculator-library" aria-labelledby="calculator-library-title">
                            <div className="calculator-library-heading">
                                <div>
                                    <span>Explore the toolkit</span>
                                    <h2 id="calculator-library-title">Choose a calculator for your next move.</h2>
                                    <p>Each tool gives an indicative result using the inputs you control.</p>
                                </div>
                                <div className="calculator-filter-list" aria-label="Filter calculators by type">
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            type="button"
                                            className={activeCategory === category.id ? 'active' : ''}
                                            onClick={() => setActiveCategory(category.id)}
                                            aria-pressed={activeCategory === category.id}
                                        >
                                            {React.createElement(category.Icon, { size: 15, 'aria-hidden': true })}
                                            {category.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="calculator-tool-grid">
                                {visibleCalculators.map((calculator) => {
                                    const visual = categoryVisuals[calculator.category];
                                    return (
                                        <button className="calculator-tool-card" key={calculator.id} type="button" onClick={() => openCalculator(calculator.id)}>
                                            <span className={`calculator-icon calculator-icon-${calculator.category}`}>{React.createElement(visual.Icon, { size: 22, 'aria-hidden': true })}</span>
                                            <span className="calculator-card-content">
                                                <small>{visual.label}</small>
                                                <strong>{calculator.title}</strong>
                                                <span>{calculator.desc}</span>
                                            </span>
                                            <span className="calculator-card-action">Open tool <ArrowRight size={15} aria-hidden="true" /></span>
                                        </button>
                                    );
                                })}
                            </div>
                        </section>

                        <section className="calculator-faq-section" aria-labelledby="calculator-faq-title">
                            <div className="section-intro calculator-faq-intro">
                                <span>Before you begin</span>
                                <h2 id="calculator-faq-title">A few useful answers.</h2>
                            </div>
                            <div className="calculator-faq-list">
                                {calcFAQs.map((faq) => (
                                    <details key={faq.q} className="calculator-faq-item">
                                        <summary>
                                            <span>{faq.q}</span>
                                            <ChevronDown size={18} aria-hidden="true" />
                                        </summary>
                                        <p>{faq.a}</p>
                                    </details>
                                ))}
                            </div>
                        </section>

                        <section className="calculator-help-banner" aria-labelledby="calculator-help-title">
                            <div className="calculator-help-icon"><Landmark size={24} aria-hidden="true" /></div>
                            <div>
                                <span>Beyond the estimate</span>
                                <h2 id="calculator-help-title">Need help turning numbers into a plan?</h2>
                                <p>FinTaxVers can help you discuss the practical next step for tax, business finance and compliance needs.</p>
                            </div>
                            <button type="button" onClick={() => navigate('/?message=I would like guidance after using your financial calculators.&type=Financial%20Planning')}>
                                Speak with FinTaxVers <ArrowRight size={16} aria-hidden="true" />
                            </button>
                        </section>
                    </>
                )}
            </main>
            <Footer />
        </div>
    );
}

export default Calculators;
