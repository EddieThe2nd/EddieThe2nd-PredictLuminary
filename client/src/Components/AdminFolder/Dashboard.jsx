import React from 'react'
import Sidebar from '../AdminFolder/Components/SideBar Section/Sidebar'
import Body from '../AdminFolder/Components/Body Section/Body'
function Dashboard() {
  return (
    <div className='dashboard flex'>
     <div className="dashboardContainer flex">
      <Sidebar/>
      <Body/>
     </div>
    </div>
  )
}

export default Dashboard