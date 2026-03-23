import React, { useState } from 'react';
import { Settings, Eye, ZoomIn } from 'lucide-react';
import './AccessibilitySelector.css';

const AccessibilitySelector = ({ onSelect }) => {
    const [selectedMode, setSelectedMode] = useState(null);

    const modes = [
        {
            id: 'standard',
            title: 'Standard Mode',
            description: 'Default layout and color scheme for general use.',
            icon: <Settings size={48} />,
        },
        {
            id: 'simplified',
            title: 'Simplified Mode',
            description: 'Cognitive layout: large icons, minimal text, one action per screen.',
            icon: <ZoomIn size={48} />,
        },
        {
            id: 'high-contrast',
            title: 'High Contrast Mode',
            description: 'Screen reader friendly, black/white, full keyboard navigation.',
            icon: <Eye size={48} />,
        }
    ];

    const handleContinue = () => {
        if (selectedMode) {
            onSelect(selectedMode);
        }
    };

    return (
        <div className="accessibility-overlay fade-in">
            <div className="accessibility-container">
                <h1>Select Accessibility Mode</h1>
                <p className="subtitle">Choose how you want to experience Saathi today.</p>

                <div className="cards-grid">
                    {modes.map((mode) => (
                        <button
                            key={mode.id}
                            className={`mode-card ${selectedMode === mode.id ? 'selected' : ''}`}
                            onClick={() => setSelectedMode(mode.id)}
                            aria-label={`Select ${mode.title}`}
                            aria-pressed={selectedMode === mode.id}
                        >
                            <div className="mode-icon">{mode.icon}</div>
                            <h2>{mode.title}</h2>
                            <p>{mode.description}</p>
                        </button>
                    ))}
                </div>

                {selectedMode && (
                    <div className="continue-wrapper fade-in">
                        <button
                            className="btn btn-primary continue-btn"
                            onClick={handleContinue}
                            aria-label="Continue to website"
                        >
                            Continue
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccessibilitySelector;
