import React, { useState ,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../cssfiles/LoginPage.css"
import applogo from '../assets/APPLOGO.png'
import google_l from '../assets/google.png'
import fb from '../assets/FBLOGO.png'
import email from '../assets/email.png'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../../firebase'
import axios from 'axios'
function LoginPage() {
  const navigate=useNavigate();
  const[loggedIn,SetLoggedIn]=useState(false)
  const[error,Seterror]=useState('')
  const [userData,setUserData]=useState({})
  function googleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const { displayName, email } = result.user;
        setUserData({ displayName, email });
        console.log({displayName,email})
        const usera = { displayName, email };
  
        // Send user data to Django backend
        axios
          .post('http://127.0.0.1:8000/api/data/user', usera)
          .then((response) => {
            if (response.status === 201) {
              alert('Data saved');
              SetLoggedIn(true); // Update the loggedIn state
              navigate('/home'); // Navigate to /home on success
            }
          })
          .catch((error) => {
            console.log('Error:', error);
            alert('Error in saving data');
          });
      })
      .catch((error) => {
        console.log('Firebase error:', error);
        Seterror(error.message); 
      });
  }
  
  return (
    <div className='LoginMain'>
    <div className='LoginPage'>
    <div className='LoginPageinfo'>
      <p className='Login'>Login in to <img src={applogo} style={{height:"5vh",width:"5vh",position:"relative",bottom:"10%"}}/>Sonix</p>
    </div>
    <div className='LoginPagemethods'>
      <div className='inside_methods' onClick={googleLogin}><img src={google_l } className='imgtag'/><p className='ptag'>Login with google</p></div>
      <div className='inside_methods'><img src={fb } className='imgtag' style={{position:"relative",height:"7vh",width:"7vh",top:"-1%"}}/><p className='ptag1' >Login with facebook</p></div>
      <div className='inside_methods'><img src={email} className='imgtag' style={{height:'4vh',width:'4vh',top:"5%",right:"6%"}}/><p className='ptag'>Login with email</p></div>
      <div className='inside_methods'><p className='ptag' style={{left:"2%"}}>Login with phone number</p></div>
      <div className='inside_methods d'><p className='ptag2'>Don't have an account?<Link  to='/signup' className='anchortag'>Sign up for sonix</Link></p></div>
    </div>
    </div>
    </div>
  )
}

export default LoginPage