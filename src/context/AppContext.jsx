
import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, updateDoc, doc, query, orderBy, onSnapshot, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import emailjs from '@emailjs/browser';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [inquiries, setInquiries] = useState([]);
    const [services, setServices] = useState([]);
    const [adminProfile, setAdminProfile] = useState({
        name: 'Yugant V. Rahele',
        email: 'admin@fintaxvers.com',
        photo: '',
        phone: '+91 7057167045'
    });
    const [loading, setLoading] = useState(true);

    // Real-time listener for inquiries (only for authenticated admins)
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('fintxyug_auth') === 'true';
        if (!isAuthenticated) {
            setLoading(false);
            return;
        }

        const q = query(collection(db, "inquiries"), orderBy("date", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const loadedInquiries = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setInquiries(loadedInquiries);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching inquiries: ", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Real-time listener for services (for all users)
    useEffect(() => {
        const q = query(collection(db, "services"), orderBy("order", "asc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const loadedServices = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setServices(loadedServices);
        }, (error) => {
            console.error("Error fetching services: ", error);
        });

        return () => unsubscribe();
    }, []);

    // Real-time listener for admin profile
    useEffect(() => {
        const fetchAdminProfile = async () => {
            try {
                const adminDoc = await getDoc(doc(db, "settings", "adminProfile"));
                if (adminDoc.exists()) {
                    setAdminProfile(adminDoc.data());
                }
            } catch (error) {
                console.error("Error fetching admin profile: ", error);
            }
        };
        fetchAdminProfile();
    }, []);

    const addInquiry = async (inquiry) => {
        const newInquiry = {
            ...inquiry,
            status: 'Pending',
            date: new Date().toLocaleDateString(),
            timestamp: Date.now()
        };

        try {
            const docRef = await addDoc(collection(db, "inquiries"), newInquiry);
            setInquiries([{ id: docRef.id, ...newInquiry }, ...inquiries]);

            // Try sending email via EmailJS
            try {
                const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
                const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
                const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

                if (serviceId && templateId && publicKey && serviceId !== 'YOUR_SERVICE_ID') {
                    await emailjs.send(
                        serviceId,
                        templateId,
                        {
                            // Customer Details
                            to_name: newInquiry.name,
                            to_email: newInquiry.email,
                            
                            // Full Inquiry Details (for your Admin Notification Email)
                            admin_email: 'contact@fintaxvers.com',
                            from_name: newInquiry.name,
                            from_email: newInquiry.email,
                            mobile: newInquiry.mobile,
                            business_type: newInquiry.businessType || 'N/A',
                            inquiry_type: newInquiry.type,
                            message: newInquiry.message,
                            
                            reply_to: newInquiry.email
                        },
                        publicKey
                    );
                    console.log('Notification email sent successfully!');
                }
            } catch (emailError) {
                console.error('EmailJS error details:', {
                    status: emailError.status,
                    text: emailError.text,
                    message: emailError.message
                });
                // We don't fail the submission if email fails
            }

            return true;
        } catch (e) {
            console.error("Error adding document: ", e);
            alert("Error submitting form: " + e.message);
            return false;
        }
    };

    const updateInquiry = async (id, updates) => {
        try {
            const inquiryRef = doc(db, "inquiries", id);
            await updateDoc(inquiryRef, updates);
            setInquiries(inquiries.map(inv => inv.id === id ? { ...inv, ...updates } : inv));
            return true;
        } catch (e) {
            console.error("Error updating inquiry: ", e);
            return false;
        }
    };

    const updateInquiryStatus = async (id, status) => {
        return await updateInquiry(id, { status: status });
    };

    const deleteInquiry = async (id) => {
        try {
            await deleteDoc(doc(db, "inquiries", id));
            setInquiries(inquiries.filter(inv => inv.id !== id));
            return true;
        } catch (e) {
            console.error("Error deleting inquiry: ", e);
            return false;
        }
    };

    // Admin Profile Management
    const updateAdminProfile = async (updates) => {
        try {
            await setDoc(doc(db, "settings", "adminProfile"), updates, { merge: true });
            setAdminProfile(prev => ({ ...prev, ...updates }));
            return true;
        } catch (e) {
            console.error("Error updating admin profile: ", e);
            return false;
        }
    };

    // Services Management
    const addService = async (service) => {
        try {
            console.log('AppContext: Adding service to Firebase:', service);
            const newService = {
                ...service,
                order: services.length,
                createdAt: Date.now()
            };
            const docRef = await addDoc(collection(db, "services"), newService);
            console.log('AppContext: Service added successfully with ID:', docRef.id);
            return true;
        } catch (e) {
            console.error("Error adding service: ", e);
            console.error("Error code:", e.code);
            console.error("Error message:", e.message);
            return false;
        }
    };

    const updateService = async (id, updates) => {
        try {
            const serviceRef = doc(db, "services", id);
            await updateDoc(serviceRef, updates);
            return true;
        } catch (e) {
            console.error("Error updating service: ", e);
            return false;
        }
    };

    const deleteService = async (id) => {
        try {
            await deleteDoc(doc(db, "services", id));
            return true;
        } catch (e) {
            console.error("Error deleting service: ", e);
            return false;
        }
    };

    return (
        <AppContext.Provider value={{
            inquiries,
            addInquiry,
            updateInquiry,
            updateInquiryStatus,
            deleteInquiry,
            loading,
            services,
            addService,
            updateService,
            deleteService,
            adminProfile,
            updateAdminProfile
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);

