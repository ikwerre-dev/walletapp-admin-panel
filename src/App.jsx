// App.js
import { useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from './Dashboard';
import LoginPage from './Login';
import './App.css';
import Deposits from './Deposits';
import Withdraw from './Withdrawals';
import Logout from './Logout';
import Wallets from './Wallets';

const App = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    return (
        <>
            <Routes>
                <Route path="/" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
                <Route path="/login" element={<LoginPage />} />
                
                <Route path="/deposits" element={isLoggedIn ? <Deposits /> : <Navigate to="/login" />} />
                <Route path="/withdrawals" element={isLoggedIn ? <Withdraw /> : <Navigate to="/login" />} />
                <Route path="/wallets" element={isLoggedIn ? <Wallets /> : <Navigate to="/login" />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
        </>
    );
}

export default App;
