import React from 'react';
import { ArrowLeft, Volume2 } from 'lucide-react';
import '../simplified/SimplifiedLayout.css';

const CognitiveHome = ({ onNavigate, onThemeChange }) => {

    const handleBack = () => {
        onThemeChange(null);
    };

    const speak = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(utterance);
        }
    };

    const handleSpeakPage = () => {
        speak("Hello. How can we help you? Get Money Help, Check My Forms, or About Me.");
    };

    return (
        <div className="simp-container">
            <header className="simp-header">
                <button className="simp-icon-btn" onClick={handleBack} aria-label="Go Back">
                    <ArrowLeft size={36} />
                </button>
                <button className="simp-icon-btn" onClick={handleSpeakPage} aria-label="Read Screen Aloud">
                    <Volume2 size={40} />
                </button>
            </header>

            <main>
                <h1 className="simp-title" style={{ fontSize: '40px' }}>Hello</h1>
                <p className="simp-subtext" style={{ fontSize: '24px' }}>How can we help you?</p>

                <div className="simp-actions">
                    <button
                        className="simp-btn"
                        onClick={() => onNavigate('schemes')}
                        style={{ fontSize: '28px' }}
                    >
                        Get Money Help
                    </button>

                    <button
                        className="simp-btn simp-btn-outline"
                        onClick={() => onNavigate('tracker')}
                        style={{ fontSize: '28px' }}
                    >
                        Check My Forms
                    </button>

                    <button
                        className="simp-btn simp-btn-outline"
                        onClick={() => onNavigate('profile')}
                        style={{ fontSize: '28px' }}
                    >
                        About Me
                    </button>
                </div>
            </main>
        </div>
    );
};

export default CognitiveHome;
