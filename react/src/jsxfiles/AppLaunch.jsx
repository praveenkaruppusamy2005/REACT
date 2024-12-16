import React, { useEffect } from 'react'
import applogo from '../assets/APPLOGO.png'
import "../cssfiles/AppLaunch.css"
import { useNavigate } from 'react-router-dom'

function AppLaunch() {
    const navigate=useNavigate();
    useEffect( ()=>{
        const time=setTimeout( ()=>{
            navigate('/login');
        },3000)

    return ()=>{clearTimeout(time)}
    
    },[navigate]);
  return (
    <div className='AppLaunch'>
        <img src={applogo} className='Logoimage'/>
        <p className='Appname'>SONIX</p>
    </div>
  )
}

export default AppLaunch