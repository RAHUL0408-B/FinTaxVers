import React, { useMemo, useState } from 'react';
import CalculatorLayout from './CalculatorLayout';

/**
 * New tax regime (Section 115BAC) — FY 2025-26 / AY 2026-27 (Union Budget 2025).
 * Slabs: 0-4L nil, 4-8L 5%, 8-12L 10%, 12-16L 15%, 16-20L 20%, 20-24L 25%, >24L 30%.
 * Rebate u/s 87A: no tax if taxable income <= ₹12,00,000 (marginal relief just above).
 * Standard deduction for salaried: ₹75,000. Health & education cess: 4%.
 * Surcharge: 10% (>₹50L), 15% (>₹1Cr), 25% (>₹2Cr; capped at 25% in new regime).
 */
const SLABS = [
    [400000, 0],
    [800000, 0.05],
    [1200000, 0.10],
    [1600000, 0.15],
    [2000000, 0.20],
    [2400000, 0.25],
    [Infinity, 0.30],
];

const slabTax = (taxable) => {
    let tax = 0;
    let lower = 0;
    for (const [upper, rate] of SLABS) {
        if (taxable > lower) tax += (Math.min(taxable, upper) - lower) * rate;
        lower = upper;
    }
    return tax;
};

const surchargeRate = (taxable) => {
    if (taxable > 20000000) return 0.25;
    if (taxable > 10000000) return 0.15;
    if (taxable > 5000000) return 0.10;
    return 0;
};

export const computeNewRegimeTax = (grossIncome, salaried = true) => {
    const taxable = Math.max(0, grossIncome - (salaried ? 75000 : 0));
    let tax = slabTax(taxable);

    if (taxable <= 1200000) {
        tax = 0; // Section 87A rebate
    } else if (taxable <= 1275000) {
        tax = Math.min(tax, taxable - 1200000); // marginal relief
    }

    const surcharge = tax * surchargeRate(taxable);
    const cess = (tax + surcharge) * 0.04;
    return { taxable, tax, surcharge, cess, total: tax + surcharge + cess };
};

const fmt = (n) => `₹ ${Math.round(n).toLocaleString('en-IN')}`;

const IncomeTaxCalculator = () => {
    const [income, setIncome] = useState(1200000);
    const [salaried, setSalaried] = useState(true);
    const result = useMemo(() => computeNewRegimeTax(income, salaried), [income, salaried]);

    return (
        <CalculatorLayout
            title="Income Tax Calculator (New Regime FY 2025-26)"
            result={
                <>
                    <h3>Estimated Annual Tax</h3>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '20px 0' }}>{fmt(result.total)}</div>
                    <p style={{ fontSize: '0.9rem' }}>
                        Taxable income {fmt(result.taxable)} · Tax {fmt(result.tax)}
                        {result.surcharge > 0 ? ` · Surcharge ${fmt(result.surcharge)}` : ''} · Cess (4%) {fmt(result.cess)}
                    </p>
                </>
            }
        >
            <div className="form-group">
                <label>Annual Gross Income (₹)</label>
                <input type="range" min="300000" max="5000000" step="10000" value={income} onChange={(e) => setIncome(Number(e.target.value))} />
                <input type="number" value={income} onChange={(e) => setIncome(Number(e.target.value))} />
            </div>
            <div className="form-group">
                <label style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input type="checkbox" checked={salaried} onChange={(e) => setSalaried(e.target.checked)} />
                    Salaried / pensioner (₹75,000 standard deduction)
                </label>
            </div>
            <div className="alert-info" style={{ background: '#e3f2fd', padding: '10px', borderRadius: '5px', fontSize: '0.9rem', color: '#0d47a1' }}>
                New regime slabs for FY 2025-26 (AY 2026-27): up to ₹4L nil · ₹4–8L 5% · ₹8–12L 10% · ₹12–16L 15% · ₹16–20L 20% · ₹20–24L 25% · above ₹24L 30%.
                Rebate under Section 87A makes tax nil up to ₹12L taxable income. Estimate only — it ignores capital gains at special rates and other deductions.
            </div>
        </CalculatorLayout>
    );
};

export default IncomeTaxCalculator;
