import React, { useEffect } from 'react';
import { Shield, Keyboard, Monitor, Eye, HelpCircle } from 'lucide-react';
import './AccessibilityHelp.css';

const AccessibilityHelp = ({ onBack }) => {

    useEffect(() => {
        document.title = "Accessibility Help and Keyboard Shortcuts — Saathi";
    }, []);

    return (
        <div className="a11y-help-page fade-in">
            <header className="a11y-help-header">
                <button className="btn btn-outline small-btn" onClick={onBack} aria-label="Go back">Back</button>
                <h1>Accessibility Help & Instructions</h1>
            </header>

            <main id="main-content" role="main" className="a11y-help-main">

                <section className="a11y-card">
                    <div className="card-header">
                        <Monitor size={24} className="text-teal" />
                        <h2>Screen Reader Compatibility</h2>
                    </div>
                    <p>This website is designed and tested to work natively with the <strong>NVDA Screen Reader</strong>.</p>
                    <ul>
                        <li><a href="https://www.nvaccess.org/" target="_blank" rel="noreferrer">Free download for NVDA (Windows)</a></li>
                        <li>Works natively with <strong>VoiceOver</strong> on Mac and iPhone devices.</li>
                        <li>Works natively with <strong>TalkBack</strong> on Android devices.</li>
                    </ul>
                </section>

                <section className="a11y-card">
                    <div className="card-header">
                        <Keyboard size={24} className="text-teal" />
                        <h2>Keyboard Shortcuts</h2>
                    </div>
                    <p>You can navigate the entire platform using just your keyboard. Below are the basic commands if using NVDA:</p>
                    <table className="shortcuts-table">
                        <thead>
                            <tr>
                                <th scope="col">Command / Key</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><kbd>Tab</kbd></td>
                                <td>Moves to the next interactive element (button, link, form field).</td>
                            </tr>
                            <tr>
                                <td><kbd>Shift</kbd> + <kbd>Tab</kbd></td>
                                <td>Moves to the previous interactive element.</td>
                            </tr>
                            <tr>
                                <td><kbd>Enter</kbd></td>
                                <td>Activates buttons and follows links.</td>
                            </tr>
                            <tr>
                                <td><kbd>Space</kbd></td>
                                <td>Toggles checkboxes, dropdowns, and buttons.</td>
                            </tr>
                            <tr>
                                <td><kbd>Esc</kbd></td>
                                <td>Closes any open modals, dropdowns, or the Chatbot panel.</td>
                            </tr>
                            <tr>
                                <td><kbd>H</kbd></td>
                                <td>Jumps immediately between major Headings on the page.</td>
                            </tr>
                            <tr>
                                <td><kbd>F</kbd></td>
                                <td>Jumps immediately to the nearest Form field.</td>
                            </tr>
                            <tr>
                                <td><kbd>B</kbd></td>
                                <td>Jumps immediately to the nearest Button.</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <section className="a11y-card">
                    <div className="card-header">
                        <Eye size={24} className="text-teal" />
                        <h2>Layout Modes Explained</h2>
                    </div>
                    <p>Saathi supports three primary structural layout modes accessible from the bottom right Accessibility control panel:</p>
                    <ol>
                        <li><strong>Standard:</strong> The default visual experience optimized for modern devices.</li>
                        <li><strong>Simplified:</strong> Designed for cognitive ease and motor impairments. Keyboard text inputs are removed in favor of giant Voice Dictation buttons. Options are drastically reduced to prevent overwhelm.</li>
                        <li><strong>Screen Reader:</strong> Strips down visual layout structures ensuring pure linear HTML rendering optimized precisely for NVDA parsing.</li>
                    </ol>
                </section>

                <section className="a11y-card contact-card">
                    <div className="card-header">
                        <HelpCircle size={24} className="text-teal" />
                        <h2>Need more help?</h2>
                    </div>
                    <p>If you encounter any accessibility issues, bugs, or require further assistance, please contact our support team:</p>
                    <p><strong>Email:</strong> <a href="mailto:accessibility@saathi.gov.in">accessibility@saathi.gov.in</a></p>
                </section>
            </main>
        </div>
    );
};

export default AccessibilityHelp;
