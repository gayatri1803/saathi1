import React, { useState, useEffect } from 'react';
import {
    Bell, Settings, Eye, Search, FileText, Upload, Bot,
    BookmarkMinus, ChevronRight, Home, LayoutList,
    CheckSquare, TrendingUp, User, Heart, AlertTriangle
} from 'lucide-react';
import './Dashboard.css';
import { getRecommendations } from '../schemesEngine';

const Dashboard = ({ onNavigate }) => {
    const [userName, setUserName] = useState('');
    const [profile, setProfile] = useState({});
    const [isCaregiver, setIsCaregiver] = useState(false);

    // Dynamic Match State
    const [recommendations, setRecommendations] = useState([]);
    const [showHowItWorks, setShowHowItWorks] = useState(true);
    const [savedSchemes, setSavedSchemes] = useState([
        { id: 201, name: 'ADIP Scheme for Assistive Devices', amount: '₹10,000 max', match: 92, tag: 'Equipment' },
        { id: 202, name: 'Indira Gandhi National Disability Pension', amount: '₹300/mo', match: 85, tag: 'Pension' }
    ]);

    useEffect(() => {
        document.title = "Home — Saathi";
        const savedName = localStorage.getItem('saathi_name');
        if (savedName) setUserName(savedName.split(' ')[0]);

        const caregiverStatus = localStorage.getItem('saathi_is_caregiver') === 'true';
        setIsCaregiver(caregiverStatus);

        let parsedDisabilities = [];
        try {
            parsedDisabilities = JSON.parse(localStorage.getItem('saathi_disability_type') || '[]');
        } catch (e) { }

        const currentProfile = {
            age: parseInt(localStorage.getItem('saathi_age')) || null,
            income: localStorage.getItem('saathi_income') || null,
            state: localStorage.getItem('saathi_state') || null,
            severity: localStorage.getItem('saathi_disability_severity') || null,
            udid: localStorage.getItem('saathi_has_udid') || null,
            disabilityTypes: parsedDisabilities,
        };

        setProfile(currentProfile);

        // Fetch dynamic matches
        const matches = getRecommendations(currentProfile);
        setRecommendations(matches);

    }, []);

    const greetingText = userName ? `Namaste, ${userName}` : 'Hi there';

    // Caregiver translations
    const targetPersonText = isCaregiver ? "the person you are helping" : "you";
    const targetPersonPossessiveText = isCaregiver ? "Their" : "Your";

    // Summary Badge generator
    let primaryDisabilityLabel = 'General matches';
    if (profile.disabilityTypes && profile.disabilityTypes.length > 0) {
        primaryDisabilityLabel = profile.disabilityTypes[0].charAt(0).toUpperCase() + profile.disabilityTypes[0].slice(1) + ' impairment';
    }

    const removeBookmark = (id) => {
        setSavedSchemes(prev => prev.filter(s => s.id !== id));
    };

    return (
        <div className="dashboard-page fade-in">
            <a href="#main-content" className="skip-link">Skip to main content</a>
            <div className="dashboard-container">
                {/* Header */}
                <header className="dashboard-header" role="banner">
                    <div className="header-user">
                        <h1 aria-live="polite">{greetingText}</h1>
                        <div className="badge" aria-label={`Profile focus: ${primaryDisabilityLabel}`}>
                            {isCaregiver ? <Heart size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
                            {isCaregiver ? 'Caregiver Mode' : primaryDisabilityLabel}
                        </div>
                    </div>
                    <div className="header-actions">
                        <button className="icon-btn circle-btn" aria-label="Notifications"><Bell size={24} aria-hidden="true" /></button>
                        <button className="icon-btn circle-btn" aria-label="Settings"><Settings size={24} aria-hidden="true" /></button>
                    </div>
                </header>

                <main id="main-content" role="main" className="dashboard-main">

                    {/* UDID Dynamic Banners */}
                    {(!profile.udid || profile.udid === 'No' || profile.udid === "Don't know") && (
                        <div className="alert-strip fade-in" style={{ backgroundColor: '#fff3cd', color: '#856404', borderLeftColor: '#ffeeba' }} role="alert">
                            <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <AlertTriangle size={20} aria-hidden="true" />
                                <strong>UDID Card Missing:</strong> Applying for a UDID will unlock more schemes for {targetPersonText}.
                            </p>
                        </div>
                    )}

                    {profile.udid === 'Applied' && (
                        <div className="alert-strip fade-in" style={{ backgroundColor: '#d1ecf1', color: '#0c5460', borderLeftColor: '#bee5eb' }} role="status">
                            <p><strong>UDID Pending:</strong> We will notify you when {targetPersonPossessiveText.toLowerCase()} UDID application status updates.</p>
                        </div>
                    )}

                    {/* Alert Banner / Dynamic Summary */}
                    <div className="alert-strip fade-in" role="status">
                        <p>We found <strong>{recommendations.length} schemes</strong> matching {targetPersonPossessiveText.toLowerCase()} profile.</p>
                        <button className="btn-link-mock alert-link" onClick={() => onNavigate('schemes')}>View All</button>
                    </div>

                    {/* How It Works */}
                    {showHowItWorks && (
                        <section className="how-it-works-card fade-in" aria-labelledby="how-it-works-heading">
                            <div className="how-header">
                                <h2 id="how-it-works-heading">How Saathi works</h2>
                                <button className="close-btn" onClick={() => setShowHowItWorks(false)} aria-label="Dismiss guide">✕</button>
                            </div>
                            <div className="how-steps">
                                <div className="how-step"><span className="step-circle" aria-hidden="true">1</span> Build profile</div>
                                <div className="how-step"><span className="step-circle" aria-hidden="true">2</span> Get matched</div>
                                <div className="how-step"><span className="step-circle" aria-hidden="true">3</span> Apply with guidance</div>
                            </div>
                        </section>
                    )}

                    {/* AI Recommendations */}
                    <section className="dashboard-section fade-in" aria-labelledby="recommendations-heading">
                        <h2 id="recommendations-heading" className="section-heading">Recommended for {targetPersonText}</h2>
                        <div className="horizontal-scroll" role="region" aria-label="Scheme Recommendations Carousel" tabIndex="0">
                            <div className="scroll-track">
                                {recommendations.slice(0, 5).map(scheme => (
                                    <article key={scheme.id} className="scheme-card match-card">
                                        <div className="card-top">
                                            <span className="match-badge" aria-label={`Match score: ${scheme.match} percent`}>{scheme.match}% match</span>
                                            <span className="cat-tag">{scheme.tag}</span>
                                        </div>
                                        <h3>{scheme.name}</h3>
                                        <p className="amount" aria-label={`Benefit amount: ${scheme.amount}`}>{scheme.amount}</p>
                                        <button className="btn btn-primary small-btn" aria-label={`View details for ${scheme.name}`}>View Details</button>
                                    </article>
                                ))}
                                {recommendations.length === 0 && (
                                    <div className="scheme-card match-card empty-match">
                                        <p>Expand your profile to find more matches.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        {recommendations.length > 0 && (
                            <button className="btn-link-mock see-all-link" onClick={() => onNavigate('schemes')}>
                                See all {recommendations.length} matches <ChevronRight size={18} aria-hidden="true" />
                            </button>
                        )}
                    </section>

                    {/* Quick Actions Row */}
                    <section className="dashboard-section fade-in" aria-label="Quick Actions">
                        <h2 className="section-heading">Quick Actions</h2>
                        <div className="quick-actions-grid">
                            <button className="qa-btn" onClick={() => onNavigate('schemes')} aria-label="Search all Schemes">
                                <div className="qa-icon"><Search size={28} aria-hidden="true" /></div>
                                <span>Search Schemes</span>
                            </button>
                            <button className="qa-btn" onClick={() => onNavigate('tracker')} aria-label="View My Applications">
                                <div className="qa-icon"><FileText size={28} aria-hidden="true" /></div>
                                <span>My Applications</span>
                            </button>
                            <button className="qa-btn" aria-label="Upload Documents">
                                <div className="qa-icon"><Upload size={28} aria-hidden="true" /></div>
                                <span>Upload Docs</span>
                            </button>
                            <button className="qa-btn ai-action-btn" aria-label="Open AI Assistant">
                                <div className="qa-icon"><Bot size={28} aria-hidden="true" /></div>
                                <span>AI Assistant</span>
                            </button>
                        </div>
                    </section>

                    {/* Bookmarked Schemes */}
                    <section className="dashboard-section fade-in" aria-labelledby="saved-schemes-heading">
                        <h2 id="saved-schemes-heading" className="section-heading">Saved Schemes</h2>
                        <div className="saved-list">
                            {savedSchemes.map(scheme => (
                                <article key={scheme.id} className="scheme-card saved-card">
                                    <div className="saved-info">
                                        <h3>{scheme.name}</h3>
                                        <p>{scheme.amount}</p>
                                    </div>
                                    <button className="icon-btn remove-btn" aria-label={`Remove ${scheme.name} from saved list`} onClick={() => removeBookmark(scheme.id)}>
                                        <BookmarkMinus size={28} />
                                    </button>
                                </article>
                            ))}
                            {savedSchemes.length === 0 && <p className="empty-text">No saved schemes yet.</p>}
                        </div>
                    </section>
                </main>
            </div>

            {/* Spacer for bottom nav */}
            <div style={{ height: '80px' }} aria-hidden="true"></div>

            {/* Sticky Bottom Nav */}
            <nav className="bottom-nav" role="navigation" aria-label="Primary mobile navigation">
                <div className="nav-container">
                    <button className="nav-item active" onClick={() => onNavigate('home')} aria-current="page"><Home size={28} aria-hidden="true" /><span>Home</span></button>
                    <button className="nav-item" onClick={() => onNavigate('schemes')}><LayoutList size={28} aria-hidden="true" /><span>Schemes</span></button>
                    {/* The Apply button route depends on having an active application, we'll route to tracking or scheme list */}
                    <button className="nav-item" onClick={() => onNavigate('schemes')}><CheckSquare size={28} aria-hidden="true" /><span>Apply</span></button>
                    <button className="nav-item" onClick={() => onNavigate('tracker')}><TrendingUp size={28} aria-hidden="true" /><span>Tracker</span></button>
                    <button className="nav-item" onClick={() => onNavigate('profile')}><User size={28} aria-hidden="true" /><span>Profile</span></button>
                </div>
            </nav>
        </div>
    );
};

export default Dashboard;
