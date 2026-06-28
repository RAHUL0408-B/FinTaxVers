import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CalculatorLayout from '../../components/calculators/CalculatorLayout';
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


const calculatorsList = [
    { id: 'sip', title: 'SIP CALCULATOR', desc: 'Find out the how much wealth can you generate by doing a particular amount of SIP.', icon: '📊' },
    { id: 'step-up-sip', title: 'SIP STEP UP CALCULATOR', desc: 'Find out the how much wealth can you generate by doing a particular amount of SIP and increseing it every year.', icon: '📈' },
    { id: 'mf', title: 'MF CALCULATOR', desc: 'Find out the value of the lumpsum investments.', icon: '💰' },
    { id: 'cagr', title: 'CAGR CALCULATOR', desc: 'Find out the CAGR return required to reach a target value.', icon: '📉' },
    { id: 'emi', title: 'EMI CALCULATOR', desc: 'Calculate your monthly EMI, along with principal and interest breakup.', icon: '🏠' },
    { id: 'home-affordability', title: 'HOME AFFORDABILITY CALCULATOR', desc: 'Find out the worth of house you can buy given your capacity to pay.', icon: '🏘️' },
    { id: 'emi-sip', title: 'EMI & SIP CALCULATOR', desc: 'Find out the percentage of a loan that can be obtained through SIP investments.', icon: '🔄' },
    { id: 'income-tax', title: 'INCOME TAX CALCULATOR', desc: 'Calculate your payable income tax based on the latest tax regime.', icon: '🧾' },
    { id: 'hra', title: 'HRA CALCULATOR', desc: 'Find out how much HRA will you be exempt out of your total income.', icon: '🏢' },
    { id: 'nps', title: 'NPS CALCULATOR', desc: 'National Pension Scheme Calculator.', icon: '👴' },
    { id: 'swp', title: 'SWP CALCULATOR', desc: 'Find out the fund value at the end of withdrawal period.', icon: '💸' },
    { id: 'emergency-fund', title: 'EMERGENCY FUND CALCULATOR', desc: 'Find out the Emergency Fund required by you.', icon: '🚨' },
    { id: 'goal', title: 'GOAL CALCULATOR', desc: 'Find out how much money you need to invest to achieve your goal.', icon: '🎯' },
    { id: 'education', title: 'CHILDREN EDUCATION CALCULATOR', desc: 'Find out how much money you need for your children higher education.', icon: '🎓' },
    { id: 'retirement', title: 'RETIREMENT CALCULATOR', desc: 'Find out how much will you require for retirement and monthly investment required.', icon: '🏖️' },
    { id: 'wealth-target', title: 'WEALTH TARGET CALCULATOR', desc: 'Calculate the expected wealth targets in next years.', icon: '💎' },
    { id: 'networth', title: 'NETWORTH CALCULATOR', desc: 'Find Out Your Networth and Asset Allocation.', icon: '💼' },
    { id: 'cost-of-delay', title: 'COST OF DELAY CALCULATOR', desc: 'Find out how it impacts you if your investment is delayed.', icon: '⏳' },
    { id: 'purchasing-power', title: 'PURCHASING POWER CALCULATOR', desc: 'Find out the worth of your investment in future in real terms.', icon: '🛒' },
];

const calcSEO = {
    'sip': { title: 'SIP Calculator India – Calculate SIP Returns', desc: 'Free SIP Calculator India – Calculate your Systematic Investment Plan returns. Find out how much wealth you can build with monthly SIP investing.' },
    'emi': { title: 'EMI Calculator India – Calculate Loan EMI', desc: 'Free EMI Calculator India – Calculate your monthly EMI, total interest, and repayment schedule for home loan, car loan, or personal loan.' },
    'income-tax': { title: 'Income Tax Calculator India 2025 – New & Old Regime', desc: 'Free Income Tax Calculator India 2025. Calculate your payable income tax under new and old tax regime. Expert income tax filing in Nagpur by FinTaxVers.' },
    'hra': { title: 'HRA Calculator India – Calculate HRA Exemption', desc: 'Free HRA Calculator – Calculate your House Rent Allowance exemption amount for income tax purposes.' },
};

const calcFAQs = [
    { q: 'What is a SIP Calculator?', a: 'A SIP Calculator helps you estimate the wealth you can accumulate by investing a fixed amount every month in a mutual fund SIP at an expected rate of return.' },
    { q: 'How to calculate EMI for a home loan?', a: 'Use our EMI Calculator – enter the loan amount, interest rate, and tenure. The calculator will show your monthly EMI, total interest paid, and repayment schedule.' },
    { q: 'Which income tax regime is better for me?', a: 'Use our Income Tax Calculator to compare old vs new tax regime based on your income and deductions. Our experts in Nagpur can also advise you personally.' },
    { q: 'What is HRA exemption?', a: 'HRA (House Rent Allowance) exemption allows you to reduce your taxable income if you live in rented accommodation and receive HRA from your employer.' },
    { q: 'Are these calculators free to use?', a: 'Yes, all financial calculators at FinTaxVers are 100% free. No registration required.' },
    { q: 'Can I get expert financial advice in Nagpur?', a: 'Yes! FinTaxVers Consultancy Services in Nagpur provides expert financial planning, income tax filing, GST services, and business loan assistance. Call +91-8928895195 / +91-9011424236.' },
];

function Calculators() {
    const [selectedCalc, setSelectedCalc] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.calcId) {
            setSelectedCalc(location.state.calcId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            // Clear location state if we want "Back to list" to not reopen it on refresh
            // window.history.replaceState({}, document.title); 
        }
    }, [location.state]);




    const ActiveCalculator = () => {
        switch (selectedCalc) {
            case 'sip': return <SIPCalculator />;
            case 'step-up-sip': return <StepUpSIPCalculator />;
            case 'mf': return <MFCalculator />;
            case 'cagr': return <CAGRCalculator />;
            case 'emi': return <EMICalculator />;
            case 'home-affordability': return <HomeAffordabilityCalculator />;
            case 'emi-sip': return <EMISIPCalculator />;
            case 'income-tax': return <IncomeTaxCalculator />;
            case 'hra': return <HRACalculator />;
            case 'nps': return <NPSCalculator />;
            case 'swp': return <SWPCalculator />;
            case 'emergency-fund': return <EmergencyFundCalculator />;
            case 'goal': return <GoalCalculator />;
            case 'education': return <EducationCalculator />;
            case 'retirement': return <RetirementCalculator />;
            case 'wealth-target': return <WealthTargetCalculator />;
            case 'networth': return <NetworthCalculator />;
            case 'cost-of-delay': return <CostOfDelayCalculator />;
            case 'purchasing-power': return <PurchasingPowerCalculator />;
            default: return <div>Calculator not found</div>;
        }
    };

    const activeSEO = selectedCalc ? calcSEO[selectedCalc] : null;
    const calcSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: calcFAQs.map(f => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a }
        }))
    };

    return (
        <div className="calculators-page" style={{ paddingTop: '140px', minHeight: '100vh', background: '#f8fafc', color: '#1e293b' }}>
            <SEOHead
                title={activeSEO?.title || 'Free Financial Calculators India – GST, EMI, SIP, Income Tax'}
                description={activeSEO?.desc || 'Free online financial calculators for India – SIP Calculator, EMI Calculator, Income Tax Calculator, HRA Calculator, NPS Calculator and more. Plan your financial future with FinTaxVers Nagpur.'}
                keywords="SIP calculator India, EMI calculator India, income tax calculator 2025, HRA calculator, GST calculator India, financial calculators free, SIP calculator Nagpur, EMI calculator Nagpur"
                canonical="https://fintaxvers.com/calculators"
                schema={!selectedCalc ? calcSchema : undefined}
            />
            <Navbar />


            <div className="container" style={{ marginTop: '40px' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <span style={{ color: '#16A34A', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.85rem' }}>Free Tools</span>
                    <h1 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.4rem)', color: '#1e293b', margin: '10px 0 12px' }}>Free Financial Calculators India</h1>
                    <p style={{ color: '#64748b', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>Plan your financial future with our comprehensive suite of free calculators. Calculate SIP returns, EMI, income tax, HRA exemption, NPS corpus, and more — all in one place.</p>
                </div>

                {selectedCalc ? (
                    <div className="calculator-view animate-fade-up">
                        <button className="btn btn-primary" style={{ marginBottom: '30px' }} onClick={() => setSelectedCalc(null)}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m15 18-6-6 6-6" /></svg>
                            Back to Calculators
                        </button>
                        <ActiveCalculator />
                        <div style={{ marginTop: '30px', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '12px', padding: '20px' }}>
                            <p style={{ color: '#0B1F3A', fontSize: '0.9rem', margin: 0 }}>💡 <strong>Need expert advice?</strong> Call <a href="tel:+918928895195" style={{ color: '#16A34A', fontWeight: 600 }}>+91-8928895195</a> / <a href="tel:+919011424236" style={{ color: '#16A34A', fontWeight: 600 }}>+91-9011424236</a> to speak with Yugant Rahele – trusted financial consultant in Nagpur.</p>
                        </div>
                    </div>
                ) : (
                    <div className="services-grid" style={{ marginTop: '20px' }}>
                        {calculatorsList.map((calc, index) => (
                            <div
                                key={index}
                                className="service-card animate-fade-up"
                                style={{ animationDelay: `${index * 0.05}s`, cursor: 'pointer' }}
                                onClick={() => setSelectedCalc(calc.id)}
                            >
                                <div className="service-icon">{calc.icon}</div>
                                <h3 style={{ color: 'var(--primary)', fontSize: '1.2rem', marginBottom: '10px' }}>{calc.title}</h3>
                                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{calc.desc}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* FAQ Section */}
                {!selectedCalc && (
                    <div style={{ marginTop: '60px' }}>
                        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                            <h2 style={{ color: '#1e293b', fontSize: '1.6rem' }}>Frequently Asked Questions</h2>
                            <p style={{ color: '#64748b' }}>Everything you need to know about our financial calculators</p>
                        </div>
                        <div style={{ maxWidth: '750px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {calcFAQs.map((f, i) => (
                                <div key={i} style={{ background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0' }}>
                                    <p style={{ fontWeight: 600, color: '#0B1F3A', marginBottom: '8px' }}>Q: {f.q}</p>
                                    <p style={{ color: '#64748b', margin: 0 }}>A: {f.a}</p>
                                </div>
                            ))}
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '40px', padding: '30px', background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                            <h3 style={{ color: '#0B1F3A', marginBottom: '8px' }}>Need Expert Financial Advice in Nagpur?</h3>
                            <p style={{ color: '#64748b', marginBottom: '16px' }}>Beyond calculators – get personalized guidance from Yugant Rahele</p>
                            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <a href="tel:+918928895195" style={{ background: '#0B1F3A', color: 'white', padding: '10px 22px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>📞 Call: 8928895195</a>
                                <a href="tel:+919011424236" style={{ background: '#0B1F3A', color: 'white', padding: '10px 22px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>📞 Call: 9011424236</a>
                                <a href="/services/gst-returns-solutions" style={{ background: '#16A34A', color: 'white', padding: '10px 22px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>GST Services</a>
                                <a href="/services/income-tax-planning" style={{ background: '#0284C7', color: 'white', padding: '10px 22px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>Income Tax Filing</a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Calculators;
