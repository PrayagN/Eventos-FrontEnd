import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import  Store  from './app/store.js'
import {GoogleOAuthProvider} from '@react-oauth/google'
ReactDOM.createRoot(document.getElementById('root')).render(
 <GoogleOAuthProvider clientId='573005678623-k88of2j3fv3tvqc9278aua8gjea047dm.apps.googleusercontent.com'>

 <Provider store ={Store}>
    <App />
  </Provider>,
 </GoogleOAuthProvider>
)
