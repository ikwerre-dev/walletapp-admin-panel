import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DepositsComponent() {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const [deposits, setDeposits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(20);
    const [totalPages, setTotalPages] = useState(1);

    const fetchDeposits = async (page = 1, recordsPerPage, searchQuery) => {
        try {
            const response = await axios.post(`${API_KEY}getAllDeposits`, {
                page,
                recordsPerPage,
                searchQuery
            });
            setDeposits(response.data.data);
            setTotalPages(response.data.total_pages || 1);
            setCurrentPage(response.data.current_page || 1);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching deposits:", error);
        }
    };

    useEffect(() => {
        fetchDeposits(currentPage, recordsPerPage, searchQuery);
    }, [currentPage, recordsPerPage, searchQuery]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to first page when searching
    };

    const handleRecordsPerPageChange = (e) => {
        setRecordsPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page when changing records per page
    };

    const updateDepositStatus = async (depositId, status) => {
        try {
            await axios.post(`${API_KEY}updateDepositStatus`, {
                id: depositId,
                status
            });
            // Re-fetch deposits after the update
            fetchDeposits(currentPage, recordsPerPage, searchQuery);
        } catch (error) {
            console.error("Error updating deposit status:", error);
        }
    };

    return (
        <div>
            <div className="flex justify-between mb-4">
                <input
                    type="text"
                    placeholder="Search deposits..."
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

            {loading ? (
                <p>Loading deposits...</p>
            ) : (
                <table className="w-full">
                    <thead>
                        <tr className="text-left text-gray-500 border-b">
                            <th className="pb-2 text-[12px] font-semibold">Email</th>
                            <th className="pb-2 text-[12px] font-semibold">Package</th>
                            <th className="pb-2 text-[12px] font-semibold">Amount</th>
                            <th className="pb-2 text-[12px] font-semibold">Status</th>
                            <th className="pb-2 text-[12px] font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody style={{ fontFamily: "Manrope" }}>
                        {deposits.length > 0 ? (
                            deposits.map(deposit => (
                                <tr key={deposit.id} className="border-b last:border-b-0">
                                    <td className="py-3 pr-4">{deposit.user_email}</td>
                                    <td className="py-3 pr-4">{deposit.package_name}</td>
                                    <td className="py-3 pr-4">${deposit.amount}</td>
                                    <td className="py-3 pr-4">{deposit.status === 1 ? "Completed" : "Pending"}</td>
                                    <td className="py-3 pr-4">
                                        <select
                                            defaultValue={deposit.status}
                                            onChange={(e) => updateDepositStatus(deposit.id, e.target.value)}
                                            className="border p-2"
                                        >
                                            <option value={1}>Completed</option>
                                            <option value={0}>Pending</option>
                                        </select>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="py-3 text-center">No deposits found matching the search criteria.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}

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
        </div>
    );
}

export default DepositsComponent;
