import React, { useState, useEffect } from 'react';
import { Mic, Eye, EyeOff, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import './AuthPage.css';

const INDIAN_STATES = [
    "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam",
    "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu",
    "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir",
    "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh",
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry",
    "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const InputField = ({ label, type = "text", id, value, onChange, placeholder, required = false, hasMic = true, showPasswordToggle = false }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="input-group fade-in">
            <label htmlFor={id} className="input-label">
                {label} {required && <span className="required-star" aria-hidden="true">*</span>}
            </label>
            <div className="input-wrapper">
                <input
                    id={id}
                    type={showPasswordToggle ? (showPassword ? "text" : "password") : type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    className="auth-input"
                    aria-required={required}
                    tabIndex={0}
                />
                <div className="input-actions">
                    {showPasswordToggle && (
                        <button
                            type="button"
                            className="icon-btn"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <EyeOff size={24} aria-hidden="true" /> : <Eye size={24} aria-hidden="true" />}
                        </button>
                    )}
                    {hasMic && (
                        <button
                            type="button"
                            className="icon-btn mic-btn"
                            aria-label={`Dictate ${label}`}
                            onClick={() => alert('Voice input activated')}
                        >
                            <Mic size={24} aria-hidden="true" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const AuthPage = ({ theme, onLoginSuccess, onBack }) => {
    const isSimplified = theme === 'simplified';
    const [activeTab, setActiveTab] = useState('login');

    useEffect(() => {
        document.title = "Login — Saathi";
    }, []);

    // Login State
    const [loginMethod, setLoginMethod] = useState(isSimplified ? 'otp' : 'password');
    const [loginIdentifier, setLoginIdentifier] = useState('phone');
    const [otpStep, setOtpStep] = useState(1);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Form Values
    const [formData, setFormData] = useState({
        phone: '', email: '', password: '', confirmPassword: '',
        fullName: '', age: '', state: '', isCaregiver: false, acceptTerms: false, otp: ''
    });

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: type === 'checkbox' ? checked : value
        }));
    };

    const handleAgeChange = (direction) => {
        setFormData(prev => {
            let current = parseInt(prev.age) || 18;
            if (direction === 'up' && current < 120) current++;
            if (direction === 'down' && current > 1) current--;
            return { ...prev, age: current.toString() };
        });
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (loginMethod === 'otp') {
            if (otpStep === 1) {
                if (formData.phone.length < 10) {
                    setError('Please enter a valid 10-digit phone number.');
                    return;
                }
                setSuccess('OTP Sent successfully to your device!');
                setOtpStep(2);
            } else {
                if (formData.otp.length !== 6) {
                    setError('Please enter a 6-digit OTP.');
                    return;
                }
                setSuccess('Login successful!');
                localStorage.setItem('saathi_logged_in', 'true');
                setTimeout(() => onLoginSuccess(), 1000);
            }
        } else {
            if (!formData[loginIdentifier] || !formData.password) {
                setError('Please fill in all required fields.');
                return;
            }
            setSuccess('Login successful!');
            localStorage.setItem('saathi_logged_in', 'true');
            setTimeout(() => onLoginSuccess(), 1000);
        }
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!formData.age || formData.age < 1 || formData.age > 120) {
            setError('Please enter a valid age between 1 and 120.');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (!formData.acceptTerms) {
            setError('You must accept the terms and conditions.');
            return;
        }

        // SMART PROFILE DATA MAPPING
        localStorage.setItem('saathi_name', formData.fullName.trim());
        localStorage.setItem('saathi_age', formData.age);
        localStorage.setItem('saathi_phone', formData.phone);
        localStorage.setItem('saathi_email', formData.email);
        localStorage.setItem('saathi_state', formData.state);
        localStorage.setItem('saathi_is_caregiver', formData.isCaregiver ? 'true' : 'false');
        localStorage.setItem('saathi_language', 'English');
        localStorage.setItem('saathi_logged_in', 'true');

        setSuccess('Registration successful! Redirecting...');
        setTimeout(() => onLoginSuccess(), 1000);
    };

    return (
        <main id="main-content" className="auth-page fade-in" role="main">
            <a href="#main-content" className="skip-link">Skip to main content</a>
            <div className="container auth-container">

                <div className="auth-header">
                    <button className="back-btn" onClick={onBack} aria-label="Go back">
                        <ArrowLeft size={28} aria-hidden="true" />
                    </button>
                    <h1>Saathi Account</h1>
                </div>

                <div className="auth-card">
                    {/* Tabs */}
                    {!isSimplified && (
                        <div className="auth-tabs" role="tablist" aria-label="Authentication Options">
                            <button
                                className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
                                onClick={() => { setActiveTab('login'); setError(''); setSuccess(''); }}
                                role="tab"
                                aria-selected={activeTab === 'login'}
                            >
                                Login
                            </button>
                            <button
                                className={`tab-btn ${activeTab === 'register' ? 'active' : ''}`}
                                onClick={() => { setActiveTab('register'); setError(''); setSuccess(''); }}
                                role="tab"
                                aria-selected={activeTab === 'register'}
                            >
                                Register
                            </button>
                        </div>
                    )}
                    {isSimplified && <h2 className="simplified-title">Welcome to Saathi! Login with Phone</h2>}

                    {/* Feedback Messages */}
                    <div aria-live="assertive" aria-atomic="true">
                        {error && (
                            <div className="alert-message error fade-in" role="alert">
                                <AlertCircle size={24} aria-hidden="true" /> <span>{error}</span>
                            </div>
                        )}
                        {success && (
                            <div className="alert-message success fade-in" role="status">
                                <CheckCircle size={24} aria-hidden="true" /> <span>{success}</span>
                            </div>
                        )}
                    </div>

                    {/* LOGIN CONTENT */}
                    {activeTab === 'login' && (
                        <form className="auth-form" onSubmit={handleLoginSubmit}>
                            <fieldset className="auth-fieldset">
                                <legend className="sr-only">Login Options</legend>
                                {!isSimplified && (
                                    <div className="method-toggles">
                                        {loginMethod === 'password' && (
                                            <fieldset className="identifier-toggle">
                                                <legend className="sr-only">Choose login identifier</legend>
                                                <label>
                                                    <input type="radio" checked={loginIdentifier === 'phone'} onChange={() => setLoginIdentifier('phone')} aria-label="Login with Phone Number" />
                                                    Phone Number
                                                </label>
                                                <label>
                                                    <input type="radio" checked={loginIdentifier === 'email'} onChange={() => setLoginIdentifier('email')} aria-label="Login with Email Address" />
                                                    Email Address
                                                </label>
                                            </fieldset>
                                        )}
                                    </div>
                                )}

                                {/* Password Login Flow */}
                                {loginMethod === 'password' && !isSimplified && (
                                    <>
                                        <InputField
                                            id={loginIdentifier}
                                            label={loginIdentifier === 'phone' ? 'Phone Number' : 'Email Address'}
                                            type={loginIdentifier === 'phone' ? 'tel' : 'email'}
                                            value={formData[loginIdentifier]}
                                            onChange={handleChange}
                                            required
                                            placeholder={loginIdentifier === 'phone' ? 'e.g. 9876543210' : 'e.g. name@example.com'}
                                        />
                                        <InputField
                                            id="password"
                                            label="Password"
                                            type="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            showPasswordToggle
                                            hasMic={false}
                                        />
                                        <div className="form-links">
                                            <a href="#forgot" className="auth-link">Forgot Password?</a>
                                        </div>
                                        <button type="submit" className="btn btn-primary submit-btn">Secure Login</button>
                                        <button type="button" className="btn btn-outline secondary-action-btn" onClick={() => setLoginMethod('otp')}>
                                            Login with OTP instead
                                        </button>
                                    </>
                                )}

                                {/* OTP Login Flow */}
                                {(loginMethod === 'otp' || isSimplified) && (
                                    <>
                                        {otpStep === 1 ? (
                                            <>
                                                <InputField
                                                    id="phone"
                                                    label="Phone Number"
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="e.g. 9876543210"
                                                />
                                                <button type="submit" className="btn btn-primary submit-btn">Send OTP</button>

                                                {!isSimplified && (
                                                    <button type="button" className="btn btn-outline secondary-action-btn" onClick={() => setLoginMethod('password')}>
                                                        Login with Password instead
                                                    </button>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <InputField
                                                    id="otp"
                                                    label="Enter 6-Digit OTP"
                                                    type="number"
                                                    value={formData.otp}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="123456"
                                                    hasMic={false}
                                                />
                                                <button type="submit" className="btn btn-primary submit-btn">Verify & Login</button>
                                                <button type="button" className="btn btn-outline secondary-action-btn" onClick={() => setOtpStep(1)}>
                                                    Change Phone Number
                                                </button>
                                            </>
                                        )}
                                    </>
                                )}

                                {!isSimplified && (
                                    <p className="switch-prompt">
                                        New to Saathi? <button type="button" className="inline-link" onClick={() => setActiveTab('register')}>Register Here</button>
                                    </p>
                                )}
                            </fieldset>
                        </form>
                    )}

                    {/* REGISTER CONTENT */}
                    {activeTab === 'register' && (
                        <form className="auth-form" onSubmit={handleRegisterSubmit}>
                            <fieldset className="auth-fieldset">
                                <legend className="fieldset-legend">Personal Information</legend>
                                <InputField id="fullName" label="Full Name" value={formData.fullName} onChange={handleChange} required placeholder="e.g. Full Name" />

                                <div className="input-group fade-in">
                                    <label htmlFor="age" className="input-label">Your Age <span className="required-star" aria-hidden="true">*</span></label>
                                    {isSimplified ? (
                                        <div className="age-stepper" style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem' }}>
                                            <button type="button" className="btn btn-outline" onClick={() => handleAgeChange('down')} style={{ fontSize: '2rem', width: '60px', height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} aria-label="Decrease age">-</button>
                                            <span style={{ fontSize: '2rem', fontWeight: 'bold', minWidth: '3rem', textAlign: 'center' }} aria-live="polite" id="age">{formData.age || 18}</span>
                                            <button type="button" className="btn btn-outline" onClick={() => handleAgeChange('up')} style={{ fontSize: '2rem', width: '60px', height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} aria-label="Increase age">+</button>
                                        </div>
                                    ) : (
                                        <input
                                            id="age"
                                            type="number"
                                            min="1"
                                            max="120"
                                            value={formData.age}
                                            onChange={handleChange}
                                            required
                                            className="auth-input"
                                            style={{ fontSize: '1.2rem', padding: '1rem' }}
                                            aria-required="true"
                                            placeholder="e.g. 25"
                                        />
                                    )}
                                </div>

                                <InputField id="phone" label="Phone Number" type="tel" value={formData.phone} onChange={handleChange} required placeholder="10-digit mobile number" />
                                <InputField id="email" label="Email Address (Optional)" type="email" value={formData.email} onChange={handleChange} placeholder="name@example.com" />
                            </fieldset>

                            <fieldset className="auth-fieldset">
                                <legend className="fieldset-legend">Location & Security</legend>
                                <div className="input-group">
                                    <label htmlFor="state" className="input-label">State / Union Territory <span className="required-star" aria-hidden="true">*</span></label>
                                    <select id="state" value={formData.state} onChange={handleChange} className="auth-input select-input" required aria-required="true">
                                        <option value="" disabled>Select your state</option>
                                        {INDIAN_STATES.map(state => <option key={state} value={state}>{state}</option>)}
                                    </select>
                                </div>

                                <InputField id="password" label="Create Password" type="password" value={formData.password} onChange={handleChange} required showPasswordToggle hasMic={false} />
                                <InputField id="confirmPassword" label="Confirm Password" type="password" value={formData.confirmPassword} onChange={handleChange} required showPasswordToggle hasMic={false} />
                            </fieldset>

                            <fieldset className="auth-fieldset">
                                <legend className="sr-only">Terms and Conditions</legend>
                                <div className="checkbox-group">
                                    <input type="checkbox" id="isCaregiver" checked={formData.isCaregiver} onChange={handleChange} />
                                    <label htmlFor="isCaregiver">I am registering on behalf of someone else (Caregiver/NGO)</label>
                                </div>

                                <div className="checkbox-group">
                                    <input type="checkbox" id="acceptTerms" checked={formData.acceptTerms} onChange={handleChange} required aria-required="true" />
                                    <label htmlFor="acceptTerms">I agree to the Terms of Service and Privacy Policy <span className="required-star" aria-hidden="true">*</span></label>
                                </div>
                            </fieldset>

                            <button type="submit" className="btn btn-primary submit-btn">Create Account</button>

                            <p className="switch-prompt">
                                Already have an account? <button type="button" className="inline-link" onClick={() => setActiveTab('login')}>Login Here</button>
                            </p>
                        </form>
                    )}

                </div>
            </div>
        </main>
    );
};

export default AuthPage;
