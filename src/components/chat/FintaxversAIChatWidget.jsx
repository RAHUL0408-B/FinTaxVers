import React, { useState, useEffect, useRef } from 'react';
import { X, Send, RefreshCw } from 'lucide-react';
import logo from '../../assets/fintaxverslogo.png';
import './ChatWidget.css';

export default function FintaxversAIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);

  const messagesEndRef = useRef(null);

  const suggestedPrompts = [
    'How do I file ITR?',
    'What are GST registration steps?',
    'How to register a Pvt Ltd company?',
    'What is PMEGP subsidy scheme?'
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
        content: 'Hello! 👋 Welcome to **FinTaxVers AI**. I am your Tax & Compliance Assistant.\n\nAsk me anything about **GST**, **Income Tax (ITR)**, **Company Registration**, **Business Loans**, or **Government Subsidies**. I am here to help!',
        timestamp: new Date().toISOString()
      }
    ];
  }

  const API_BASE = import.meta.env.VITE_API_URL || (
    typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
      ? ''
      : 'https://fintaxvers.onrender.com'
  );

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
      const response = await fetch(`${API_BASE}/api/chat`, {
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

      const replyContent = data.reply || data.message || 'I could not retrieve an answer right now. Please try rephrasing your question.';
      const citationsList = data.citations || data.sources || [];

      const botMsg = {
        id: 'bot_' + Date.now(),
        role: 'assistant',
        content: replyContent,
        citations: citationsList,
        timestamp: new Date().toISOString()
      };

      setMessages((prev) => [...prev, botMsg]);

    } catch (err) {
      console.error('Chat error:', err);
      const fallbackMsg = {
        id: 'bot_err_' + Date.now(),
        role: 'assistant',
        content: 'I am having a temporary connection issue. Please try your question again in a moment.',
        timestamp: new Date().toISOString()
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    localStorage.removeItem('fintax_chat_history');
    localStorage.removeItem('fintax_chat_cid');
    setConversationId(null);
    setMessages(getDefaultGreeting());
  };

  // Render markdown: bold (**text**), bullet points (- or *), line breaks
  const renderMessageContent = (text) => {
    if (!text) return null;
    const lines = text.split('\n');
    const result = [];

    lines.forEach((line, lIdx) => {
      const trimmed = line.trimStart();
      const isBullet = trimmed.startsWith('- ') || trimmed.startsWith('* ');
      const content = isBullet ? trimmed.slice(2) : line;

      // Bold replacer: **text** -> <strong>text</strong>
      const parts = content.split(/(\*\*.*?\*\*)/g);
      const formattedLine = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={pIdx}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      if (isBullet) {
        result.push(
          <div key={lIdx} className="ftv-bullet-line">
            <span className="ftv-bullet-dot">•</span>
            <span>{formattedLine}</span>
          </div>
        );
      } else if (line.trim() === '') {
        result.push(<div key={lIdx} className="ftv-line-gap" />);
      } else {
        result.push(
          <React.Fragment key={lIdx}>
            {formattedLine}
            {lIdx < lines.length - 1 && <br />}
          </React.Fragment>
        );
      }
    });

    return result;
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
              <span>Online • Tax &amp; Finance Assistant</span>
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
                {m.role === 'assistant' && (
                  <div className="ftv-msg-avatar">
                    <img src={logo} alt="AI" className="ftv-msg-avatar-img" />
                  </div>
                )}
                <div>
                  <div className="ftv-bubble">
                    {renderMessageContent(m.content)}
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
              </div>
            ))}

            {isLoading && (
              <div className="ftv-msg ftv-msg-ai">
                <div className="ftv-msg-avatar">
                  <img src={logo} alt="AI" className="ftv-msg-avatar-img" />
                </div>
                <div className="ftv-typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
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
