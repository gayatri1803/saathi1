import React, { useState, useEffect } from 'react';
import { ArrowLeft, Bookmark, Share2, Volume2, Video, MessageSquare, CheckCircle, XCircle, FileText, Upload, ExternalLink, PlayCircle, X } from 'lucide-react';
import './SchemeDetail.css';

const SchemeDetail = ({ theme, onBack, onNavigate }) => {
    const isSimplified = theme === 'simplified';
    const [activeTab, setActiveTab] = useState('overview');
    const [showISLModal, setShowISLModal] = useState(false);
    const [showChatPanel, setShowChatPanel] = useState(false);
    const [isCaregiver, setIsCaregiver] = useState(false);

    useEffect(() => {
        document.title = "Scheme Details — Saathi";
        setIsCaregiver(localStorage.getItem('saathi_is_caregiver') === 'true');
    }, []);

    const targetPossessive = isCaregiver ? "their" : "your";

    const handleReadAloud = (text) => {
        alert(`Read aloud: ${text}`);
    };

    return (
        <div className="scheme-detail-page fade-in">
            {/* Header */}
            <header className="sd-header">
                <button className="icon-btn" onClick={onBack} aria-label="Go back">
                    <ArrowLeft size={28} />
                </button>
                <div className="sd-header-actions">
                    <button className="icon-btn" aria-label="Share scheme"><Share2 size={24} /></button>
                    <button className="icon-btn" aria-label="Save scheme"><Bookmark size={24} /></button>
                </div>
            </header>

            <main id="main-content" role="main" className="sd-main">
                {/* Hero Section */}
                <section className="sd-hero">
                    <span className="sd-badge">Education • Central</span>
                    <h1 className="sd-title">Scholarship for Top Class Education</h1>

                    <div className="sd-match-banner" role="status">
                        <CheckCircle size={20} aria-hidden="true" />
                        <span>94% match for {targetPossessive} profile</span>
                    </div>

                    <div className="sd-benefit-card">
                        <p>You can get:</p>
                        <h2>Full Tuition Coverage + ₹36,000/year</h2>
                    </div>
                </section>

                {isSimplified ? (
                    /* Simplified Layout */
                    <section className="sd-simplified-view fade-in">
                        <button className="read-aloud-btn large" aria-label="Read scheme details aloud" onClick={() => handleReadAloud("Scholarship for Top Class Education provides full tuition and 36 thousand rupees per year. Click apply to proceed.")}>
                            <Volume2 size={32} />
                            <span>Read Aloud</span>
                        </button>
                        <div className="sd-simple-actions">
                            <button className="btn btn-primary btn-giant" onClick={() => onNavigate('apply_guide')}>Apply Now</button>
                            <button className="btn btn-outline btn-giant">Get Help (ISL)</button>
                        </div>
                    </section>
                ) : (
                    /* Standard Layout */
                    <>
                        {/* Tabs */}
                        <div className="sd-tabs-container">
                            <button className={`sd-tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')} aria-pressed={activeTab === 'overview'}>Overview</button>
                            <button className={`sd-tab ${activeTab === 'eligibility' ? 'active' : ''}`} onClick={() => setActiveTab('eligibility')} aria-pressed={activeTab === 'eligibility'}>Eligibility + Docs</button>
                            <button className={`sd-tab ${activeTab === 'apply' ? 'active' : ''}`} onClick={() => setActiveTab('apply')} aria-pressed={activeTab === 'apply'}>How to apply</button>
                        </div>

                        <div className="sd-tab-content fade-in">
                            {activeTab === 'overview' && (
                                <div className="tab-overview">
                                    <div className="content-block">
                                        <div className="block-header">
                                            <h3>What is this scheme?</h3>
                                            <button className="read-aloud-btn inline" onClick={() => handleReadAloud("This scheme provides financial assistance to students with disabilities to pursue diploma or degree courses.")} aria-label="Read what is this scheme aloud"><Volume2 size={20} /></button>
                                        </div>
                                        <p>This scheme provides financial assistance to students with disabilities to pursue advanced degree courses. It covers admission fees, tuition fees, and offers a monthly maintenance allowance.</p>
                                    </div>

                                    <div className="content-block">
                                        <div className="block-header">
                                            <h3>Who can apply?</h3>
                                            <button className="read-aloud-btn inline" onClick={() => handleReadAloud("Indian Citizens with more than 40 percent disability and family income below 6 Lakhs")} aria-label="Read who can apply aloud"><Volume2 size={20} /></button>
                                        </div>
                                        <ul>
                                            <li>Indian citizen with a valid UDID card.</li>
                                            <li>Disability percentage of 40% or higher.</li>
                                            <li>Annual family income below ₹6,000,000.</li>
                                        </ul>
                                    </div>

                                    <div className="deadline-banner">
                                        <strong>Deadline:</strong> 31st October 2026 (12 Days Left)
                                    </div>
                                </div>
                            )}

                            {activeTab === 'eligibility' && (
                                <div className="tab-eligibility">
                                    <div className="content-block">
                                        <h3>Your Eligibility Checklist</h3>
                                        <ul className="eligibility-list">
                                            <li className="qualify"><CheckCircle size={20} className="text-green" /> <span>Disability &gt; 40% (You have 100%)</span></li>
                                            <li className="qualify"><CheckCircle size={20} className="text-green" /> <span>Income &lt; ₹6L (You have ₹2.5L)</span></li>
                                            <li className="disqualify"><XCircle size={20} className="text-red" /> <span>Must be currently enrolled in college</span></li>
                                        </ul>
                                    </div>

                                    <div className="content-block mt-2">
                                        <h3>Documents Needed</h3>
                                        <ul className="document-list">
                                            <li className="doc-item uploaded">
                                                <FileText size={20} />
                                                <span className="doc-name">Aadhaar Card</span>
                                                <span className="doc-status">✅</span>
                                            </li>
                                            <li className="doc-item uploaded">
                                                <FileText size={20} />
                                                <span className="doc-name">Disability Certificate (UDID)</span>
                                                <span className="doc-status">✅</span>
                                            </li>
                                            <li className="doc-item pending">
                                                <FileText size={20} />
                                                <span className="doc-name">Income Proof</span>
                                                <span className="doc-status">⬜</span>
                                            </li>
                                        </ul>
                                        <button className="btn btn-outline full-width doc-upload-btn">
                                            <Upload size={20} /> Upload missing documents
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'apply' && (
                                <div className="tab-apply">
                                    <div className="step-list">
                                        <div className="step-item">
                                            <div className="step-number">1</div>
                                            <div className="step-content">
                                                <h4>Register on NSP Portal</h4>
                                                <p>Create an account on the National Scholarship Portal.</p>
                                            </div>
                                            <button className="read-aloud-btn circle" onClick={() => handleReadAloud("Step 1. Register on NSP Portal")} aria-label="Read step 1 aloud"><Volume2 size={20} /></button>
                                        </div>
                                        <div className="step-item">
                                            <div className="step-number">2</div>
                                            <div className="step-content">
                                                <h4>Fill Application & Upload Docs</h4>
                                                <p>Complete the main form and attach your Aadhaar and Income proofs.</p>
                                            </div>
                                            <button className="read-aloud-btn circle" onClick={() => handleReadAloud("Step 2. Fill Application and Upload Docs")} aria-label="Read step 2 aloud"><Volume2 size={20} /></button>
                                        </div>
                                        <div className="step-item">
                                            <div className="step-number">3</div>
                                            <div className="step-content">
                                                <h4>Institute Verification</h4>
                                                <p>Your college must verify your application before the deadline.</p>
                                            </div>
                                            <button className="read-aloud-btn circle" onClick={() => handleReadAloud("Step 3. Institute Verification")} aria-label="Read step 3 aloud"><Volume2 size={20} /></button>
                                        </div>
                                    </div>

                                    <div className="apply-actions">
                                        <button className="btn btn-primary full-width apply-btn" onClick={() => onNavigate('apply_guide')}>
                                            Apply Now <ExternalLink size={20} />
                                        </button>
                                        <button className="btn btn-outline full-width" onClick={() => onNavigate('apply_guide')}>
                                            Apply with Saathi's Guidance
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </main>

            {/* Floating Action Elements (ISL & AI) */}
            <div className="sd-floating-container left">
                <button className="fab-secondary-btn" onClick={() => setShowISLModal(true)} aria-label="View Sign Language Video Guide">
                    <Video size={28} />
                </button>
            </div>

            <div className="sd-floating-container right">
                <button className="fab-secondary-btn chatbot-btn" onClick={() => setShowChatPanel(true)} aria-label="Open AI Assistant Chat">
                    <MessageSquare size={28} />
                </button>
            </div>

            {/* ISL Video Modal */}
            {showISLModal && (
                <div className="sd-modal-overlay">
                    <div className="sd-modal" role="dialog" aria-modal="true" aria-labelledby="isl-modal-title">
                        <div className="sd-modal-header">
                            <h3 id="isl-modal-title">ISL Video Guide</h3>
                            <button className="icon-btn" autoFocus onClick={() => setShowISLModal(false)} aria-label="Close ISL Video"><X size={24} aria-hidden="true" /></button>
                        </div>
                        <div className="video-placeholder">
                            <PlayCircle size={64} style={{ opacity: 0.5 }} aria-hidden="true" />
                            <p>Indian Sign Language Video playing...</p>
                        </div>
                    </div>
                </div>
            )}

            {/* AI Chatbot Panel Mock (Simplified) */}
            {showChatPanel && (
                <div className="sd-modal-overlay">
                    <div className="sd-modal chat-panel" role="dialog" aria-modal="true" aria-labelledby="chat-modal-title">
                        <div className="sd-modal-header bg-teal">
                            <h3 id="chat-modal-title" style={{ color: 'white', margin: 0 }}>Saathi Assistant</h3>
                            <button className="icon-btn" autoFocus onClick={() => setShowChatPanel(false)} aria-label="Close Assistant" style={{ color: 'white' }}><X size={24} aria-hidden="true" /></button>
                        </div>
                        <div className="chat-messages" aria-live="polite">
                            <div className="msg bubble-ai">Hello! I can help you understand this scheme or guide you through the application. What do you need help with?</div>
                        </div>
                        <div className="chat-input-area">
                            <label htmlFor="chatboxInput" className="sr-only">Type or speak question</label>
                            <input id="chatboxInput" type="text" placeholder="Type or speak your question..." />
                            <button className="icon-btn text-teal" aria-label="Use voice input"><Volume2 size={24} aria-hidden="true" /></button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SchemeDetail;
