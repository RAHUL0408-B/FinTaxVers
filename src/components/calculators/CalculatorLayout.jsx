import React from 'react';

const CalculatorLayout = ({ title, children, result }) => {
    const requestAdvice = () => {
        const message = `I used the ${title} on FinTaxVers and would like guidance on my next step.`;
        window.location.href = `/?message=${encodeURIComponent(message)}&type=${encodeURIComponent('Financial Planning')}`;
    };

    return (
        <section className="calculator-workspace" aria-label={`${title} workspace`}>
            <div className="calc-inputs">
                <h3>{title}</h3>
                {children}
            </div>
            <div className="calc-results" aria-live="polite">
                <div className="calc-result-eyebrow">Your estimate</div>
                {result}
                <button className="calc-advice-button" type="button" onClick={requestAdvice}>
                    Discuss this estimate
                </button>
            </div>
        </section>
    );
};

export default CalculatorLayout;
