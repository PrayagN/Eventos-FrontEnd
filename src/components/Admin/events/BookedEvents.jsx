import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { BookedEventsData } from '../../../Services/adminApi'
function BookedEvents() {
  const [data,setData] = useState()
  useEffect(()=>{
    BookedEventsData().then((response)=>{
      setData(response.data.necessaryData)
    })
  },[])

  const columns =[
      {
        name:'sl.No',
        selector: (_, index) => index + 1,
        sortable: false,
      },
      {
        name:'Client',
        selector:row =>row.clientName,
        sortable:true
      },
      
      { 
        name:'Organizer',
        selector:row =>row.organizerName
      },
      {
        name:'Event',
        selector:row =>row.event
      },
      {
        name:'full Amount',
        selector:row => row.totalAmount,
        sortable:true
      },
      {
        name:'Advance Amount',
        selector:row =>row.advanceAmount

      },
      {
        name:'Payment Status',
        selector: row =>row.paymentStatus
      },
      {
        name:'Event Scheduled',
        selector:row =>row.eventScheduled.slice(0,10)
      },
      {
        name:'Booked Date',
        selector:row =>row.bookedDate.slice(0,10)
      },
  ]
  const customStyles = {
    table: {
      style: {
        backgroundColor: '#FFFFFF',
        border: '1px solid #E5E7EB',
        borderRadius: '8px',

    
      },
    },
    header: {
      style: {
        background: '#F3F4F6',
        borderBottom: '1px solid #E5E7EB',
        color: '#4B5563',
        fontSize: '14px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    
      },
    },
    rows: {
      style: {
        borderBottom: '1px solid #E5E7EB',
        fontSize: '14px',
        color: 'black',
        fontWeight:'bold',
        fontFamily:'inherit'
      },
    },
    cells: {
      style: {
        padding: '12px',
      },
    },
  };
  
  
 
  return (
    <div className="w-full">
    <h1 className="m-12 text-4xl font-semibold font-arim">Booked Events</h1>
    <div className="mt-32 mx-8">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg shadow-gray-600">
        <DataTable columns={columns} data={data} customStyles={customStyles} fixedHeader pagination />
      </div>
    </div>
  </div>
  )
}

export default BookedEvents
