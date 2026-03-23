import React, { useState, useEffect } from 'react';
import { Eye, Ear, Activity, Brain, Mic, Users, Heart, FileText, Settings, Volume2 } from 'lucide-react';
import './ProfileSetup.css';

const INDIAN_STATES = [
    "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam",
    "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu",
    "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir",
    "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh",
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry",
    "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const DISABILITY_TYPES = [
    { id: 'visual', label: 'Visual impairment', desc: 'Blindness or low vision', icon: <Eye size={36} aria-hidden="true" /> },
    { id: 'hearing', label: 'Hearing impairment', desc: 'Deaf or hard of hearing', icon: <Ear size={36} aria-hidden="true" /> },
    { id: 'physical', label: 'Locomotor / physical', desc: 'Mobility limitations', icon: <Activity size={36} aria-hidden="true" /> },
    { id: 'cognitive', label: 'Intellectual / cognitive', desc: 'Learning or cognitive difficulties', icon: <Brain size={36} aria-hidden="true" /> },
    { id: 'speech', label: 'Speech disability', desc: 'Difficulty speaking or communicating', icon: <Mic size={36} aria-hidden="true" /> },
    { id: 'multiple', label: 'Multiple disabilities', desc: 'More than one condition', icon: <Heart size={36} aria-hidden="true" /> },
];

const INCOME_RANGES = [
    { id: 'below_1', label: 'Below ₹1,00,000' },
    { id: '1_to_3', label: '₹1,00,000 - ₹3,00,000' },
    { id: '3_to_6', label: '₹3,00,000 - ₹6,00,000' },
    { id: 'above_6', label: 'Above ₹6,00,000' }
];

const ProfileSetup = ({ theme, onComplete }) => {
    const isSimplified = theme === 'simplified';

    useEffect(() => {
        document.title = "Profile Setup — Saathi";
    }, []);

    const stepsStandard = [
        ['disabilityTypes', 'caregiver'],
        ['severity', 'udid'],
        ['state', 'district', 'income']
    ];
    const stepsSimplified = [
        ['disabilityTypes'],
        ['caregiver'],
        ['severity'],
        ['udid'],
        ['state'],
        ['district'],
        ['income']
    ];

    const plan = isSimplified ? stepsSimplified : stepsStandard;
    const totalSteps = plan.length;

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        disabilityTypes: [],
        isCaregiver: false,
        severity: '',
        udid: '',
        state: '',
        district: '',
        income: ''
    });

    const activeFields = plan[currentStep - 1];
    const progressPercent = (currentStep / totalSteps) * 100;

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(prev => prev + 1);
        } else {
            // Save final data to Local Storage
            localStorage.setItem('saathi_disability_type', JSON.stringify(formData.disabilityTypes));
            localStorage.setItem('saathi_disability_severity', formData.severity);
            localStorage.setItem('saathi_has_udid', formData.udid);
            localStorage.setItem('saathi_income', formData.income);
            if (formData.district) localStorage.setItem('saathi_district', formData.district);
            if (formData.state) localStorage.setItem('saathi_state', formData.state);

            // Allow profile setup to explicitly override Caregiver mode if unchecked in registration
            if (formData.isCaregiver) localStorage.setItem('saathi_is_caregiver', 'true');

            onComplete(formData);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(prev => prev - 1);
    };

    const toggleDisability = (id) => {
        setFormData(prev => ({
            ...prev,
            disabilityTypes: prev.disabilityTypes.includes(id)
                ? prev.disabilityTypes.filter(t => t !== id)
                : [...prev.disabilityTypes, id]
        }));
    };

    const speak = (text) => {
        alert(`Read Aloud: "${text}"`);
    };

    // UI Renderers for each field
    const renderDisabilityTypes = () => (
        <fieldset className="form-section fade-in">
            <legend className="step-title">What best describes you?</legend>
            <div className="cards-grid profile-cards">
                {DISABILITY_TYPES.map(type => {
                    const isSelected = formData.disabilityTypes.includes(type.id);
                    return (
                        <button
                            key={type.id}
                            className={`select-card ${isSelected ? 'selected' : ''}`}
                            onClick={() => toggleDisability(type.id)}
                            aria-pressed={isSelected}
                            aria-label={type.label}
                        >
                            <div className="card-content">
                                <div className="icon-wrapper">{type.icon}</div>
                                <div className="card-text">
                                    <h3>{type.label}</h3>
                                    <p>{type.desc}</p>
                                </div>
                            </div>
                            {isSimplified && (
                                <div className="read-aloud-btn" onClick={(e) => { e.stopPropagation(); speak(`${type.label}. ${type.desc}`); }} aria-label={`Read aloud ${type.label}`}>
                                    <Volume2 size={24} aria-hidden="true" />
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
        </fieldset>
    );

    const renderCaregiver = () => (
        <fieldset className="form-section fade-in caregiver-section">
            <legend className="sr-only">Caregiver Information</legend>
            <button
                className={`select-card full-width ${formData.isCaregiver ? 'selected' : ''}`}
                onClick={() => setFormData(p => ({ ...p, isCaregiver: !p.isCaregiver }))}
                aria-pressed={formData.isCaregiver}
            >
                <div className="card-content">
                    <div className="icon-wrapper"><Heart size={36} aria-hidden="true" /></div>
                    <div className="card-text">
                        <h3>I am a caregiver</h3>
                        <p>I am filling this form on behalf of a person with disabilities.</p>
                    </div>
                </div>
                {isSimplified && (
                    <div className="read-aloud-btn" onClick={(e) => { e.stopPropagation(); speak(`I am a caregiver. I am filling this form on behalf of a person with disabilities.`); }} aria-label={`Read aloud caregiver option`}>
                        <Volume2 size={24} aria-hidden="true" />
                    </div>
                )}
            </button>
        </fieldset>
    );

    const renderSeverity = () => (
        <fieldset className="form-section fade-in">
            <legend className="step-title">Is your disability partial or full?</legend>
            <div className="toggle-group">
                {['Partial', 'Full'].map(val => (
                    <button
                        key={val}
                        className={`toggle-btn ${formData.severity === val ? 'active' : ''}`}
                        onClick={() => setFormData(p => ({ ...p, severity: val }))}
                        aria-pressed={formData.severity === val}
                    >
                        {val}
                        {isSimplified && (
                            <div className="read-aloud-btn inline" onClick={(e) => { e.stopPropagation(); speak(val); }} aria-label={`Read aloud ${val}`}>
                                <Volume2 size={24} aria-hidden="true" />
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </fieldset>
    );

    const renderUdid = () => {
        const showHelper = formData.udid === 'No' || formData.udid === "Don't know";
        return (
            <fieldset className="form-section fade-in">
                <legend className="step-title">Do you have a UDID / disability certificate?</legend>
                <div className="toggle-group vert">
                    {['Yes', 'No', 'Applied', "Don't know"].map(val => (
                        <button
                            key={val}
                            className={`toggle-btn ${formData.udid === val ? 'active' : ''}`}
                            onClick={() => setFormData(p => ({ ...p, udid: val }))}
                            aria-pressed={formData.udid === val}
                        >
                            {val}
                            {isSimplified && (
                                <div className="read-aloud-btn inline" onClick={(e) => { e.stopPropagation(); speak(val); }} aria-label={`Read aloud ${val}`}>
                                    <Volume2 size={24} aria-hidden="true" />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
                <div aria-live="polite">
                    {showHelper && (
                        <div className="info-banner fade-in" role="status">
                            <FileText size={24} aria-hidden="true" />
                            <p><strong>We'll help you get one.</strong> You can still find schemes while you apply for a UDID.</p>
                        </div>
                    )}
                </div>
            </fieldset>
        );
    };

    const renderLocation = () => (
        <>
            {activeFields.includes('state') && (
                <fieldset className="form-section fade-in">
                    <legend className="step-title block-label">Which State or Union Territory do you live in?</legend>
                    <div className="input-with-voice">
                        <label htmlFor="stateInput" className="sr-only">State</label>
                        <input
                            id="stateInput"
                            list="stateList"
                            className="setup-input"
                            placeholder="Search or select state..."
                            value={formData.state}
                            onChange={e => setFormData(p => ({ ...p, state: e.target.value }))}
                        />
                        <datalist id="stateList">
                            {INDIAN_STATES.map(s => <option key={s} value={s} />)}
                        </datalist>
                        <button className="voice-input-btn" aria-label="Dictate State" onClick={() => speak("Voice input activated")}><Mic size={24} aria-hidden="true" /></button>
                    </div>
                </fieldset>
            )}

            {activeFields.includes('district') && (
                <fieldset className="form-section fade-in">
                    <legend className="step-title block-label">Which District / City do you live in?</legend>
                    <div className="input-with-voice">
                        <label htmlFor="districtInput" className="sr-only">District</label>
                        <input
                            id="districtInput"
                            type="text"
                            className="setup-input"
                            placeholder="Enter district name..."
                            value={formData.district}
                            onChange={e => setFormData(p => ({ ...p, district: e.target.value }))}
                        />
                        <button className="voice-input-btn" aria-label="Dictate District" onClick={() => speak("Voice input activated")}><Mic size={24} aria-hidden="true" /></button>
                    </div>
                </fieldset>
            )}
        </>
    );

    const renderIncome = () => (
        <fieldset className="form-section fade-in">
            <legend className="step-title">Annual household income range</legend>
            <div className="toggle-group vert">
                {INCOME_RANGES.map(range => (
                    <button
                        key={range.id}
                        className={`toggle-btn ${formData.income === range.id ? 'active' : ''}`}
                        onClick={() => setFormData(p => ({ ...p, income: range.id }))}
                        aria-pressed={formData.income === range.id}
                    >
                        {range.label}
                        {isSimplified && (
                            <div className="read-aloud-btn inline" onClick={(e) => { e.stopPropagation(); speak(range.label); }} aria-label={`Read aloud ${range.label}`}>
                                <Volume2 size={24} aria-hidden="true" />
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </fieldset>
    );

    return (
        <main id="main-content" role="main" className="profile-setup fade-in">
            <a href="#main-content" className="skip-link">Skip to main content</a>
            <div className="setup-container">

                {/* Progress Bar */}
                <div className="progress-header">
                    <p className="progress-text" aria-live="polite">Step {currentStep} of {totalSteps}</p>
                    <div
                        className="progress-bar-container"
                        role="progressbar"
                        aria-valuenow={Math.round(progressPercent)}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        aria-label={`Profile setup progress: ${Math.round(progressPercent)} percent`}
                    >
                        <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
                    </div>
                </div>

                {/* Dynamic Fields */}
                <div className="setup-content">
                    {activeFields.includes('disabilityTypes') && renderDisabilityTypes()}
                    {activeFields.includes('caregiver') && renderCaregiver()}
                    {activeFields.includes('severity') && renderSeverity()}
                    {activeFields.includes('udid') && renderUdid()}
                    {(activeFields.includes('state') || activeFields.includes('district')) && renderLocation()}
                    {activeFields.includes('income') && renderIncome()}
                </div>

                {/* Footer Actions */}
                <div className="setup-actions">
                    {currentStep > 1 && (
                        <button className="btn btn-outline nav-btn" onClick={handleBack}>
                            Back
                        </button>
                    )}
                    <button className="btn btn-primary nav-btn next-btn" onClick={handleNext}>
                        {currentStep === totalSteps ? 'Save and find my schemes' : 'Next'}
                    </button>
                </div>

            </div>
        </main>
    );
};

export default ProfileSetup;
