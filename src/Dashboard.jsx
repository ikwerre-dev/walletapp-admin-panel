import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar/Sidebar'
import DP from '/dp.png'
import artist from '/artist.png'
import artist2 from '/artist2.png'
import artist3 from '/artist3.png'
import taskBG from '/task bg.png'
import UsersTable from './components/UsersTable'
function Dashboard() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const response = await axios.post(`${API_KEY}getStats`);
      // console.log(response.data.data)
      setStats(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };



  useEffect(() => {
    fetchStats();
  }, []);
  return (
    <div>
      <Sidebar />
      <div className="p-1 md:p-5 px-5 md:ml-64 mt-14 md:mt-1 bg-[#E5E5E]" style={{ fontFamily: "Manrope" }}>

        <div className="flex flex-col lg:flex-row">
          <div className="md:w-[100%]">
            <div>
              <div className="activity mt-10 grid gap-8 w-full md:w-[100%]">
                <h1 className="text-[18px] font-semibold text-[#4C4C4C]" style={{ fontFamily: "Manrope" }}>Account Stats</h1>
                <div className="flex gap-5 flex-wrap md:flex-nowrap">
                  <div className="grid gap-5 w-full md:w-1/3 rounded rounded-lg p-4" style={{ background: `url(${taskBG}) no-repeat`, backgroundPositionX: "center", backgroundSize: "cover" }}>
                    <h1 className="text-[24px] font-semibold text-white" style={{ fontFamily: "Manrope" }}>{stats.totalUsers}</h1>
                    <p className="text-[12px] font-regular text-white" style={{ fontFamily: "Manrope" }}>Total Users</p>
                  </div>

                  <div className="grid gap-5 w-full md:w-1/3 rounded rounded-lg p-4" style={{ background: `url(${taskBG}) no-repeat`, backgroundPositionX: "center", backgroundSize: "cover" }}>
                    <h1 className="text-[24px] font-semibold text-white" style={{ fontFamily: "Manrope" }}>{stats.totalDeposits}</h1>
                    <p className="text-[12px] font-regular text-white" style={{ fontFamily: "Manrope" }}>Total Deposits</p>
                  </div>
                  <div className="grid gap-5 w-full md:w-1/3 rounded rounded-lg p-4" style={{ background: `url(${taskBG}) no-repeat`, backgroundPositionX: "center", backgroundSize: "cover" }}>
                    <h1 className="text-[24px] font-semibold text-white" style={{ fontFamily: "Manrope" }}>{stats.totalReferrals}</h1>
                    <p className="text-[12px] font-regular text-white" style={{ fontFamily: "Manrope" }}>Total Withdrawals</p>
                  </div>
                </div>
              </div>
            </div>


            <div className="mt-[5rem] overflow-x-auto" >
              <UsersTable />

            </div>

          </div>

        </div>

      </div>


    </div>
  )
}

export default Dashboard