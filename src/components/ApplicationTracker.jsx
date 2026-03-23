import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Eye, CheckCircle, XCircle, MessageSquare, FileText, Volume2, ChevronDown, ChevronUp, Bell, Download, AlertTriangle } from 'lucide-react';
import './ApplicationTracker.css';

const MOCK_APPLICATIONS = [
    {
        id: 'app-1',
        schemeName: 'ADIP Scheme for Assistive Devices',
        submittedDate: '10 Oct 2026',
        lastUpdated: '12 Oct 2026',
        status: 'under_review', // submitted, under_review, approved, rejected
        documents: ['Aadhaar Card', 'UDID Certificate', 'Income Proof'],
        timeline: [
            { step: 'Applied', date: '10 Oct 2026', completed: true },
            { step: 'Received by Nodal Officer', date: '11 Oct 2026', completed: true },
            { step: 'Under Review', date: '12 Oct 2026', completed: true, active: true },
            { step: 'Decision', date: 'Pending', completed: false }
        ]
    },
    {
        id: 'app-2',
        schemeName: 'Scholarship for Top Class Education',
        submittedDate: '15 Sep 2026',
        lastUpdated: '28 Sep 2026',
        status: 'approved',
        documents: ['Aadhaar Card', 'UDID Certificate', 'College Admission Letter'],
        timeline: [
            { step: 'Applied', date: '15 Sep 2026', completed: true },
            { step: 'Received by Nodal Officer', date: '18 Sep 2026', completed: true },
            { step: 'Under Review', date: '21 Sep 2026', completed: true },
            { step: 'Approved', date: '28 Sep 2026', completed: true, active: true }
        ]
    },
    {
        id: 'app-3',
        schemeName: 'Indira Gandhi National Disability Pension',
        submittedDate: '01 Aug 2026',
        lastUpdated: '15 Aug 2026',
        status: 'rejected',
        rejectReason: 'Income certificate mismatch',
        documents: ['Aadhaar Card', 'UDID Certificate', 'Old Income Proof'],
        timeline: [
            { step: 'Applied', date: '01 Aug 2026', completed: true },
            { step: 'Received by Nodal Officer', date: '05 Aug 2026', completed: true },
            { step: 'Under Review', date: '10 Aug 2026', completed: true },
            { step: 'Rejected', date: '15 Aug 2026', completed: true, active: true }
        ]
    },
    {
        id: 'app-4',
        schemeName: 'Divyangjan Swavalamban Yojana',
        submittedDate: '20 Oct 2026',
        lastUpdated: '20 Oct 2026',
        status: 'submitted',
        documents: ['Aadhaar Card', 'UDID Certificate', 'Business Plan'],
        timeline: [
            { step: 'Applied', date: '20 Oct 2026', completed: true, active: true },
            { step: 'Received by Nodal Officer', date: 'Pending', completed: false },
            { step: 'Under Review', date: 'Pending', completed: false },
            { step: 'Decision', date: 'Pending', completed: false }
        ]
    }
];

const ApplicationTracker = ({ theme, onBack, onNavigate }) => {
    const isSimplified = theme === 'simplified';

    const [activeFilter, setActiveFilter] = useState('All');
    const [expandedCard, setExpandedCard] = useState(null);
    const [showChatPanel, setShowChatPanel] = useState(false);
    const [chatContext, setChatContext] = useState('');
    const [announcedStatus, setAnnouncedStatus] = useState('');
    const [isCaregiver, setIsCaregiver] = useState(false);

    useEffect(() => {
        document.title = "My Applications — Saathi";
        setIsCaregiver(localStorage.getItem('saathi_is_caregiver') === 'true');
    }, []);

    const targetPossessive = isCaregiver ? "Their" : "Your";

    const filters = ['All', 'Submitted', 'Under review', 'Approved', 'Rejected'];

    const getStatusConfig = (status) => {
        switch (status) {
            case 'submitted': return { text: 'Submitted', colorClass: 'status-yellow', icon: <Clock size={16} /> };
            case 'under_review': return { text: 'Under Review', colorClass: 'status-blue', icon: <Eye size={16} /> };
            case 'approved': return { text: 'Approved', colorClass: 'status-green', icon: <CheckCircle size={16} /> };
            case 'rejected': return { text: 'Rejected', colorClass: 'status-red', icon: <XCircle size={16} /> };
            default: return { text: 'Unknown', colorClass: 'status-gray', icon: <Clock size={16} /> };
        }
    };

    const filteredApps = MOCK_APPLICATIONS.filter(app => {
        if (activeFilter === 'All') return true;
        const config = getStatusConfig(app.status);
        return config.text.toLowerCase() === activeFilter.toLowerCase();
    });

    const handleReadAloud = (text) => {
        alert(`Reading aloud: ${text}`);
    };

    const toggleExpand = (id, appName, statusText) => {
        if (expandedCard === id) {
            setExpandedCard(null);
        } else {
            setExpandedCard(id);
            setAnnouncedStatus(`Expanded details for ${appName}. Current status: ${statusText}.`);
        }
    };

    const openHelpChat = (schemeName) => {
        setChatContext(schemeName);
        setShowChatPanel(true);
    };

    // Announce filter changes (aria-live mock)
    useEffect(() => {
        setAnnouncedStatus(`Filter changed to ${activeFilter}. Showing ${filteredApps.length} applications.`);
    }, [activeFilter, filteredApps.length]);

    return (
        <div className="tracker-page fade-in">
            {/* Invisible aria-live region for screen readers */}
            <div className="sr-only" aria-live="polite" aria-atomic="true">
                {announcedStatus}
            </div>

            <header className="trk-header">
                <div className="trk-header-top">
                    <button className="icon-btn" onClick={onBack} aria-label="Go back to Dashboard">
                        <ArrowLeft size={28} />
                    </button>
                    <h1>My Applications</h1>
                    <div className="trk-badge">{MOCK_APPLICATIONS.length} applications</div>
                </div>
            </header>

            <main id="main-content" role="main" className="trk-main">

                {/* Notifications Section */}
                <section className="trk-notifications">
                    <div className="trk-notif-card">
                        <Bell size={24} className="notif-icon" />
                        <div className="notif-content">
                            <h4>Recent Update</h4>
                            <p>{targetPossessive} <strong>ADIP application</strong> moved to <strong>Under Review</strong> — 2 days ago.</p>
                        </div>
                        <button className="icon-btn text-muted"><XCircle size={20} /></button>
                    </div>
                </section>

                {/* Filters */}
                <section className="trk-filters horizontal-scroll">
                    <div className="chips-container">
                        {filters.map(f => (
                            <button
                                key={f}
                                className={`chip ${activeFilter === f ? 'active' : ''}`}
                                onClick={() => setActiveFilter(f)}
                                aria-pressed={activeFilter === f}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Application List */}
                <section className="trk-list">
                    {filteredApps.length === 0 ? (
                        <div className="trk-empty-state fade-in">
                            <FileText size={48} className="empty-icon text-muted" />
                            <h2>You haven't applied to any schemes yet</h2>
                            <p>Applications you submit will appear here so you can track their progress.</p>
                            <button className="btn btn-primary" onClick={() => onNavigate('schemes')}>Browse schemes</button>
                        </div>
                    ) : (
                        filteredApps.map(app => {
                            const statusConfig = getStatusConfig(app.status);
                            const isExpanded = expandedCard === app.id;

                            if (isSimplified) {
                                return (
                                    <div key={app.id} className="trk-card-simplified fade-in">
                                        <h3>{app.schemeName}</h3>
                                        <div className={`trk-status-pill huge ${statusConfig.colorClass}`}>
                                            {statusConfig.icon} <span>{statusConfig.text}</span>
                                        </div>
                                        <button className="btn btn-primary btn-giant full-width mt-3">View Next Steps</button>
                                        <button className="read-aloud-btn large-inline" onClick={() => handleReadAloud(`${app.schemeName}. Status: ${statusConfig.text}`)}>
                                            <Volume2 size={28} /> Read Status
                                        </button>
                                    </div>
                                );
                            }

                            return (
                                <div key={app.id} className={`trk-card ${isExpanded ? 'expanded' : ''} fade-in`}>

                                    {/* Card Header (Always Visible) */}
                                    <div className="trk-card-header">
                                        <div className="trk-card-info">
                                            <h3>{app.schemeName}</h3>
                                            <div className="trk-dates">
                                                <span><strong>Submitted:</strong> {app.submittedDate}</span>
                                                <span>•</span>
                                                <span><strong>Updated:</strong> {app.lastUpdated}</span>
                                            </div>
                                        </div>
                                        <div className="trk-card-actions">
                                            <button className="read-aloud-btn" aria-label={`Read aloud status of ${app.schemeName}`} onClick={() => handleReadAloud(`Scheme: ${app.schemeName}. Status: ${statusConfig.text}. Submitted on ${app.submittedDate}`)}>
                                                <Volume2 size={24} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Status Pill & Toggles */}
                                    <div className="trk-card-mid">
                                        <div className={`trk-status-pill ${statusConfig.colorClass}`}>
                                            {statusConfig.icon} <span>{statusConfig.text}</span>
                                        </div>
                                        {!isExpanded ? (
                                            <button className="btn btn-outline small-btn" onClick={() => toggleExpand(app.id, app.schemeName, statusConfig.text)}>
                                                View details <ChevronDown size={18} />
                                            </button>
                                        ) : (
                                            <button className="btn btn-outline small-btn" onClick={() => toggleExpand(app.id, app.schemeName, statusConfig.text)}>
                                                Hide details <ChevronUp size={18} />
                                            </button>
                                        )}
                                    </div>

                                    {/* Expanded View */}
                                    {isExpanded && (
                                        <div className="trk-card-expanded fade-in">

                                            {/* Timeline */}
                                            <div className="trk-timeline">
                                                {app.timeline.map((item, index) => (
                                                    <div key={index} className={`timeline-item ${item.completed ? 'completed' : ''} ${item.active ? 'active' : ''}`}>
                                                        <div className="timeline-marker">
                                                            {item.completed ? <CheckCircle size={16} /> : <div className="dot"></div>}
                                                        </div>
                                                        <div className="timeline-content">
                                                            <strong>{item.step}</strong>
                                                            <span>{item.date}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Document List */}
                                            <div className="trk-docs">
                                                <h4>Documents Submitted</h4>
                                                <ul>
                                                    {app.documents.map((doc, i) => (
                                                        <li key={i}>
                                                            <FileText size={16} className="text-muted" /> {doc}
                                                            <button className="icon-btn text-teal small-icon"><Eye size={16} /></button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Dependent Actions */}
                                            <div className="trk-dependent-actions">
                                                {app.status === 'rejected' && (
                                                    <div className="reject-alert">
                                                        <AlertTriangle size={20} />
                                                        <div>
                                                            <strong>Reason:</strong> {app.rejectReason}
                                                        </div>
                                                        <button className="btn btn-outline full-width mt-2">File a grievance</button>
                                                    </div>
                                                )}

                                                {app.status === 'approved' && (
                                                    <button className="btn btn-primary full-width">
                                                        View benefit details <Download size={20} />
                                                    </button>
                                                )}

                                                <button className="text-link mt-3 help-link" onClick={() => openHelpChat(app.schemeName)}>
                                                    <MessageSquare size={16} /> Need help? Ask Saathi Assistant
                                                </button>
                                            </div>

                                        </div>
                                    )}

                                </div>
                            );
                        })
                    )}
                </section>

            </main>

            {/* AI Chatbot Panel Mock */}
            {showChatPanel && (
                <div className="sd-modal-overlay">
                    <div className="sd-modal chat-panel" role="dialog" aria-modal="true" aria-labelledby="tracker-chat-title">
                        <div className="sd-modal-header bg-teal">
                            <h3 id="tracker-chat-title" style={{ color: 'white', margin: 0 }}>Saathi Assistant</h3>
                            <button className="icon-btn" autoFocus onClick={() => setShowChatPanel(false)} aria-label="Close Assistant" style={{ color: 'white' }}><XCircle size={24} aria-hidden="true" /></button>
                        </div>
                        <div className="chat-messages" aria-live="polite">
                            <div className="msg bubble-ai">
                                Hello! I see you need help regarding {targetPossessive.toLowerCase()} <strong>{chatContext}</strong> application. What information can I find for you?
                            </div>
                        </div>
                        <div className="chat-input-area">
                            <label htmlFor="trkChatInput" className="sr-only">Type or speak your question</label>
                            <input id="trkChatInput" type="text" placeholder="Type or speak your question..." />
                            <button className="icon-btn text-teal" aria-label="Use voice input"><Volume2 size={24} aria-hidden="true" /></button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApplicationTracker;
