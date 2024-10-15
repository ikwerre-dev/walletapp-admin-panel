import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '/logo.png';
import { Ticket } from 'lucide-react';

function Sidebar() {
    const [sideBar, setSideBar] = useState("-translate-x-full");
    const location = useLocation(); // Get current route location

    const handleSideBar = () => {
        setSideBar(sideBar === '-translate-x-full' ? '' : '-translate-x-full');
    };

    // Function to check if the current link is active
    const isActive = (path) => location.pathname === path ? 'bg-[#66774f] text-white' : 'text-[#808080] hover:text-white';

    return (
        <div className="">
            <div className="">
                <nav className="fixed top-0 z-50 w-full md:w-[256px] bg-[#222] md:bg-[#222] border-gray-200">
                    <div className="px-3 py-3 lg:px-5 lg:pl-3 md:bg-[#222] md:mt-10">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center justify-start rtl:justify-end">
                                <button
                                    data-drawer-target="logo-sidebar"
                                    data-drawer-toggle="logo-sidebar"
                                    aria-controls="logo-sidebar"
                                    onClick={handleSideBar}
                                    type="button"
                                    className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-400 hover:bg-[#B4CD93]"
                                >
                                    <span className="sr-only">Open sidebar</span>
                                    <svg
                                        className="w-6 h-6"
                                        aria-hidden="true"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            clipRule="evenodd"
                                            fillRule="evenodd"
                                            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                        />
                                    </svg>
                                </button>
                                <a href="/" className="flex ms-2 font-bold text-lg text-white ">
                                    Admin Panel
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>
                <aside
                    id="logo-sidebar"
                    className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 mt-16 transition-transform ${sideBar} border-gray-200 sm:translate-x-0 bg-[#222]`}
                    aria-label="Sidebar"
                >
                    <div className="h-full px-3 pb-4 overflow-y-auto grid gap-10 bg-[#222]">
                        <ul className="space-y-2 font-medium">
                            <li className={`  ${isActive('/')}`}>
                                <Link to="/" className="flex items-center p-2 text-gray-900 rounded-lg text-white hover:bg-[#66774f] group">
                                    <Ticket color="white" />
                                    <span className="flex-1 ms-3 whitespace-nowrap text-[16px]">Dashboard</span>
                                </Link>
                            </li>
                            <li className={`${isActive('/deposits')}`}>
                                <Link
                                    to="/deposits"
                                    className="flex items-center p-2 text-gray-900 rounded-lg text-white hover:bg-[#66774f] group"
                                >
                                    <Ticket color="white" />
                                    <span className="flex-1 ms-3 whitespace-nowrap text-[16px]">Deposits</span>
                                </Link>
                            </li>
                            <li className={`${isActive('/withdrawals')}`}>
                                <Link
                                    to="/withdrawals"
                                    className="flex items-center p-2 text-gray-900 rounded-lg text-white hover:bg-[#66774f] group"
                                >
                                    <Ticket color="white" />
                                    <span className="flex-1 ms-3 whitespace-nowrap text-[16px]">Withdrawals</span>
                                </Link>
                            </li>
                            
                        </ul>
                        <ul className="space-y-2 font-medium">
                            <li>
                                <Link
                                    to="/logout"
                                    className="flex items-center p-2 text-gray-900 rounded-lg text-white hover:bg-[#66774f] group"
                                >
                                    <svg
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="transparent"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M17.44 14.62L20 12.06L17.44 9.5"
                                            stroke="#A65959"
                                            strokeWidth="1.5"
                                            strokeMiterlimit={10}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M9.76001 12.06H19.93"
                                            stroke="#A65959"
                                            strokeWidth="1.5"
                                            strokeMiterlimit={10}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M11.76 20C7.34001 20 3.76001 17 3.76001 12C3.76001 7 7.34001 4 11.76 4"
                                            stroke="#A65959"
                                            strokeWidth="1.5"
                                            strokeMiterlimit={10}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap text-[#A65959] font-normal">Logout</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default Sidebar;
