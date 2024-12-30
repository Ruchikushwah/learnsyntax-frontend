import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const fetchAdminData = async (token) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/user', {
            method: 'GET', // Or 'POST' depending on your API
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch admin data');
        }
        
        const data = await response.json();
        console.log('Admin Data:', data);

        // Check if the user is an admin
        return data.role && data.role.toLowerCase() === 'admin' ? data : null;
    } catch (error) {
        console.error('Error fetching admin data:', error);
        return null;
    }
};

const ProtectedAdmin = () => {
    const [adminData, setAdminData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            (async () => {
                const admin = await fetchAdminData(token);
                setAdminData(admin);
                setLoading(false);
            })();
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) return <div>Loading...</div>;

    return adminData ? <Outlet context={adminData} /> : <Navigate to="/" />;
};

export default ProtectedAdmin;
