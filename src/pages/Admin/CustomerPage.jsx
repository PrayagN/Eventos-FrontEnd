import React from 'react'
import Customers from '../../components/Admin/customers/Customers'
import Sidebar from '../../components/Admin/Sidebar/Sidebar'

function CustomerPage() {
  return (
    <div className='flex h-screen w-full'>
      <Sidebar/>
      <Customers/>
    </div>
  )
}

export default CustomerPage
