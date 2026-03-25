import React from 'react';
import { ArrowLeft, Volume2 } from 'lucide-react';
import './SimplifiedLayout.css';

const SimplifiedHome = ({ onNavigate, onThemeChange }) => {

    const handleBack = () => {
        // In simplified mode, back on home screen goes back to standard mode or selector
        onThemeChange(null);
    };

    const speak = (text) => {
        // Mock speaker functionality
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(utterance);
        }
    };

    const handleSpeakPage = () => {
        speak("Welcome to Saathi. What would you like to do today? You can choose Find Schemes, Track Applications, or My Profile.");
    };

    return (
        <div className="simp-container">
            <header className="simp-header">
                <button className="simp-icon-btn" onClick={handleBack} aria-label="Go Back">
                    <ArrowLeft size={36} />
                </button>
                <button className="simp-icon-btn" onClick={handleSpeakPage} aria-label="Read Screen Aloud">
                    <Volume2 size={36} />
                </button>
            </header>

            <main>
                <h1 className="simp-title">Welcome to Saathi</h1>
                <p className="simp-subtext">What would you like to do today?</p>

                <div className="simp-actions">
                    <button
                        className="simp-btn"
                        onClick={() => onNavigate('schemes')}
                    >
                        Find Schemes
                    </button>

                    <button
                        className="simp-btn simp-btn-outline"
                        onClick={() => onNavigate('tracker')}
                    >
                        Track Applications
                    </button>

                    <button
                        className="simp-btn simp-btn-outline"
                        onClick={() => onNavigate('profile')}
                    >
                        My Profile
                    </button>
                </div>
            </main>
        </div>
    );
};

export default SimplifiedHome;
