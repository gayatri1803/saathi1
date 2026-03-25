import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import ProfileSetup from './components/ProfileSetup';
import Dashboard from './components/Dashboard';
import SchemeListing from './components/SchemeListing';
import SchemeDetail from './components/SchemeDetail';
import ApplyGuide from './components/ApplyGuide';
import ApplicationTracker from './components/ApplicationTracker';
import AccessibilityFAB from './components/AccessibilityFAB';
import AIChatbot from './components/AIChatbot';
import AdminDashboard from './components/AdminDashboard';

function StandardApp({ theme, onThemeChange }) {
    const [currentPage, setCurrentPage] = useState('landing'); // 'landing', 'auth', 'profile'

    const handleLoginSuccess = () => {
        setCurrentPage('profile');
        alert("Success! Redirecting to disability profile setup page...");
    };

    if (currentPage === 'auth') {
        return <AuthPage theme={theme} onBack={() => setCurrentPage('landing')} onLoginSuccess={handleLoginSuccess} onAdminLogin={() => setCurrentPage('admin')} />;
    }

    if (currentPage === 'admin') {
        return <AdminDashboard onNavigate={setCurrentPage} />;
    }

    if (currentPage === 'profile') {
        return (
            <>
                <ProfileSetup theme={theme} onComplete={(data) => { console.log('Profile saved:', data); setCurrentPage('home'); }} />
                <AccessibilityFAB currentTheme={theme} onThemeChange={onThemeChange} />
            </>
        );
    }

    if (currentPage === 'apply_guide') {
        return (
            <>
                <ApplyGuide theme={theme} onBack={() => setCurrentPage('scheme_detail')} onNavigate={setCurrentPage} />
                <AccessibilityFAB currentTheme={theme} onThemeChange={onThemeChange} />
                <AIChatbot theme={theme} currentPage={currentPage} onNavigate={setCurrentPage} />
            </>
        );
    }

    if (currentPage === 'scheme_detail') {
        return (
            <>
                <SchemeDetail theme={theme} onBack={() => setCurrentPage('schemes')} onNavigate={setCurrentPage} />
                <AccessibilityFAB currentTheme={theme} onThemeChange={onThemeChange} />
                <AIChatbot theme={theme} currentPage={currentPage} onNavigate={setCurrentPage} />
            </>
        );
    }

    if (currentPage === 'tracker') {
        return (
            <>
                <ApplicationTracker theme={theme} onBack={() => setCurrentPage('home')} onNavigate={setCurrentPage} />
                <AccessibilityFAB currentTheme={theme} onThemeChange={onThemeChange} />
                <AIChatbot theme={theme} currentPage={currentPage} onNavigate={setCurrentPage} />
            </>
        );
    }

    if (currentPage === 'schemes') {
        return (
            <>
                <SchemeListing theme={theme} onBack={() => setCurrentPage('home')} onNavigate={setCurrentPage} />
                <AccessibilityFAB currentTheme={theme} onThemeChange={onThemeChange} />
                <AIChatbot theme={theme} currentPage={currentPage} onNavigate={setCurrentPage} />
            </>
        );
    }

    if (currentPage === 'home') {
        return (
            <>
                <Dashboard onNavigate={setCurrentPage} />
                <AccessibilityFAB currentTheme={theme} onThemeChange={onThemeChange} />
                <AIChatbot theme={theme} currentPage={currentPage} onNavigate={setCurrentPage} />
            </>
        );
    }

    return (
        <>
            <LandingPage
                theme={theme}
                onChangeTheme={() => onThemeChange(null)}
                onNavigateToAuth={() => setCurrentPage('auth')}
                onNavigateToAdmin={() => setCurrentPage('admin')}
            />
            <AccessibilityFAB currentTheme={theme} onThemeChange={onThemeChange} />
            <AIChatbot theme={theme} currentPage={currentPage} onNavigate={setCurrentPage} />
        </>
    );
}

export default StandardApp;
