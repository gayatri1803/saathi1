import React, { useEffect } from 'react';
import { Globe, UserCircle, Mic, Hand, Cpu, Type, Music, WifiOff, Search, AlertTriangle, XCircle } from 'lucide-react';
import './LandingPage.css';

const LandingPage = ({ theme, onChangeTheme, onNavigateToAuth, onNavigateToAdmin, onNavigateToA11y }) => {

    useEffect(() => {
        document.title = "Saathi — Find disability schemes";
    }, []);

    return (
        <div className="landing-page fade-in">
            <a href="#main-content" className="skip-link">Skip to main content</a>
            {/* Navbar */}
            <nav role="navigation" aria-label="Main navigation" className="navbar">
                <div className="container nav-container">
                    <div className="logo-group">
                        <span className="logo-text">Saathi</span>
                        <button className="btn btn-outline small-btn" onClick={onChangeTheme} aria-label="Change Accessibility Mode">
                            Theme: {theme}
                        </button>
                    </div>

                    <div className="nav-actions">
                        <div className="language-selector">
                            <Globe size={20} className="globe-icon" />
                            <select aria-label="Select Language" defaultValue="en">
                                <option value="en">English (English)</option>
                                <option value="hi">हिन्दी (Hindi)</option>
                                <option value="ta">தமிழ் (Tamil)</option>
                            </select>
                        </div>
                        <button className="btn btn-primary login-btn" onClick={onNavigateToAuth}>
                            <UserCircle size={20} />
                            <span>Login</span>
                        </button>
                        <button className="btn btn-outline admin-btn" onClick={onNavigateToAdmin}>
                            <span>Admin Portal</span>
                        </button>
                    </div>
                </div>
            </nav>

            <main id="main-content" role="main">
                {/* Hero Section */}
                <section className="hero-section">
                    <div className="container hero-container">
                        <h1 className="hero-title">Every scheme.<br />Every language.<br />Every ability.</h1>
                        <p className="hero-subtext">Find government benefits made for you — in your language, your way.</p>
                        <div className="hero-actions">
                            <button className="btn btn-primary hero-btn">Find My Schemes</button>
                            <button className="btn btn-outline hero-btn">Learn More</button>
                        </div>
                    </div>
                </section>

                {/* Problem Section */}
                <section className="problem-section">
                    <div className="container">
                        <h2 className="section-title">Why we built Saathi</h2>
                        <div className="problem-cards">
                            <div className="problem-card">
                                <Search className="problem-icon" size={40} />
                                <h3>Don't know which schemes exist</h3>
                                <p>Millions are unaware of the welfare programs they are eligible for.</p>
                            </div>
                            <div className="problem-card">
                                <AlertTriangle className="problem-icon" size={40} />
                                <h3>Application process is too complex</h3>
                                <p>Long forms and bureaucratic hurdles make applying incredibly difficult.</p>
                            </div>
                            <div className="problem-card">
                                <XCircle className="problem-icon" size={40} />
                                <h3>Websites are not accessible</h3>
                                <p>Current platforms lack support for screen readers, voice navigation, or cognitive modes.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Strip */}
                <section className="features-section">
                    <div className="container">
                        <div className="features-grid">
                            <div className="feature-item">
                                <div className="feature-icon-wrapper"><Mic size={32} /></div>
                                <span>Voice Navigation</span>
                            </div>
                            <div className="feature-item">
                                <div className="feature-icon-wrapper"><Hand size={32} /></div>
                                <span>Sign Language</span>
                            </div>
                            <div className="feature-item">
                                <div className="feature-icon-wrapper"><Cpu size={32} /></div>
                                <span>AI Recommendations</span>
                            </div>
                            <div className="feature-item">
                                <div className="feature-icon-wrapper"><Type size={32} /></div>
                                <span>22 Languages</span>
                            </div>
                            <div className="feature-item">
                                <div className="feature-icon-wrapper"><Music size={32} /></div>
                                <span>Voice Forms</span>
                            </div>
                            <div className="feature-item">
                                <div className="feature-icon-wrapper"><WifiOff size={32} /></div>
                                <span>Offline Access</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="footer" role="contentinfo">
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <p>Saathi — Inclusive India</p>
                    <button className="btn-link-mock" onClick={() => onNavigateToA11y()} style={{ color: 'white', textDecoration: 'underline', padding: '0.4rem', border: '2px solid transparent' }}>Accessibility help and keyboard shortcuts</button>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
