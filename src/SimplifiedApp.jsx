import React, { useState, useEffect } from 'react';
import SimplifiedHome from './components/simplified/SimplifiedHome';
import './components/simplified/SimplifiedLayout.css';

function SimplifiedApp({ onThemeChange }) {
    const [currentPage, setCurrentPage] = useState('home');

    // Make sure body class is correct
    useEffect(() => {
        document.body.className = 'theme-simplified';
    }, []);

    if (currentPage === 'home') {
        return <SimplifiedHome onNavigate={setCurrentPage} onThemeChange={onThemeChange} />;
    }

    return (
        <div style={{ padding: '24px', textAlign: 'center' }}>
            <h1>Work in Progress</h1>
            <button className="btn btn-primary" onClick={() => setCurrentPage('home')}>Go Back</button>
        </div>
    );
}

export default SimplifiedApp;
