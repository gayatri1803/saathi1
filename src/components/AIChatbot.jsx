import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Minus, Volume2, Mic, Send, Globe, ArrowRight } from 'lucide-react';
import './AIChatbot.css';

const AIChatbot = ({ theme, currentPage, onNavigate }) => {
    const isSimplified = theme === 'simplified';

    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [inputText, setInputText] = useState('');

    const chatEndRef = useRef(null);

    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'ai',
            text: "Hello! I can help you find schemes, check eligibility, or guide you through applying. What do you need help with?"
        }
    ]);

    const quickReplies = [
        "Find schemes for me",
        "Check my eligibility",
        "Help me apply",
        "What documents do I need?"
    ];

    const simplifiedReplies = [
        "Find Schemes",
        "Am I Eligible?",
        "Help me Apply"
    ];

    // Auto-scroll to bottom of chat
    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isTyping, isOpen]);

    const handleReadAloud = (text) => {
        alert(`Reading aloud: ${text}`);
    };

    const handleSend = (text) => {
        if (!text.trim()) return;

        // Add user message
        const newMsg = { id: Date.now(), sender: 'user', text };
        setMessages(prev => [...prev, newMsg]);
        setInputText('');

        // Trigger AI typing
        setIsTyping(true);

        // Mock AI Response after a delay
        setTimeout(() => {
            setIsTyping(false);

            let aiResponseText = "I can certainly help with that. Could you provide a bit more detail?";
            let isFormAction = false;
            let isSimplificationAction = false;

            const lowerText = text.toLowerCase();

            // Context checks
            if (lowerText.includes('apply') || lowerText.includes('application')) {
                aiResponseText = "Would you like me to guide you step-by-step through the application process for this scheme?";
                isFormAction = true;
            }
            else if (lowerText.includes('confused') || lowerText.includes('hard') || lowerText.includes('difficult')) {
                aiResponseText = "It seems you might find the current layout a bit crowded. Would you like me to activate Simplified Mode for you?";
                isSimplificationAction = true;
            }
            else if (currentPage === 'scheme_detail') {
                aiResponseText = "I see you are viewing a specific scheme. Do you want to know what exact documents you need for it, or are you ready to apply?";
            }

            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                sender: 'ai',
                text: aiResponseText,
                isFormAction,
                isSimplificationAction
            }]);

        }, 1500);
    };

    const toggleRecording = () => {
        if (isRecording) {
            setIsRecording(false);
            handleSend("Here is my recorded voice question"); // Mock transcription
        } else {
            setIsRecording(true);
            // Auto stop after 3 seconds for mock
            setTimeout(() => {
                if (isRecording) {
                    setIsRecording(false);
                    handleSend("How do I apply for the education scheme?");
                }
            }, 3000);
        }
    };

    // Render closed FAB state
    if (!isOpen) {
        return (
            <div className="chatbot-fab-container">
                <button
                    className="chatbot-fab"
                    onClick={() => { setIsOpen(true); setIsMinimized(false); }}
                    aria-label="Open Saathi AI Assistant"
                >
                    <MessageSquare size={32} />
                </button>
            </div>
        );
    }

    // Render open state (Slide Panel)
    return (
        <div className={`chatbot-panel ${isMinimized ? 'minimized' : ''} fade-in-up`}>
            {/* Invisible Screen Reader Announcer */}
            <div className="sr-only" aria-live="polite">
                {messages.length > 1 ? `New message received from Saathi Assistant: ${messages[messages.length - 1].text}` : 'Chatbot opened'}
            </div>

            {/* Header */}
            <div className="cb-header">
                <div className="cb-header-title">
                    <MessageSquare size={20} />
                    <h3>Saathi AI Guide</h3>
                </div>

                <div className="cb-lang-indicator">
                    <Globe size={14} /> EN
                </div>

                <div className="cb-header-actions">
                    <button className="icon-btn" onClick={() => setIsMinimized(!isMinimized)} aria-label={isMinimized ? 'Expand chatbot' : 'Minimize chatbot'}>
                        <Minus size={20} />
                    </button>
                    <button className="icon-btn" onClick={() => setIsOpen(false)} aria-label="Close chatbot">
                        <X size={20} />
                    </button>
                </div>
            </div>

            {/* Internal Body (hidden if minimized) */}
            {!isMinimized && (
                <>
                    <div className="cb-body">

                        {/* Messages */}
                        <div className="cb-messages">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`msg-wrapper ${msg.sender}`}>
                                    <div className={`cb-bubble ${msg.sender}`}>
                                        {msg.text}
                                        {msg.sender === 'ai' && (
                                            <button className="tts-inline-btn" onClick={() => handleReadAloud(msg.text)} aria-label="Read AI message aloud">
                                                <Volume2 size={16} />
                                            </button>
                                        )}
                                    </div>

                                    {/* Contextual Action Buttons in Chat */}
                                    {msg.isFormAction && msg.sender === 'ai' && (
                                        <button
                                            className="cb-action-btn"
                                            onClick={() => onNavigate('apply_guide')}
                                        >
                                            Start application guide <ArrowRight size={16} />
                                        </button>
                                    )}
                                    {msg.isSimplificationAction && msg.sender === 'ai' && (
                                        <button className="cb-action-btn highlight">
                                            Switch to Simplified Mode
                                        </button>
                                    )}
                                </div>
                            ))}

                            {isTyping && (
                                <div className="msg-wrapper ai">
                                    <div className="cb-bubble ai typing">
                                        <span className="dot"></span>
                                        <span className="dot"></span>
                                        <span className="dot"></span>
                                    </div>
                                </div>
                            )}

                            <div ref={chatEndRef} />
                        </div>

                        {/* Quick Replies (Only show if at root state or if we want them persistent) */}
                        {messages.length < 3 && !isTyping && (
                            <div className="cb-quick-replies horizontal-scroll">
                                {(isSimplified ? simplifiedReplies : quickReplies).map((reply, idx) => (
                                    <button
                                        key={idx}
                                        className={`cb-chip ${isSimplified ? 'giant-chip' : ''}`}
                                        onClick={() => handleSend(reply)}
                                    >
                                        {reply}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Input Area (Hidden entirely in Simplified Mode) */}
                    {!isSimplified ? (
                        <div className="cb-footer">
                            <input
                                type="text"
                                placeholder="Type your question..."
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend(inputText)}
                                aria-label="Type message"
                            />
                            {inputText.trim() ? (
                                <button className="send-btn" onClick={() => handleSend(inputText)} aria-label="Send message">
                                    <Send size={20} />
                                </button>
                            ) : (
                                <button
                                    className={`mic-btn ${isRecording ? 'recording pulse' : ''}`}
                                    onClick={toggleRecording}
                                    aria-label="Hold to dictate message"
                                >
                                    <Mic size={20} />
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="cb-footer-simplified">
                            <p>Voice Input Only in Simplified Mode</p>
                            <button
                                className={`mic-btn-giant ${isRecording ? 'recording pulse' : ''}`}
                                onClick={toggleRecording}
                                aria-label="Tap to speak"
                            >
                                <Mic size={36} />
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AIChatbot;
