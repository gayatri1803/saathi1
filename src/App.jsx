import React, { useState, useEffect } from 'react';
import AccessibilitySelector from './components/AccessibilitySelector';
import StandardApp from './StandardApp';
import SimplifiedApp from './SimplifiedApp';
import CognitiveApp from './CognitiveApp';

function App() {
    const [theme, setTheme] = useState(null);

    useEffect(() => {
        const savedTheme = localStorage.getItem('saathi_theme');
        if (savedTheme) {
            setTheme(savedTheme);
            document.body.className = `theme-${savedTheme}`;
        }
    }, []);

    const handleThemeSelection = (selectedTheme) => {
        setTheme(selectedTheme);
        localStorage.setItem('saathi_theme', selectedTheme);
        // Safely wipe logical layout classes
        document.body.classList.remove('theme-standard', 'theme-simplified', 'theme-screen_reader', 'theme-high-contrast', 'theme-cognitive');

        if (selectedTheme === 'high-contrast') {
            document.body.classList.add('theme-standard', 'theme-high-contrast');
        } else {
            document.body.classList.add(`theme-${selectedTheme}`);
        }
    };

    if (!theme) {
        return <AccessibilitySelector onSelect={handleThemeSelection} />;
    }

    if (theme === 'simplified') {
        return <SimplifiedApp onThemeChange={handleThemeSelection} />;
    }

    if (theme === 'cognitive') {
        return <CognitiveApp onThemeChange={handleThemeSelection} />;
    }

    return <StandardApp theme={theme} onThemeChange={handleThemeSelection} />;
}

export default App;
