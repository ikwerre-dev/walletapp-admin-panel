import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar/Sidebar';
import axios from 'axios';
import Modal from 'react-modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#root'); // Required for accessibility

function Wallets() {
    const [wallets, setWallets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [currentWallet, setCurrentWallet] = useState(null);
    const [newAddress, setNewAddress] = useState('');
    const [newInstruction, setNewInstruction] = useState('');

    // Fetch wallets
    const fetchWallets = async (page = 1, recordsPerPage = 10, searchQuery = '') => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_KEY}getAllWallets`, {});
            if (response.data.status === 1) {
                setWallets(response.data.data);
            } else {
                toast.error("Failed to fetch wallets");
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error("Error fetching Wallets");
            setLoading(false);
        }
    };

    // Open modal to edit wallet
    const openEditModal = (wallet) => {
        setCurrentWallet(wallet);
        setNewAddress(wallet.data);
        setNewInstruction(wallet.instruction);
        setEditModalIsOpen(true);
    };

    // Handle wallet address change
    const handleAddressChange = (e) => {
        setNewAddress(e.target.value);
    };

    // Handle instruction change
    const handleInstructionChange = (e) => {
        setNewInstruction(e.target.value);
    };

    // Submit wallet address and instruction change
    const handleSubmitEdit = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_KEY}editWalletById`, {
                id: currentWallet.id,
                data: newAddress,
                instruction: newInstruction
            });

            if (response.data.status === 1) {
                toast.success("Wallet updated successfully!");
                // Update local wallet data
                setWallets(wallets.map(wallet =>
                    wallet.id === currentWallet.id
                        ? { ...wallet, data: newAddress, instruction: newInstruction }
                        : wallet
                ));
                setEditModalIsOpen(false);
            } else {
                toast.error("Failed to update wallet1");
            }
        } catch (error) {
          console.log(error)
            toast.error("Error updating wallet2");
        }
    };

    useEffect(() => {
        fetchWallets();
    }, []);

    return (
        <div>
            <Sidebar />
            <div className="p-1 md:p-5 px-5 md:ml-64 mt-14 md:mt-1 bg-[#E5E5E]" style={{ fontFamily: "Manrope" }}>
                <ToastContainer />

                <div className="flex flex-col lg:flex-row">
                    <div className="md:w-[100%]">
                        <h1 className="text-2xl font-bold mb-4">Wallets</h1>

                        {/* Wallets Table */}
                        {loading ? (
                            <p className="text-gray-700">Loading wallets...</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-200">
                                    <thead>
                                        <tr className="bg-indigo-600 text-white">
                                            <th className="py-3 px-6 text-left font-semibold">ID</th>
                                            <th className="py-3 px-6 text-left font-semibold">Name</th>
                                            <th className="py-3 px-6 text-left font-semibold">Symbol</th>
                                            <th className="py-3 px-6 text-left font-semibold">Address</th>
                                            <th className="py-3 px-6 text-left font-semibold">Instruction</th>
                                            <th className="py-3 px-6 text-left font-semibold">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-700">
                                        {wallets.map(wallet => (
                                            <tr key={wallet.id} className="border-t border-gray-200 hover:bg-gray-100">
                                                <td className="py-3 px-6">{wallet.id}</td>
                                                <td className="py-3 px-6">{wallet.name}</td>
                                                <td className="py-3 px-6">{wallet.symbol}</td>
                                                <td className="py-3 px-6">{wallet.data}</td>
                                                <td className="py-3 px-6">{wallet.instruction}</td>
                                                <td className="py-3 px-6">
                                                    <button
                                                        className="bg-indigo-600 text-white py-1 px-3 rounded hover:bg-indigo-700"
                                                        onClick={() => openEditModal(wallet)}
                                                    >
                                                        Edit
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Modal for Editing Wallet */}
                        <Modal
                            isOpen={editModalIsOpen}
                            onRequestClose={() => setEditModalIsOpen(false)}
                            className="bg-white p-5 rounded shadow-md max-w-lg mx-auto mt-10"
                            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                        >
                            <h2 className="text-xl font-bold mb-4">Edit Wallet Address & Instruction</h2>
                            {currentWallet && (
                                <>
                                    <p className="mb-2">Editing wallet: <strong>{currentWallet.name}</strong></p>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 mb-2">Address</label>
                                        <input
                                            type="text"
                                            className="w-full border p-2 mb-4"
                                            value={newAddress}
                                            onChange={handleAddressChange}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 mb-2">Instruction</label>
                                        <input
                                            type="text"
                                            className="w-full border p-2"
                                            value={newInstruction}
                                            onChange={handleInstructionChange}
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
                                            onClick={handleSubmitEdit}
                                        >
                                            Save
                                        </button>
                                        <button
                                            className="bg-gray-400 text-white py-2 px-4 rounded ml-2 hover:bg-gray-500"
                                            onClick={() => setEditModalIsOpen(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </>
                            )}
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Wallets;
