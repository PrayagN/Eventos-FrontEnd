import React, { useEffect, useState } from 'react'
import SmallCard from '../Admin/dashboard/smallCards/SmallCard'
import { loadDashboard } from '../../Services/organizerApi'
import {toast} from 'react-hot-toast'
function Dashboard() {
  const [dashboard,setDashboard] = useState('')
  useEffect(()=>{
    loadDashboard().then((response)=>{
      setDashboard(response.data)
    }).catch((error)=>{
      toast.error(error.response.data.message)
    })
  },[])
  const totalPrice = dashboard?.totalEarning?.toLocaleString("en-US", {
    style: "currency",
    currency: "INR",
  });
  return (
    <div className='w-full'>
       <div className="flex flex-wrap justify-center">
        <SmallCard color
          count={dashboard?.totalBooking}
          path={
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
          }
          name="Total Booking"
        />
        <SmallCard cancel
          name="Cancelled"
          count={dashboard?.cancelled}
          path={
            <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path>
          }
        />
        <SmallCard name="Upcoming" count={dashboard?.upcoming} path={<path d="M19 4h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm-4.588 15-2.449-1.288L9.514 19l.468-2.728L8 14.342l2.738-.398 1.225-2.48 1.225 2.48 2.738.398-1.981 1.931.467 2.727zM19 9H5V7h14v2z"></path>} />

        <SmallCard  money name='Total Earnings' count={totalPrice}  path={<path d="M20 4H4c-1.103 0-2 .897-2 2v2h20V6c0-1.103-.897-2-2-2zM2 18c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-6H2v6zm3-3h6v2H5v-2z"></path>} />
      </div>
  
     </div>
  )
}

export default Dashboard
