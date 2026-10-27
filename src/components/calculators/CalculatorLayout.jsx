import React, { useEffect, useRef } from 'react';

const amountPattern = /₹\s*([\d,]+(?:\.\d+)?)/g;
const amountFormatter = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 });

const animateCurrencyText = (node, progress) => {
    const source = node.source;
    if (progress >= 1) {
        node.element.nodeValue = source;
        return;
    }

    node.element.nodeValue = source.replace(amountPattern, (fullValue, rawValue) => {
        const target = Number(rawValue.replaceAll(',', ''));
        if (!Number.isFinite(target)) return fullValue;
        return `₹ ${amountFormatter.format(target * progress)}`;
    });
};

const CalculatorLayout = ({ title, children, result }) => {
    const resultRef = useRef(null);
    const meterRef = useRef(null);

    useEffect(() => {
        const resultElement = resultRef.current;
        const meterElement = meterRef.current;
        const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

        if (!resultElement || reduceMotion) return undefined;

        const walker = document.createTreeWalker(resultElement, NodeFilter.SHOW_TEXT);
        const currencyNodes = [];
        let currentNode = walker.nextNode();

        while (currentNode) {
            amountPattern.lastIndex = 0;
            if (amountPattern.test(currentNode.nodeValue || '')) {
                currencyNodes.push({ element: currentNode, source: currentNode.nodeValue });
            }
            currentNode = walker.nextNode();
        }

        if (currencyNodes.length === 0) return undefined;

        meterElement?.classList.remove('is-running');
        void meterElement?.offsetWidth;
        meterElement?.classList.add('is-running');

        const duration = 720;
        let animationFrame;
        const startedAt = performance.now();
        const renderFrame = (now) => {
            const rawProgress = Math.min((now - startedAt) / duration, 1);
            const easedProgress = 1 - Math.pow(1 - rawProgress, 3);
            currencyNodes.forEach((node) => animateCurrencyText(node, easedProgress));

            if (rawProgress < 1) {
                animationFrame = requestAnimationFrame(renderFrame);
            }
        };

        animationFrame = requestAnimationFrame(renderFrame);
        return () => cancelAnimationFrame(animationFrame);
    }, [result]);

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
            <div className="calc-results">
                <div className="calc-result-eyebrow">Your estimate</div>
                <div className="calc-result-content" ref={resultRef} aria-live="polite">{result}</div>
                <div className="calc-progress-meta" aria-hidden="true"><span>Calculation progress</span><span>Live estimate</span></div>
                <div className="calc-progress-meter" ref={meterRef} aria-hidden="true"><span /></div>
                <button className="calc-advice-button" type="button" onClick={requestAdvice}>
                    Discuss this estimate
                </button>
            </div>
        </section>
    );
};

export default CalculatorLayout;
