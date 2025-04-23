import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UsersTable() {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(20);
    const [searchQuery, setSearchQuery] = useState('');
    const [totalPages, setTotalPages] = useState(1);

    const fetchUsers = async (page = 1, recordsPerPage, searchQuery) => {
        try {
            const response = await axios.post(`${API_KEY}getAllUserDetails`, {
                page,
                recordsPerPage,
                searchQuery
            });
            setUsers(response.data.data);
            setTotalPages(response.data.total_pages || 1);
            setCurrentPage(response.data.current_page || 1);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUsers(currentPage, recordsPerPage, searchQuery);
    }, [currentPage, recordsPerPage, searchQuery]);

    const openModal = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedUser(null);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to first page when searching
    };

    const handleRecordsPerPageChange = (e) => {
        setRecordsPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page when changing records per page
    };

    return (
        <>
            <div className="flex justify-between mb-4">
                <input
                    type="text"
                    placeholder="Search users..."
                    className="border p-2"
                    value={searchQuery}
                    onChange={handleSearch}
                />
                <select
                    value={recordsPerPage}
                    onChange={handleRecordsPerPageChange}
                    className="border p-2"
                >
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </div>

            <table className="w-full">
                <thead>
                    <tr className="text-left text-gray-500 border-b">
                        <th className="pb-2 text-[12px] font-semibold">Name</th>
                        <th className="pb-2 text-[12px] font-semibold">Email</th>
                        <th className="pb-2 text-[12px] font-semibold">Phone</th>
                        <th className="pb-2 text-[12px] font-semibold">SSN</th>
                        <th className="pb-2 text-[12px] font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody style={{ fontFamily: "Manrope" }}>
                    {users && users.length > 0 ? (
                        users.map(user => (
                            <tr key={user.id} className="border-b last:border-b-0">
                                <td className="py-3 pr-4">{user.first_name} {user.last_name}</td>
                                <td className="py-3 pr-4">{user.email}</td>
                                <td className="py-3 pr-4">{user.phone}</td>
                                <td className="py-3 pr-4">{user.profile_picture ? user.profile_picture : '-'}</td>
                                <td className="py-3 pr-4">
                                    <button
                                        className="mt-4 bg-gray-800 text-white px-4 py-2 rounded"
                                        onClick={() => openModal(user)}
                                    >
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="py-3 text-center">No users found matching the search criteria.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-between mt-4">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="bg-gray-800 text-white px-4 py-2 rounded"
                >
                    Previous
                </button>
                <span>{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="bg-gray-800 text-white px-4 py-2 rounded"
                >
                    Next
                </button>
            </div>

            {showModal && selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-5 rounded-lg shadow-lg w-3/4">
                        <h2 className="text-xl font-semibold mb-4">Details for {selectedUser.first_name} {selectedUser.last_name}</h2>

                        {selectedUser.reset_token && (
                            <a
                                download={'ID.pdf'}
                                href={import.meta.env.VITE_API_KEY + '/' + selectedUser.reset_token} className="mt-4 bg-gray-800 text-white px-4 py-2 rounded" >Download ID</a>
                        )}
                        <h3 className="text-md mt-5 font-semibold">Deposits</h3>
                        <table className="w-full mb-4">
                            <thead>
                                <tr className="text-left text-gray-500 border-b">
                                    <th className="pb-2 text-[12px] font-semibold">Amount</th>
                                    <th className="pb-2 text-[12px] font-semibold">Date</th>
                                    <th className="pb-2 text-[12px] font-semibold">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedUser.deposits && selectedUser.deposits.length > 0 ? (
                                    selectedUser.deposits.map((deposit, index) => (
                                        <tr key={index} className="border-b last:border-b-0">
                                            <td className="py-3 pr-4">${deposit.amount}</td>
                                            <td className="py-3 pr-4">{new Date(deposit.created_at).toLocaleDateString()}</td>
                                            <td className="py-3 pr-4">{deposit.status === 1 ? 'Completed' : 'Pending'}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="py-3 text-center">No deposits available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <h3 className="text-md font-semibold">Referrals</h3>
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-gray-500 border-b">
                                    <th className="pb-2 text-[12px] font-semibold">Name</th>
                                    <th className="pb-2 text-[12px] font-semibold">Email</th>
                                    <th className="pb-2 text-[12px] font-semibold">Date Referred</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedUser.referrals && selectedUser.referrals.length > 0 ? (
                                    selectedUser.referrals.map((referral, index) => (
                                        <tr key={index} className="border-b last:border-b-0">
                                            <td className="py-3 pr-4">{referral.first_name} {referral.last_name}</td>
                                            <td className="py-3 pr-4">{referral.email}</td>
                                            <td className="py-3 pr-4">{new Date(referral.created_at).toLocaleDateString()}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="py-3 text-center">No referrals available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <button className="mt-4 bg-gray-800 text-white px-4 py-2 rounded" onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}        </>
    );
}

export default UsersTable;