import React from 'react'
import AdminHeader from './AdminHeader'


import Dashboard from './Dashboard'
import Sidebar from './Sidebar'

const AdminLayout = () => {
  return (
    <div className=' h-screen w-full'>
        <AdminHeader/>
        <div className=' flex'>
            <Sidebar/>
            <Dashboard/>

        </div>
        
      
    </div>
  )
}

export default AdminLayout
