import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Reusable FAQ Section component.
 * Renders a list of Q&A items in an accessible accordion format.
 * Accepts pre-generated faqSchema for JSON-LD injection by SEOHead.
 *
 * @param {{ faqs: Array<{question: string, answer: string}>, title?: string }} props
 */
const FAQSection = ({ faqs = [], title = 'Frequently Asked Questions' }) => {
    const [openIndex, setOpenIndex] = useState(null);

    if (!faqs || faqs.length === 0) return null;

    const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

    return (
        <section
            className="faq-section-component"
            aria-labelledby={title ? 'faq-section-heading' : undefined}
            aria-label={title ? undefined : 'Frequently asked questions'}
        >
            {title && (
                <h2 id="faq-section-heading" className="faq-section-title">
                    {title}
                </h2>
            )}
            <div className="faq-list" itemScope itemType="https://schema.org/FAQPage">
                {faqs.map((faq, i) => (
                    <div
                        key={i}
                        className="faq-item-comp"
                        itemScope
                        itemProp="mainEntity"
                        itemType="https://schema.org/Question"
                    >
                        <button
                            className={`faq-question-btn${openIndex === i ? ' open' : ''}`}
                            onClick={() => toggle(i)}
                            aria-expanded={openIndex === i}
                            aria-controls={`faq-answer-${i}`}
                            itemProp="name"
                        >
                            <span>{faq.question}</span>
                            <span className="faq-chevron">
                                <ChevronDown size={18} />
                            </span>
                        </button>
                        {/* Keep answers in the DOM so the expandable FAQ and its structured data agree. */}
                        <div
                            id={`faq-answer-${i}`}
                            className={`faq-answer-panel${openIndex === i ? ' open' : ''}`}
                            aria-hidden={openIndex !== i}
                            itemScope
                            itemProp="acceptedAnswer"
                            itemType="https://schema.org/Answer"
                        >
                            <div className="faq-answer-panel-inner">
                                <div className="faq-answer-body" itemProp="text">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQSection;
