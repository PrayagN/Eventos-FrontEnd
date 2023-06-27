import React from 'react'
import Navbar from '../../components/User/Home/Navbar'
import Chat from '../../components/User/Chat/Chat'

function ChatPage() {
  return (
    <div>
      <Navbar/>
      <div className='h-screen'>

      <Chat/>
      </div>
    </div>
  )
}

export default ChatPage
