import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Utility function for token verification
const verifyToken = async (token) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Token verification failed');
        }

        const data = await response.json();
        console.log('API response:', data);  // Log the response to verify the role
        return data.role === 'admin'; // Ensure the response has role: 'admin'
    } catch (error) {
        console.error('Error verifying token:', error);
        return false;
    }
};

const ProtectedAdmin = () => {
    const [admin, setAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            (async () => {
                const isValidAdmin = await verifyToken(token);
                console.log('Admin check result:', isValidAdmin); // Log the result
                setAdmin(isValidAdmin);
                setLoading(false);
            })();
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) return <div>Loading...</div>;

    console.log('Is Admin:', admin);
    return admin ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedAdmin;
