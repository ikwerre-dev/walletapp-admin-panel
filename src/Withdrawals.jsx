import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import DP from '/dp.png'
import artist from '/artist.png'
import artist2 from '/artist2.png'
import artist3 from '/artist3.png'
import taskBG from '/task bg.png'
import UsersTable from './components/UsersTable'
import WithdrawComponent from './components/WithdrawTable'
function Withdraw() {
  return (
    <div>
      <Sidebar />
      <div className="p-1 md:p-5 px-5 md:ml-64 mt-14 md:mt-1 bg-[#E5E5E]" style={{fontFamily:"Manrope"}}>
       
        <div className="flex flex-col lg:flex-row">
          <div className="md:w-[100%]">
       

          
            <div className="mt-[5rem] overflow-x-auto" >
              <WithdrawComponent />
            
            </div>

          </div>
         
        </div>

      </div>


    </div>
  )
}

export default Withdraw