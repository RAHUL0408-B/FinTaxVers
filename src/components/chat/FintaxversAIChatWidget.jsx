import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Phone, RefreshCw, ExternalLink } from 'lucide-react';
import logo from '../../assets/fintaxverslogo.png';
import './ChatWidget.css';

export default function FintaxversAIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [handoffToken, setHandoffToken] = useState(null);
  
  // Lead form state
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadService, setLeadService] = useState('Income Tax Filing');
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const messagesEndRef = useRef(null);

  const suggestedPrompts = [
    'How do I file ITR?',
    'What are GST registration steps?',
    'How to register a Pvt Ltd company?',
    'Do you assist with Business Loans?'
  ];

  // Initialize conversation and load state from localStorage
  useEffect(() => {
    const savedId = localStorage.getItem('fintax_chat_cid');
    if (savedId) {
      setConversationId(savedId);
    }

    const savedMessages = localStorage.getItem('fintax_chat_history');
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        setMessages(getDefaultGreeting());
      }
    } else {
      setMessages(getDefaultGreeting());
    }
  }, []);

  // Save conversation state
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('fintax_chat_history', JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    if (conversationId) {
      localStorage.setItem('fintax_chat_cid', conversationId);
    }
  }, [conversationId]);

  // Auto scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  function getDefaultGreeting() {
    return [
      {
        id: 'msg_welcome',
        role: 'assistant',
        content: 'Hello! 👋 Welcome to FinTaxVers. I am your AI Tax & Compliance Assistant. How can I help you today with GST, ITR, Company Registration, or Business Loans?',
        timestamp: new Date().toISOString()
      }
    ];
  }

  const handleSend = async (textToSend) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading) return;

    setInputMessage('');

    const userMsg = {
      id: 'usr_' + Date.now(),
      role: 'user',
      content: query,
      timestamp: new Date().toISOString()
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          conversationId: conversationId || undefined,
          pageContext: window.location.pathname
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.conversationId) {
        setConversationId(data.conversationId);
      }

      const botMsg = {
        id: 'bot_' + Date.now(),
        role: 'assistant',
        content: data.reply || "I'm having trouble retrieving details right now. Please connect with our team directly.",
        citations: data.citations || [],
        timestamp: new Date().toISOString()
      };

      setMessages((prev) => [...prev, botMsg]);

      if (data.intent === 'HUMAN_HANDOFF' || data.handoffSuggested) {
        setShowLeadForm(true);
      }
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackMsg = {
        id: 'bot_err_' + Date.now(),
        role: 'assistant',
        content: "I apologize, but I'm having trouble reaching our AI engine right now. You can chat with our expert team immediately on WhatsApp or submit a callback request!",
        timestamp: new Date().toISOString()
      };
      setMessages((prev) => [...prev, fallbackMsg]);
      setShowLeadForm(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (!leadPhone.trim() || !leadName.trim()) return;

    try {
      const response = await fetch('/api/chat/handoff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId,
          name: leadName,
          phone: leadPhone,
          serviceNeeded: leadService
        })
      });

      const data = await response.json();
      if (data.handoffToken) {
        setHandoffToken(data.handoffToken);
      }

      setLeadSubmitted(true);
      setMessages((prev) => [
        ...prev,
        {
          id: 'bot_lead_' + Date.now(),
          role: 'assistant',
          content: `Thank you, ${leadName}! Our Senior Tax Specialist has been notified and will call you at ${leadPhone} shortly.`,
          timestamp: new Date().toISOString()
        }
      ]);
    } catch (err) {
      console.error('Error submitting handoff:', err);
      setLeadSubmitted(true);
    }
  };

  const clearChat = () => {
    localStorage.removeItem('fintax_chat_history');
    localStorage.removeItem('fintax_chat_cid');
    setConversationId(null);
    setMessages(getDefaultGreeting());
    setShowLeadForm(false);
    setLeadSubmitted(false);
    setHandoffToken(null);
  };

  const getWhatsAppHandoffUrl = () => {
    const base = 'https://wa.me/918928895195';
    let text = `Hello FinTaxVers, I was speaking with your AI assistant.`;
    if (handoffToken) {
      text += ` [Reference Token: ${handoffToken}]`;
    }
    return `${base}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div>
      {/* Floating Trigger Button with FinTaxVers Logo */}
      {!isOpen && (
        <button
          className="ftv-chat-trigger"
          onClick={() => setIsOpen(true)}
          aria-label="Open FinTaxVers AI Assistant"
          title="Chat with FinTaxVers AI"
        >
          <img src={logo} alt="FinTaxVers AI" className="ftv-chat-trigger-logo" />
          <span className="ftv-chat-trigger-badge">AI</span>
        </button>
      )}

      {/* Main Chat Panel */}
      {isOpen && (
        <div className="ftv-chat-panel">
          {/* Header with Logo Avatar */}
          <div className="ftv-chat-header">
            <div className="ftv-chat-avatar">
              <img src={logo} alt="FinTaxVers Logo" className="ftv-chat-avatar-img" />
            </div>
            <div className="ftv-chat-header-info">
              <h4>FinTaxVers AI</h4>
              <span>Online • Tax & Finance Assistant</span>
            </div>
            <div className="ftv-chat-header-actions">
              <button onClick={clearChat} title="Reset Chat" className="ftv-chat-icon-btn">
                <RefreshCw size={15} />
              </button>
              <button onClick={() => setIsOpen(false)} title="Close Chat" className="ftv-chat-icon-btn">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Quick Prompts */}
          {messages.length <= 1 && (
            <div className="ftv-suggestions">
              {suggestedPrompts.map((p, idx) => (
                <button key={idx} onClick={() => handleSend(p)} className="ftv-suggestion-btn">
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* Messages Body */}
          <div className="ftv-chat-messages">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`ftv-msg ${m.role === 'user' ? 'ftv-msg-user' : 'ftv-msg-ai'}`}
              >
                <div className="ftv-bubble">
                  {m.content}
                  {m.citations && m.citations.length > 0 && (
                    <div className="ftv-citations">
                      <span>Source: </span>
                      {m.citations.map((c, i) => (
                        <span key={i} className="ftv-citation-tag">
                          {c.title}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="ftv-msg-time">
                  {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="ftv-msg ftv-msg-ai">
                <div className="ftv-typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            {/* In-chat Lead Form / Expert Handoff */}
            {showLeadForm && !leadSubmitted && (
              <div className="ftv-lead-card">
                <div className="ftv-lead-header">
                  <Phone size={16} />
                  <span>Connect with a CA / Tax Consultant</span>
                </div>
                <form onSubmit={handleLeadSubmit} className="ftv-lead-form">
                  <input
                    type="text"
                    placeholder="Your Full Name"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    required
                  />
                  <input
                    type="tel"
                    placeholder="WhatsApp / Phone Number"
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    required
                  />
                  <select value={leadService} onChange={(e) => setLeadService(e.target.value)}>
                    <option value="Income Tax Filing">Income Tax Return (ITR)</option>
                    <option value="GST Services">GST Filing / Audit</option>
                    <option value="Company Registration">Pvt Ltd / LLP Registration</option>
                    <option value="Business Loan / CMA">Business Loan & CMA Data</option>
                    <option value="Govt Subsidy">Govt Subsidy Schemes</option>
                  </select>
                  <button type="submit" className="ftv-lead-btn">
                    Request Fast Callback
                  </button>
                </form>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick WhatsApp Handoff Bar */}
          <div className="ftv-chat-whatsapp-bar">
            <a
              href={getWhatsAppHandoffUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={13} />
              <span>Talk to Specialist on WhatsApp</span>
            </a>
          </div>

          {/* Input Box */}
          <div className="ftv-chat-input-row">
            <input
              type="text"
              placeholder="Ask about taxes, GST, loans, ROC..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              disabled={isLoading}
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputMessage.trim() || isLoading}
              className="ftv-chat-send-btn"
              aria-label="Send"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
