import React from 'react'
import Navbar from '../../components/User/Home/Navbar'
import Chat from '../../components/User/Chat/Chat'

function ChatPage() {
  return (
    <div className='h-screen'>
      <Navbar/>
      <div >

      <Chat/>
      </div>
    </div>
  )
}

export default ChatPage
