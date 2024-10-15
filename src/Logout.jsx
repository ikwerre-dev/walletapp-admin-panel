// Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear the logged-in state
        localStorage.removeItem('isLoggedIn');
        // Redirect to the login page
        // navigate('/login');
        document.location = '/'

    }, [navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-2xl font-semibold">Logging out...</h2>
        </div>
    );
};

export default Logout;
