import React, { useState, useEffect } from 'react';
import { User, Volume2, Moon, Type, Sun, ChevronDown, Check, Layout, Menu, Eye } from 'lucide-react';
import './AccessibilityFAB.css';

const LANGUAGES = [
    "English", "Hindi", "Bengali", "Telugu", "Marathi", "Tamil", "Urdu",
    "Gujarati", "Kannada", "Odia", "Malayalam", "Punjabi", "Assamese",
    "Maithili", "Santali", "Kashmiri", "Nepali", "Sindhi", "Dogri",
    "Konkani", "Manipuri", "Bodo"
];

const AccessibilityFAB = ({ currentTheme, onThemeChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [settings, setSettings] = useState({
        fontSize: 'normal', // normal, large, extra-large
        contrast: false,
        voiceMode: false,
        layout: currentTheme || 'standard',
        language: 'English'
    });

    const [hasLoaded, setHasLoaded] = useState(false);

    // Load from LocalStorage
    useEffect(() => {
        const saved = localStorage.getItem('saathi_a11y_prefs');
        if (saved) {
            const parsed = JSON.parse(saved);
            setSettings(parsed);
            applyDOMChanges(parsed);
            if (parsed.layout !== currentTheme) {
                onThemeChange(parsed.layout);
            }
        }
        setHasLoaded(true);
    }, []);

    // Sync prop changes from outside (e.g., initial load if no local storage)
    useEffect(() => {
        if (hasLoaded && currentTheme && settings.layout !== currentTheme) {
            setSettings(prev => ({ ...prev, layout: currentTheme }));
            applyDOMChanges({ ...settings, layout: currentTheme });
        }
    }, [currentTheme, hasLoaded]);

    const applyDOMChanges = (prefs) => {
        const body = document.body;

        // Reset classes
        body.classList.remove('theme-standard', 'theme-simplified', 'theme-screen_reader');
        body.classList.remove('font-normal', 'font-large', 'font-extra-large');
        body.classList.remove('theme-high-contrast');

        // Apply Layout
        if (prefs.layout === 'high-contrast') {
            // Gracefully handle legacy 'high-contrast' payload mapping to layout
            body.classList.add('theme-standard');
            body.classList.add('theme-high-contrast');
        } else {
            body.classList.add(`theme-${prefs.layout}`);
        }

        // Apply Contrast
        if (prefs.contrast || prefs.layout === 'high-contrast') {
            body.classList.add('theme-high-contrast');
        }

        // Apply Font Size
        body.classList.add(`font-${prefs.fontSize}`);
    };

    const handleSave = () => {
        localStorage.setItem('saathi_a11y_prefs', JSON.stringify(settings));
        applyDOMChanges(settings);

        // Explicitly broadcast layout change to React Router/App state
        onThemeChange(settings.layout);

        // Apply language mock logic
        if (settings.voiceMode) {
            alert("Voice mode activated! Page elements will be read aloud on hover/focus.");
        }

        setIsOpen(false);
    };

    const changeFontSize = (direction) => {
        const sizes = ['normal', 'large', 'extra-large'];
        const currentIndex = sizes.indexOf(settings.fontSize);

        if (direction === 'up' && currentIndex < sizes.length - 1) {
            setSettings(p => ({ ...p, fontSize: sizes[currentIndex + 1] }));
        } else if (direction === 'down' && currentIndex > 0) {
            setSettings(p => ({ ...p, fontSize: sizes[currentIndex - 1] }));
        }
    };

    const toggleContrast = () => setSettings(p => ({ ...p, contrast: !p.contrast }));
    const toggleVoiceMode = () => setSettings(p => ({ ...p, voiceMode: !p.voiceMode }));
    const setLayout = (l) => setSettings(p => ({ ...p, layout: l }));

    return (
        <>
            <div className={`a11y-fab-wrapper ${isOpen ? 'panel-open' : ''}`}>

                {/* Toggle Button */}
                {!isOpen && (
                    <button
                        className="a11y-trigger-btn"
                        onClick={() => setIsOpen(true)}
                        aria-label="Open Accessibility Panel"
                    >
                        <User size={30} />
                    </button>
                )}

                {/* Control Panel */}
                {isOpen && (
                    <div className="a11y-panel slide-in-bottom">
                        <div className="a11y-panel-header">
                            <h2>Accessibility Center</h2>
                        </div>

                        <div className="a11y-panel-body">

                            {/* Font Size */}
                            <div className="a11y-setting-row font-sizing">
                                <div className="a11y-setting-label">
                                    <Type size={18} /> <span>Font size</span>
                                </div>
                                <div className="font-controls">
                                    <button className="font-btn minus" onClick={() => changeFontSize('down')} disabled={settings.fontSize === 'normal'}>A-</button>
                                    <span className="font-status">{settings.fontSize === 'normal' ? 'Normal' : settings.fontSize === 'large' ? 'Large' : 'Extra Large'}</span>
                                    <button className="font-btn plus" onClick={() => changeFontSize('up')} disabled={settings.fontSize === 'extra-large'}>A+</button>
                                </div>
                            </div>

                            <hr className="a11y-divider" />

                            {/* Toggles */}
                            <div className="a11y-setting-row toggle-row">
                                <div className="a11y-setting-label">
                                    <Moon size={18} /> <span>High contrast mode</span>
                                </div>
                                <button className={`switch-toggle ${settings.contrast ? 'on' : 'off'}`} onClick={toggleContrast} aria-pressed={settings.contrast}>
                                    <div className="switch-knob"></div>
                                </button>
                            </div>

                            <div className="a11y-setting-row toggle-row">
                                <div className="a11y-setting-label">
                                    <Volume2 size={18} /> <span>Read page aloud</span>
                                </div>
                                <button className={`switch-toggle ${settings.voiceMode ? 'on' : 'off'}`} onClick={toggleVoiceMode} aria-pressed={settings.voiceMode}>
                                    <div className="switch-knob"></div>
                                </button>
                            </div>

                            <hr className="a11y-divider" />

                            {/* Layout Mode */}
                            <div className="a11y-setting-col">
                                <div className="a11y-setting-label mb-2">
                                    <Layout size={18} /> <span>Layout Mode</span>
                                </div>
                                <div className="layout-btn-group">
                                    <button className={`layout-btn ${settings.layout === 'standard' ? 'active' : ''}`} onClick={() => setLayout('standard')}>
                                        <Menu size={20} /> Standard
                                    </button>
                                    <button className={`layout-btn ${settings.layout === 'simplified' ? 'active' : ''}`} onClick={() => setLayout('simplified')}>
                                        <Check size={20} /> Simplified
                                    </button>
                                    <button className={`layout-btn ${settings.layout === 'screen_reader' ? 'active' : ''}`} onClick={() => setLayout('screen_reader')}>
                                        <Eye size={20} /> Screen Reader
                                    </button>
                                </div>
                            </div>

                            <hr className="a11y-divider" />

                            {/* Language */}
                            <div className="a11y-setting-col">
                                <div className="a11y-setting-label mb-2">
                                    <span>Language / भाषा</span>
                                </div>
                                <div className="lang-select-wrapper">
                                    <select
                                        value={settings.language}
                                        onChange={(e) => setSettings(p => ({ ...p, language: e.target.value }))}
                                        className="lang-select"
                                    >
                                        {LANGUAGES.map(lang => (
                                            <option key={lang} value={lang}>{lang}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="select-icon" size={16} />
                                </div>
                            </div>

                        </div>

                        <div className="a11y-panel-footer">
                            <button className="btn btn-outline small-btn flex-1" onClick={() => setIsOpen(false)}>Cancel</button>
                            <button className="btn btn-primary small-btn flex-2" onClick={handleSave}>Save preferences</button>
                        </div>
                    </div>
                )}

            </div>
        </>
    );
};

export default AccessibilityFAB;
