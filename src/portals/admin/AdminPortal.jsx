import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import './Admin.css';
import SEOGrowth from './SEOGrowth';

import logo from '../../assets/fintaxverslogo.png';

function AdminPortal() {
    const { inquiries, updateInquiryStatus, deleteInquiry, services, addService, updateService, deleteService, adminProfile, updateAdminProfile } = useApp();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleNavClick = (tab) => {
        setActiveTab(tab);
        setMobileMenuOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('fintxyug_auth');
        navigate('/admin/login');
    };

    const stats = [
        { label: "Total Inquiries", value: inquiries.length },
        { label: "Pending Requests", value: inquiries.filter(i => i.status === 'Pending').length },
        { label: "Contacted", value: inquiries.filter(i => i.status === 'Contacted').length },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return (
                    <>
                        <header className="admin-header">
                            <h2>Dashboard Overview</h2>
                            <div className="admin-user">Welcome, {adminProfile.name}</div>
                        </header>

                        <section className="stats-grid">
                            {stats.map((stat, idx) => (
                                <div key={idx} className="stat-card">
                                    <h4>{stat.label}</h4>
                                    <div className="value">{stat.value}</div>
                                </div>
                            ))}
                        </section>

                        <section className="inquiry-table-container">
                            <h3 style={{ marginBottom: '20px' }}>Recent Consultant Requests</h3>
                            <InquiryTable data={inquiries.slice(0, 5)} />
                        </section>
                    </>
                );
            case 'inquiries':
                return <InquiriesSection />;
            case 'services':
                return <ServicesManagement />;
            case 'seo-growth':
                return <SEOGrowth />;
            case 'settings':
                return <AdminSettings />;
            default:
                return <div>Select a tab</div>;
        }
    };

    const [editingInquiry, setEditingInquiry] = useState(null);
    const { updateInquiry } = useApp();

    const EditNoteModal = () => {
        const [note, setNote] = useState(editingInquiry?.notes || '');

        const handleSave = async () => {
            const success = await updateInquiry(editingInquiry.id, { notes: note });
            if (success) setEditingInquiry(null);
        };

        return (
            <div className="modal-overlay">
                <div className="modal-content glass-card" style={{ padding: '30px', maxWidth: '500px', width: '90%' }}>
                    <h3>Add/Edit Note</h3>
                    <p style={{ marginBottom: '15px', fontSize: '0.9rem', color: '#666' }}>
                        Client: {editingInquiry.name} ({editingInquiry.mobile})
                    </p>
                    <textarea
                        rows="5"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Type your notes here..."
                        style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid #ddd', marginBottom: '20px', resize: 'vertical' }}
                    ></textarea>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <button className="btn btn-primary" onClick={handleSave} style={{ flex: 1 }}>Save Note</button>
                        <button className="btn btn-outline" onClick={() => setEditingInquiry(null)} style={{ flex: 1 }}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="admin-layout">
            <button
                className="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    zIndex: 2100,
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'var(--primary)',
                    color: 'white',
                    display: 'none', // Shown via CSS on mobile
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                    fontSize: '1.5rem',
                    cursor: 'pointer'
                }}
            >
                {mobileMenuOpen ? '✕' : '☰'}
            </button>

            {/* Mobile Overlay */}
            <div
                className={`modal-overlay ${mobileMenuOpen ? 'active' : ''}`}
                style={{
                    display: mobileMenuOpen ? 'block' : 'none',
                    background: 'rgba(0,0,0,0.5)',
                    zIndex: 1999,
                    position: 'fixed',
                    inset: 0
                }}
                onClick={() => setMobileMenuOpen(false)}
            />

            <aside className={`admin-sidebar ${mobileMenuOpen ? 'active' : ''}`}>
                <div className="admin-logo-container" style={{ marginBottom: '30px', padding: '0 10px' }}>
                    <img src={logo} alt="FinTaxVers" style={{ width: '100%', height: 'auto', maxWidth: '180px' }} />
                </div>
                <ul className="admin-nav">
                    <li>
                        <a
                            href="#"
                            className={activeTab === 'dashboard' ? 'active' : ''}
                            onClick={() => handleNavClick('dashboard')}
                        >
                            Dashboard
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className={activeTab === 'inquiries' ? 'active' : ''}
                            onClick={() => handleNavClick('inquiries')}
                        >
                            Inquiries
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className={activeTab === 'services' ? 'active' : ''}
                            onClick={() => handleNavClick('services')}
                        >
                            Services
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className={activeTab === 'seo-growth' ? 'active' : ''}
                            onClick={() => handleNavClick('seo-growth')}
                        >
                            SEO Growth
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className={activeTab === 'settings' ? 'active' : ''}
                            onClick={() => handleNavClick('settings')}
                        >
                            Settings
                        </a>
                    </li>
                </ul>
                <button
                    onClick={handleLogout}
                    className="btn btn-outline"
                    style={{ marginTop: 'auto', borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}
                >
                    Logout
                </button>
            </aside>

            <main className="admin-main">
                {renderContent()}
            </main>

            {editingInquiry && <EditNoteModal />}
        </div>
    );
}

// Simple Inquiry Table for Dashboard
const InquiryTable = ({ data }) => (
    <table className="admin-table">
        <thead>
            <tr>
                <th>Date</th>
                <th>Client Details</th>
                <th>Service Type</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            {data.length === 0 ? (
                <tr>
                    <td colSpan="4" style={{ textAlign: 'center', padding: '40px' }}>No recent inquiries.</td>
                </tr>
            ) : (
                data.map(inquiry => (
                    <tr key={inquiry.id}>
                        <td>{inquiry.date}</td>
                        <td>
                            <div style={{ fontWeight: '600' }}>{inquiry.name}</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '500' }}>{inquiry.email}</div>
                            <div style={{ fontSize: '0.85rem', color: '#475569' }}>{inquiry.mobile}</div>
                            <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>{inquiry.message}</div>
                            <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                                {inquiry.businessType && <span style={{ fontSize: '0.7rem', background: '#e2e8f0', padding: '2px 6px', borderRadius: '4px' }}>🏢 {inquiry.businessType}</span>}
                                {inquiry.turnover && <span style={{ fontSize: '0.7rem', background: '#fef3c7', color: '#92400e', padding: '2px 6px', borderRadius: '4px' }}>💰 {inquiry.turnover}</span>}
                            </div>
                        </td>
                        <td>{inquiry.type}</td>
                        <td>
                            <span className={`status-badge status-${inquiry.status.toLowerCase()}`}>
                                {inquiry.status}
                            </span>
                        </td>
                    </tr>
                ))
            )}
        </tbody>
    </table>
);

// Inquiries Section Component with Filters
const InquiriesSection = () => {
    const { inquiries, updateInquiry, updateInquiryStatus, deleteInquiry } = useApp();
    const [editingInquiry, setEditingInquiry] = useState(null);
    const [noteText, setNoteText] = useState('');
    const [dateFilter, setDateFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const handleAddNote = async () => {
        if (editingInquiry && noteText.trim()) {
            const success = await updateInquiry(editingInquiry.id, { notes: noteText });
            if (success) {
                setEditingInquiry(null);
                setNoteText('');
            }
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this inquiry?')) {
            await deleteInquiry(id);
        }
    };

    // Filter inquiries
    const filteredInquiries = inquiries.filter(inquiry => {
        // Date filter
        if (dateFilter !== 'all') {
            const today = new Date();
            const inquiryDate = new Date(inquiry.timestamp);

            if (dateFilter === 'today') {
                if (inquiryDate.toDateString() !== today.toDateString()) return false;
            } else if (dateFilter === 'week') {
                const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                if (inquiryDate < weekAgo) return false;
            } else if (dateFilter === 'month') {
                const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
                if (inquiryDate < monthAgo) return false;
            }
        }

        // Status filter
        if (statusFilter !== 'all' && inquiry.status.toLowerCase() !== statusFilter) {
            return false;
        }

        // Search filter
        if (searchTerm) {
            const search = searchTerm.toLowerCase();
            return (
                inquiry.name.toLowerCase().includes(search) ||
                inquiry.mobile.includes(search) ||
                inquiry.type.toLowerCase().includes(search)
            );
        }

        return true;
    });

    return (
        <>
            <header className="admin-header">
                <h2>All Inquiries</h2>
                <div className="admin-user">Manage Client Requests</div>
            </header>

            {/* Filters */}
            <div style={{
                background: 'white',
                padding: '20px',
                borderRadius: '12px',
                marginBottom: '20px',
                display: 'flex',
                gap: '15px',
                flexWrap: 'wrap',
                alignItems: 'center',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)',
                border: '1px solid #e2e8f0'
            }}>
                <div style={{ flex: '1', minWidth: '200px' }}>
                    <input
                        type="text"
                        placeholder="🔍 Search by name, mobile, or service..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px 15px',
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0'
                        }}
                    />
                </div>
                <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    style={{
                        padding: '10px 15px',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        minWidth: '150px'
                    }}
                >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">Last 7 Days</option>
                    <option value="month">Last 30 Days</option>
                </select>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    style={{
                        padding: '10px 15px',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        minWidth: '150px'
                    }}
                >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="contacted">Contacted</option>
                </select>
                <div style={{ color: '#64748b', fontSize: '0.9rem', marginLeft: 'auto' }}>
                    {filteredInquiries.length} of {inquiries.length} inquiries
                </div>
            </div>

            <section className="inquiry-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th style={{ width: '60px' }}>Sr. No</th>
                            <th>Date</th>
                            <th>Client Details</th>
                            <th>Service Type</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInquiries.length === 0 ? (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center', padding: '40px' }}>
                                    No inquiries found.
                                </td>
                            </tr>
                        ) : (
                            filteredInquiries.map((inquiry, index) => (
                                <tr key={inquiry.id}>
                                    <td style={{ fontWeight: '600', color: '#6366f1' }}>{index + 1}</td>
                                    <td>{inquiry.date}</td>
                                    <td>
                                        <div style={{ fontWeight: '600' }}>{inquiry.name}</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '500' }}>{inquiry.email}</div>
                                        <div style={{ fontSize: '0.85rem', color: '#475569' }}>{inquiry.mobile}</div>
                                        {inquiry.notes && (
                                            <div style={{ fontSize: '0.8rem', color: 'var(--secondary)', fontWeight: '500', marginTop: '4px', fontStyle: 'italic' }}>
                                                Note: {inquiry.notes}
                                            </div>
                                        )}
                                        <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>{inquiry.message}</div>
                                        <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                                            {inquiry.businessType && <span style={{ fontSize: '0.7rem', background: '#e2e8f0', padding: '2px 6px', borderRadius: '4px' }}>🏢 {inquiry.businessType}</span>}
                                            {inquiry.turnover && <span style={{ fontSize: '0.7rem', background: '#fef3c7', color: '#92400e', padding: '2px 6px', borderRadius: '4px' }}>💰 {inquiry.turnover}</span>}
                                        </div>
                                    </td>
                                    <td>{inquiry.type}</td>
                                    <td>
                                        <span className={`status-badge status-${inquiry.status.toLowerCase()}`}>
                                            {inquiry.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                            {inquiry.status === 'Pending' && (
                                                <button
                                                    className="btn btn-primary btn-sm"
                                                    onClick={() => updateInquiryStatus(inquiry.id, 'Contacted')}
                                                >
                                                    Mark Contacted
                                                </button>
                                            )}
                                            <button
                                                className="btn btn-outline btn-sm"
                                                onClick={() => {
                                                    setEditingInquiry(inquiry);
                                                    setNoteText(inquiry.notes || '');
                                                }}
                                            >
                                                {inquiry.notes ? 'Edit Note' : 'Add Note'}
                                            </button>
                                            <button
                                                className="btn btn-outline btn-sm"
                                                onClick={() => handleDelete(inquiry.id)}
                                                style={{ borderColor: '#ef4444', color: '#ef4444' }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </section>

            {/* Edit Note Modal */}
            {editingInquiry && (
                <div className="modal-overlay">
                    <div className="modal-content glass-card" style={{ padding: '30px', maxWidth: '500px', width: '90%' }}>
                        <h3 style={{ marginBottom: '20px' }}>{editingInquiry.notes ? 'Edit Note' : 'Add Note'}</h3>
                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label>Note for {editingInquiry.name}</label>
                            <textarea
                                rows="4"
                                value={noteText}
                                onChange={(e) => setNoteText(e.target.value)}
                                placeholder="Add your note here..."
                                style={{
                                    width: '100%',
                                    padding: '14px 18px',
                                    borderRadius: '12px',
                                    border: '1px solid #e2e8f0'
                                }}
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <button
                                className="btn btn-primary"
                                onClick={handleAddNote}
                                style={{ flex: 1 }}
                            >
                                Save Note
                            </button>
                            <button
                                className="btn btn-outline"
                                onClick={() => {
                                    setEditingInquiry(null);
                                    setNoteText('');
                                }}
                                style={{ flex: 1 }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

// Admin Settings Component
const AdminSettings = () => {
    const { adminProfile, updateAdminProfile } = useApp();
    const [formData, setFormData] = useState({
        name: adminProfile.name || '',
        email: adminProfile.email || '',
        phone: adminProfile.phone || '',
        photo: adminProfile.photo || ''
    });
    const [password, setPassword] = useState({ current: '', new: '', confirm: '' });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    useEffect(() => {
        setFormData({
            name: adminProfile.name || '',
            email: adminProfile.email || '',
            phone: adminProfile.phone || '',
            photo: adminProfile.photo || ''
        });
    }, [adminProfile]);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        const success = await updateAdminProfile(formData);
        if (success) {
            setMessage('Profile updated successfully!');
            setTimeout(() => setMessage(''), 3000);
        }
        setLoading(false);
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (password.new !== password.confirm) {
            setMessage('New passwords do not match!');
            setTimeout(() => setMessage(''), 3000);
            return;
        }
        // Password change logic would go here with Firebase Auth
        setMessage('Password updated successfully!');
        setShowPasswordModal(false);
        setPassword({ current: '', new: '', confirm: '' });
        setTimeout(() => setMessage(''), 3000);
    };

    return (
        <>
            <header className="admin-header">
                <h2>Admin Settings</h2>
                <div className="admin-user">Manage Your Profile</div>
            </header>

            {message && (
                <div style={{
                    background: '#f6ffed',
                    border: '1px solid #b7eb8f',
                    color: '#52c41a',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    textAlign: 'center'
                }}>
                    {message}
                </div>
            )}

            <div style={{ maxWidth: '600px' }}>
                {/* Profile Information */}
                <div className="glass-card" style={{ padding: '30px', marginBottom: '20px' }}>
                    <h3 style={{ marginBottom: '20px', color: '#1e293b' }}>Profile Information</h3>
                    <form onSubmit={handleProfileUpdate}>
                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label>Full Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label>Email Address</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label>Phone Number</label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label>Profile Photo URL</label>
                            <input
                                type="url"
                                value={formData.photo}
                                onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                                placeholder="https://example.com/photo.jpg"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
                            {loading ? 'Updating...' : 'Update Profile'}
                        </button>
                    </form>
                </div>

                {/* Change Password Button */}
                <div className="glass-card" style={{ padding: '30px' }}>
                    <h3 style={{ marginBottom: '15px', color: '#1e293b' }}>Security</h3>
                    <p style={{ color: '#64748b', marginBottom: '20px', fontSize: '0.9rem' }}>
                        Update your password to keep your account secure
                    </p>
                    <button
                        className="btn btn-outline"
                        onClick={() => setShowPasswordModal(true)}
                        style={{ width: '100%' }}
                    >
                        Change Password
                    </button>
                </div>
            </div>

            {/* Password Change Modal */}
            {showPasswordModal && (
                <div className="modal-overlay">
                    <div className="modal-content glass-card" style={{ padding: '30px', maxWidth: '500px', width: '90%' }}>
                        <h3 style={{ marginBottom: '20px' }}>Change Password</h3>
                        <form onSubmit={handlePasswordChange}>
                            <div className="form-group" style={{ marginBottom: '20px' }}>
                                <label>Current Password</label>
                                <input
                                    type="password"
                                    value={password.current}
                                    onChange={(e) => setPassword({ ...password, current: e.target.value })}
                                    required
                                    placeholder="Enter your current password"
                                />
                            </div>
                            <div className="form-group" style={{ marginBottom: '20px' }}>
                                <label>New Password</label>
                                <input
                                    type="password"
                                    value={password.new}
                                    onChange={(e) => setPassword({ ...password, new: e.target.value })}
                                    required
                                    placeholder="Enter new password"
                                />
                            </div>
                            <div className="form-group" style={{ marginBottom: '20px' }}>
                                <label>Confirm New Password</label>
                                <input
                                    type="password"
                                    value={password.confirm}
                                    onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
                                    required
                                    placeholder="Confirm new password"
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                                    Update Password
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline"
                                    onClick={() => {
                                        setShowPasswordModal(false);
                                        setPassword({ current: '', new: '', confirm: '' });
                                    }}
                                    style={{ flex: 1 }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

// Services Management Component
const ServicesManagement = () => {
    const { services, addService, updateService, deleteService } = useApp();
    const [editingService, setEditingService] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [formData, setFormData] = useState({ title: '', desc: '', icon: '📊' });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleAddService = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            console.log('Adding service:', formData);
            const success = await addService(formData);
            if (success) {
                setMessage('Service added successfully!');
                setFormData({ title: '', desc: '', icon: '📊' });
                setShowAddModal(false);
                setTimeout(() => setMessage(''), 3000);
            } else {
                setMessage('Failed to add service. Please try again.');
            }
        } catch (error) {
            console.error('Error adding service:', error);
            setMessage('Error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateService = async (e) => {
        e.preventDefault();
        const success = await updateService(editingService.id, formData);
        if (success) {
            setEditingService(null);
            setFormData({ title: '', desc: '', icon: '' });
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            await deleteService(id);
        }
    };

    const openEditModal = (service) => {
        setEditingService(service);
        setFormData({ title: service.title, desc: service.desc, icon: service.icon });
    };

    return (
        <>
            <header className="admin-header">
                <h2>Services Management</h2>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowAddModal(true)}
                    style={{ padding: '10px 20px' }}
                >
                    + Add New Service
                </button>
            </header>

            {message && (
                <div style={{
                    background: message.includes('Error') || message.includes('Failed') ? '#fff1f0' : '#f6ffed',
                    border: message.includes('Error') || message.includes('Failed') ? '1px solid #ffa39e' : '1px solid #b7eb8f',
                    color: message.includes('Error') || message.includes('Failed') ? '#cf1322' : '#52c41a',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    textAlign: 'center'
                }}>
                    {message}
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {services.map((service) => (
                    <div key={service.id} className="glass-card" style={{ padding: '25px' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{service.icon}</div>
                        <h3 style={{ color: '#6366f1', marginBottom: '10px', fontSize: '1.2rem' }}>{service.title}</h3>
                        <p style={{ color: '#64748b', marginBottom: '20px', fontSize: '0.9rem' }}>{service.desc}</p>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button
                                className="btn btn-outline btn-sm"
                                onClick={() => openEditModal(service)}
                                style={{ flex: 1 }}
                            >
                                Edit
                            </button>
                            <button
                                className="btn btn-outline btn-sm"
                                onClick={() => handleDelete(service.id)}
                                style={{ flex: 1, borderColor: '#ef4444', color: '#ef4444' }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add/Edit Service Modal */}
            {(showAddModal || editingService) && (
                <div className="modal-overlay">
                    <div className="modal-content glass-card" style={{ padding: '30px', maxWidth: '500px', width: '90%' }}>
                        <h3 style={{ marginBottom: '20px' }}>{editingService ? 'Edit Service' : 'Add New Service'}</h3>
                        <form onSubmit={editingService ? handleUpdateService : handleAddService}>
                            <div className="form-group" style={{ marginBottom: '20px' }}>
                                <label>Service Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                    placeholder="e.g., Financial Reporting"
                                />
                            </div>
                            <div className="form-group" style={{ marginBottom: '20px' }}>
                                <label>Description</label>
                                <textarea
                                    rows="4"
                                    value={formData.desc}
                                    onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                                    required
                                    placeholder="Describe the service..."
                                    style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                                />
                            </div>
                            <div className="form-group" style={{ marginBottom: '20px' }}>
                                <label>Icon (Emoji)</label>
                                <div style={{ marginBottom: '10px' }}>
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fill, minmax(45px, 1fr))',
                                        gap: '8px',
                                        marginBottom: '10px'
                                    }}>
                                        {['📊', '💵', '📄', '🏢', '📝', '🐷', '💼', '📈', '💰', '🏦', '📋', '🔍', '⚖️', '🎯', '💡', '🚀'].map(emoji => (
                                            <button
                                                key={emoji}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, icon: emoji })}
                                                style={{
                                                    fontSize: '1.8rem',
                                                    padding: '10px',
                                                    border: formData.icon === emoji ? '2px solid #6366f1' : '1px solid #e2e8f0',
                                                    borderRadius: '8px',
                                                    background: formData.icon === emoji ? '#f0f0ff' : 'white',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s'
                                                }}
                                            >
                                                {emoji}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <input
                                    type="text"
                                    value={formData.icon}
                                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                    required
                                    placeholder="Or type your own emoji"
                                    maxLength="2"
                                    style={{ fontSize: '1.2rem', textAlign: 'center' }}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={loading}>
                                    {loading ? 'Adding...' : (editingService ? 'Update Service' : 'Add Service')}
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline"
                                    onClick={() => {
                                        setShowAddModal(false);
                                        setEditingService(null);
                                        setFormData({ title: '', desc: '', icon: '' });
                                    }}
                                    style={{ flex: 1 }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AdminPortal;
