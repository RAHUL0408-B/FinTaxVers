import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
        <section className="faq-section-component" aria-labelledby="faq-section-heading">
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
                            <motion.span
                                animate={{ rotate: openIndex === i ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="faq-chevron"
                            >
                                <ChevronDown size={18} />
                            </motion.span>
                        </button>
                        <AnimatePresence initial={false}>
                            {openIndex === i && (
                                <motion.div
                                    id={`faq-answer-${i}`}
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.22, ease: 'easeInOut' }}
                                    style={{ overflow: 'hidden' }}
                                    itemScope
                                    itemProp="acceptedAnswer"
                                    itemType="https://schema.org/Answer"
                                >
                                    <div className="faq-answer-body" itemProp="text">
                                        {faq.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQSection;