import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Provider } from 'react-redux'
import  Store  from './app/store.js'
import {GoogleOAuthProvider} from '@react-oauth/google'
ReactDOM.createRoot(document.getElementById('root')).render(
 <GoogleOAuthProvider clientId={import.meta.env.VITE_Client_id}>

 <Provider store ={Store}>
    <App />
  </Provider>,
 </GoogleOAuthProvider>
)
