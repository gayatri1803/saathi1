import React, { useState, useEffect } from 'react';
import {
    BarChart3, Users, LayoutDashboard, Settings, FileText,
    Search, Plus, MoreVertical, Edit3, Trash2, ChevronRight, CheckCircle2
} from 'lucide-react';
import './AdminDashboard.css';

const MOCK_SCHEMES = [
    { id: 1, name: 'ADIP Scheme for Assistive Devices', category: 'Assistive Devices', state: 'All India', updated: '2026-03-20', status: 'Active' },
    { id: 2, name: 'Scholarship for Top Class Education', category: 'Education', state: 'All India', updated: '2026-03-18', status: 'Active' },
    { id: 3, name: 'State Disability Pension (MH)', category: 'Pension', state: 'Maharashtra', updated: '2026-02-15', status: 'Inactive' },
    { id: 4, name: 'Niramaya Health Insurance', category: 'Health', state: 'All India', updated: '2026-03-01', status: 'Active' }
];

const AdminDashboard = ({ onNavigate }) => {
    const [activeTab, setActiveTab] = useState('overview'); // overview, schemes, users, analytics, settings
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        document.title = "Admin Dashboard — Saathi";
    }, []);

    // MOCK DATA SETS
    const metrics = [
        { label: 'Total Schemes', value: '412', active: '+12 this month' },
        { label: 'Active Users', value: '84,592', active: '+5.2% growth' },
        { label: 'Applications', value: '1.2M', active: '14k this week' },
        { label: 'Approvals (Month)', value: '8,420', active: '72% success rate' }
    ];

    /* Sub-Renderers */
    const renderOverview = () => (
        <div className="admin-overview fade-in">
            <h2>Dashboard Overview</h2>

            <div className="metrics-grid">
                {metrics.map((m, i) => (
                    <div key={i} className="metric-card">
                        <h4>{m.label}</h4>
                        <h2>{m.value}</h2>
                        <span className="metric-sub text-teal">{m.active}</span>
                    </div>
                ))}
            </div>

            <div className="overview-split mt-4">
                <div className="card recent-activity">
                    <h3>Recent Applications</h3>
                    <ul className="activity-list">
                        <li><CheckCircle2 size={16} className="text-teal" /> Rahul S. applied for Education Scholarship <span>2 mins ago</span></li>
                        <li><CheckCircle2 size={16} className="text-teal" /> Priya M. approved for Assistive Devices <span>15 mins ago</span></li>
                        <li><CheckCircle2 size={16} className="text-teal" /> Amit K. updated disability certificate <span>1 hour ago</span></li>
                    </ul>
                </div>

                <div className="card system-health">
                    <h3>System Status</h3>
                    <div className="health-bar"><div className="fill" style={{ width: '99.9%' }}></div></div>
                    <p>Uptime: 99.9% • All API gateways operational</p>
                </div>
            </div>
        </div>
    );

    const renderSchemes = () => (
        <div className="admin-schemes fade-in">
            <div className="page-header">
                <h2>Manage Schemes</h2>
                <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                    <Plus size={18} /> Add new scheme
                </button>
            </div>

            <div className="table-controls">
                <div className="search-box">
                    <Search size={18} className="text-muted" />
                    <input type="text" placeholder="Search schemes by name or category..." />
                </div>
                <button className="btn btn-outline">Filter</button>
            </div>

            <div className="table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Scheme Name</th>
                            <th>Category</th>
                            <th>State</th>
                            <th>Last Updated</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MOCK_SCHEMES.map(s => (
                            <tr key={s.id}>
                                <td className="fw-600">{s.name}</td>
                                <td><span className="badge category">{s.category}</span></td>
                                <td>{s.state}</td>
                                <td className="text-muted">{s.updated}</td>
                                <td>
                                    <span className={`badge status ${s.status === 'Active' ? 'active' : 'inactive'}`}>
                                        {s.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="row-actions">
                                        <button className="icon-btn" aria-label="Edit"><Edit3 size={18} /></button>
                                        <button className="icon-btn text-red" aria-label="Delete"><Trash2 size={18} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderAnalytics = () => (
        <div className="admin-analytics fade-in">
            <h2>Platform Analytics</h2>

            <div className="charts-grid mt-3">
                {/* Mock Line Chart: Applications over time */}
                <div className="chart-card large">
                    <h3>Applications Over Time (Last 30 Days)</h3>
                    <div className="mock-chart line-chart">
                        <svg viewBox="0 0 500 150" className="chart-svg">
                            <polyline
                                fill="none"
                                stroke="var(--primary-teal)"
                                strokeWidth="4"
                                points="0,120 50,130 100,90 150,110 200,60 250,80 300,50 350,70 400,20 450,40 500,10"
                            />
                            <polyline
                                fill="rgba(29, 158, 117, 0.1)"
                                stroke="none"
                                points="0,150 0,120 50,130 100,90 150,110 200,60 250,80 300,50 350,70 400,20 450,40 500,10 500,150"
                            />
                        </svg>
                        <div className="chart-labels x-axis">
                            <span>Mar 1</span><span>Mar 10</span><span>Mar 20</span><span>Mar 30</span>
                        </div>
                    </div>
                </div>

                {/* Mock Bar Chart: Top Schemes */}
                <div className="chart-card">
                    <h3>Top Viewed Schemes</h3>
                    <div className="mock-chart bar-chart">
                        <div className="bar-row"><div className="bar-label">ADIP</div><div className="bar"><div className="fill" style={{ width: '90%' }}></div></div></div>
                        <div className="bar-row"><div className="bar-label">Education</div><div className="bar"><div className="fill" style={{ width: '75%' }}></div></div></div>
                        <div className="bar-row"><div className="bar-label">Niramaya</div><div className="bar"><div className="fill" style={{ width: '60%' }}></div></div></div>
                        <div className="bar-row"><div className="bar-label">Pension</div><div className="bar"><div className="fill" style={{ width: '45%' }}></div></div></div>
                        <div className="bar-row"><div className="bar-label">Housing</div><div className="bar"><div className="fill" style={{ width: '30%' }}></div></div></div>
                    </div>
                </div>

                {/* Mock Pie Chart & Heatmap block */}
                <div className="chart-card">
                    <h3>Users by Disability Type</h3>
                    <div className="mock-chart pie-chart-container">
                        <div className="pie-chart"></div>
                        <div className="pie-legend">
                            <div><span className="dot c1"></span> Locomotor (35%)</div>
                            <div><span className="dot c2"></span> Visual (25%)</div>
                            <div><span className="dot c3"></span> Hearing (20%)</div>
                            <div><span className="dot c4"></span> Cognitive (20%)</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );

    return (
        <div className="admin-layout">
            {/* SIDEBAR */}
            <aside className="admin-sidebar">
                <div className="sidebar-brand">
                    <div className="logo-circle">S</div>
                    <h2>Saathi Admin</h2>
                </div>

                <nav className="sidebar-nav">
                    <button className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
                        <LayoutDashboard size={20} /> Dashboard
                    </button>
                    <button className={`nav-link ${activeTab === 'schemes' ? 'active' : ''}`} onClick={() => setActiveTab('schemes')}>
                        <FileText size={20} /> Manage Schemes
                    </button>
                    <button className={`nav-link ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>
                        <Users size={20} /> Users
                    </button>
                    <button className={`nav-link ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => setActiveTab('analytics')}>
                        <BarChart3 size={20} /> Analytics
                    </button>
                    <button className={`nav-link ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
                        <Settings size={20} /> Settings
                    </button>
                </nav>

                <div className="sidebar-footer">
                    <button className="btn btn-outline full-width" onClick={() => onNavigate('landing')}>
                        Exit Admin
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main id="main-content" role="main" className="admin-main">
                <header className="admin-topbar">
                    <div className="user-profile">
                        <div className="avatar">A</div>
                        <span>Admin User</span>
                    </div>
                </header>

                <div className="admin-content-scroller">
                    {activeTab === 'overview' && renderOverview()}
                    {activeTab === 'schemes' && renderSchemes()}
                    {activeTab === 'analytics' && renderAnalytics()}
                    {(activeTab === 'users' || activeTab === 'settings') && (
                        <div className="admin-placeholder fade-in">
                            <Settings size={48} className="text-muted mb-3" />
                            <h2>Module Under Construction</h2>
                            <p>This module is currently being built in the next deployment cycle.</p>
                        </div>
                    )}
                </div>
            </main>

            {/* Add Scheme Modal Mock */}
            {showAddModal && (
                <div className="admin-modal-overlay fade-in">
                    <div className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="add-scheme-header">
                        <div className="modal-header">
                            <h2 id="add-scheme-header">Add New Scheme</h2>
                            <button className="icon-btn" autoFocus onClick={() => setShowAddModal(false)} aria-label="Close add scheme window">✕</button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Scheme Name</label>
                                <input type="text" placeholder="Enter official scheme name" />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Category</label>
                                    <select><option>Education</option><option>Health</option><option>Pension</option></select>
                                </div>
                                <div className="form-group">
                                    <label>State</label>
                                    <select><option>All India</option><option>Maharashtra</option></select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Eligibility Tags (Multiselect)</label>
                                <div className="tag-input-mock">
                                    <span className="tag">Visual Impairment ✕</span>
                                    <span className="tag">Income &lt; 8L ✕</span>
                                    <input type="text" placeholder="Add tag..." />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Required Documents</label>
                                <div className="doc-list-mock">
                                    <div className="doc-item">Aadhaar Card <Trash2 size={16} className="text-red" /></div>
                                    <div className="doc-item">UDID <Trash2 size={16} className="text-red" /></div>
                                    <button className="text-link mt-2"><Plus size={16} /> Add Document</button>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-outline" onClick={() => setShowAddModal(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={() => setShowAddModal(false)}>Save Scheme</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AdminDashboard;
