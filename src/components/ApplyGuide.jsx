import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Volume2, Upload, Camera, FileText, CheckCircle, Lightbulb, Trash2, Mic } from 'lucide-react';
import './ApplyGuide.css';

const MOCK_SCHEME_NAME = "Scholarship for Top Class Education";

const ApplyGuide = ({ theme, onBack, onNavigate }) => {
    const isSimplified = theme === 'simplified';
    const userName = localStorage.getItem('saathi_name') ? localStorage.getItem('saathi_name').split(' ')[0] : 'User';
    const [isCaregiver, setIsCaregiver] = useState(false);

    useEffect(() => {
        document.title = "Application Guide — Saathi";
        setIsCaregiver(localStorage.getItem('saathi_is_caregiver') === 'true');
    }, []);

    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 4; // Not counting success screen

    // Document states
    const [documents, setDocuments] = useState({
        aadhaar: null,
        certificate: null,
        income: null
    });

    const handleReadAloud = (text) => {
        alert(`Reading aloud: ${text}`);
    };

    const fileInputRef = useRef(null);
    const [activeUploadDoc, setActiveUploadDoc] = useState(null);

    const triggerUpload = (docKey) => {
        setActiveUploadDoc(docKey);
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0] && activeUploadDoc) {
            const file = e.target.files[0];
            const previewUrl = URL.createObjectURL(file);
            setDocuments(prev => ({
                ...prev,
                [activeUploadDoc]: { name: file.name, url: previewUrl }
            }));
        }
    };

    const removeDoc = (docKey) => {
        setDocuments(prev => ({ ...prev, [docKey]: null }));
    };

    const allUploaded = documents.aadhaar && documents.certificate && documents.income;

    const handleNext = () => {
        if (currentStep < 5) setCurrentStep(prev => prev + 1);
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(prev => prev - 1);
    };

    const renderCurrentStep = () => {
        if (currentStep === 1) {
            const stepText = "Visit the National Scholarship Portal at myscheme.gov.in and click on 'New Registration' if you don't have an account.";
            return (
                <div className="ag-step-card fade-in">
                    <div className="ag-step-header">
                        <div className="ag-step-circle">1</div>
                        <h2>Visit the Official Portal</h2>
                        <button className="read-aloud-btn circle" onClick={() => handleReadAloud(stepText)} aria-label="Read step aloud">
                            <Volume2 size={24} />
                        </button>
                    </div>
                    <p className="ag-step-desc">{stepText}</p>
                    <div className="ag-tip-box">
                        <Lightbulb size={24} className="tip-icon" />
                        <p><strong>Tip:</strong> Keep your mobile phone nearby. You will receive an OTP via SMS to verify your account.</p>
                    </div>
                </div>
            );
        }

        if (currentStep === 2) {
            const stepText = "Fill in your personal details, disability UDID number, and permanent address exactly as they appear on your Aadhar Card.";
            return (
                <div className="ag-step-card fade-in">
                    <div className="ag-step-header">
                        <div className="ag-step-circle">2</div>
                        <h2>Fill Basic Details</h2>
                        <button className="read-aloud-btn circle" onClick={() => handleReadAloud(stepText)} aria-label="Read step aloud">
                            <Volume2 size={24} />
                        </button>
                    </div>
                    <p className="ag-step-desc">{stepText}</p>
                    {/* Mock voice input simulation for form fields if they theoretically existed here */}
                    <div className="ag-input-mock">
                        <div className="input-group">
                            <label htmlFor="applicantName">{isCaregiver ? "Name of person you are helping" : "Applicant Name"}</label>
                            <div className="voice-input-wrapper">
                                <input id="applicantName" type="text" placeholder="e.g. Rahul Sharma" />
                                <button className="voice-btn" aria-label="Dictate name"><Mic size={20} aria-hidden="true" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (currentStep === 3) {
            const stepText = "Upload clear photos or PDFs of your necessary documents below.";
            return (
                <div className="ag-step-card fade-in">
                    <div className="ag-step-header">
                        <div className="ag-step-circle">3</div>
                        <h2>Upload Documents</h2>
                        <button className="read-aloud-btn circle" onClick={() => handleReadAloud(stepText)} aria-label="Read step aloud">
                            <Volume2 size={24} />
                        </button>
                    </div>
                    <p className="ag-step-desc">{stepText}</p>

                    {allUploaded && (
                        <div className="ag-success-banner">
                            <CheckCircle size={20} /> All documents uploaded successfully!
                        </div>
                    )}

                    <div className="ag-doc-list">
                        {[
                            { id: 'aadhaar', name: 'Aadhaar Card', desc: 'Front and back side' },
                            { id: 'certificate', name: 'Disability Certificate', desc: 'Issued by Govt. Hospital' },
                            { id: 'income', name: 'Income Proof', desc: 'Latest certificate' }
                        ].map(doc => (
                            <div key={doc.id} className="ag-doc-row">
                                <div className="ag-doc-info">
                                    <FileText size={24} className="doc-icon" />
                                    <div>
                                        <h4>{doc.name}</h4>
                                        <p>{doc.desc}</p>
                                    </div>
                                </div>

                                {documents[doc.id] ? (
                                    <div className="ag-doc-preview">
                                        <div className="preview-thumb">
                                            <CheckCircle size={24} color="#166534" />
                                            <span className="truncate">{documents[doc.id].name}</span>
                                        </div>
                                        <button className="remove-btn" onClick={() => removeDoc(doc.id)} aria-label={`Remove ${doc.name}`}>
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="ag-upload-actions">
                                        <button className="btn btn-outline small-btn" onClick={() => triggerUpload(doc.id)}>
                                            <Upload size={16} /> Upload
                                        </button>
                                        <button className="btn btn-outline small-btn" onClick={() => triggerUpload(doc.id)}>
                                            <Camera size={16} /> Camera
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                        accept="image/*,.pdf"
                        capture="environment"
                    />
                </div>
            );
        }

        if (currentStep === 4) {
            const stepText = "Review your application summary below. Ensure all uploaded documents are correct before submitting to the Government Portal.";
            return (
                <div className="ag-step-card fade-in">
                    <div className="ag-step-header">
                        <div className="ag-step-circle">4</div>
                        <h2>Final Review</h2>
                        <button className="read-aloud-btn circle" onClick={() => handleReadAloud(stepText)} aria-label="Read step aloud">
                            <Volume2 size={24} />
                        </button>
                    </div>
                    <p className="ag-step-desc">{stepText}</p>

                    <div className="ag-summary-card">
                        <h4>Application Summary</h4>
                        <div className="summary-item">
                            <span>Scheme:</span>
                            <strong>{MOCK_SCHEME_NAME}</strong>
                        </div>
                        <div className="summary-item">
                            <span>Applicant Name:</span>
                            <strong>{userName}</strong>
                        </div>
                        <div className="summary-item">
                            <span>Documents Ready:</span>
                            <strong>{Object.values(documents).filter(Boolean).length} / 3 Uploaded</strong>
                        </div>
                    </div>
                </div>
            );
        }

        if (currentStep === 5) {
            return (
                <div className="ag-success-screen fade-in">
                    <div className="success-anim">
                        <CheckCircle size={80} className="success-icon" />
                    </div>
                    <h2>Application Submitted!</h2>
                    <p>We'll notify you of updates directly on your dashboard.</p>

                    <div className="ref-card">
                        <p>Application Reference Number:</p>
                        <h3>SATH-2026-89X4</h3>
                    </div>

                    <button className="btn btn-primary btn-giant full-width" onClick={() => onNavigate('home')}>
                        Track this application
                    </button>
                </div>
            );
        }
    };

    if (currentStep === 5) {
        return (
            <div className="apply-guide-page">
                <div className="ag-container">
                    {renderCurrentStep()}
                </div>
            </div>
        );
    }

    return (
        <div className="apply-guide-page fade-in">
            <div className="ag-container">

                {/* Header */}
                <header className="ag-header">
                    <button className="icon-btn" onClick={onBack} aria-label="Go back to scheme">
                        <ArrowLeft size={28} />
                    </button>
                    <div className="ag-header-center">
                        <span className="scheme-subtitle">{MOCK_SCHEME_NAME}</span>
                        <h1>Application guide</h1>
                    </div>
                    <div style={{ width: 28 }} /> {/* spacer */}
                </header>

                {/* Progress Bar */}
                <div className="ag-progress-container">
                    <div className="ag-progress-text">Step {currentStep} of {totalSteps}</div>
                    <div className="ag-progress-bar">
                        <div className="ag-progress-fill" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
                    </div>
                </div>

                <main id="main-content" role="main" className="ag-main-content">
                    {renderCurrentStep()}
                </main>

                {/* Footer Actions */}
                <footer className={`ag-footer ${isSimplified ? 'simplified-layout' : ''}`}>
                    {currentStep === 4 ? (
                        <div className="ag-submit-actions">
                            <button className="btn btn-outline full-width" onClick={handleBack}>Save and continue later</button>
                            <button className="btn btn-primary full-width" onClick={handleNext}>Submit application</button>
                        </div>
                    ) : (
                        <div className="ag-nav-actions">
                            {currentStep > 1 && (
                                <button className="btn btn-outline" onClick={handleBack}>Back</button>
                            )}
                            <button className={`btn btn-primary ${isSimplified ? 'btn-giant' : ''}`} style={{ marginLeft: currentStep === 1 ? 'auto' : '0', flex: 1 }} onClick={handleNext}>
                                {currentStep === 3 ? "Next Step" : "Next"}
                            </button>
                        </div>
                    )}
                </footer>

            </div>
        </div>
    );
};

export default ApplyGuide;
