import React, { useState } from 'react'
import open from '../assets/icons/open.png'
import close from '../assets/icons/close.png'
import logo from '../assets/APPLOGO.png'
import axios from 'axios'
import '../cssfiles/EmailLogin.css'
import EmailOtp from './EmailOtp'
function EmailLogin() {
    const[op,setOpen]=useState(false);
    const[name,setName]=useState('')
    const[email,setEmail]=useState('')
    const[password,setpasword]=useState('')
    const[message,setmessage]=useState(false)
    const [m,sm]=useState(false)
    function handleopen()
    {
       setOpen(!op)
    }
    function handlesubmit(e)
    {
        e.preventDefault();
        if(!name||!password||!email)
        {
            setmessage(!message)
        }
        const data={"name":name,"email":email,"password":password}
        if(name&&password&&email)
        {
    axios
    .post('http://127.0.0.1:8000/api/data/user/email',data)
    .then((response)=>
    {
        if (response.status===201)
        {
            alert("data saved")
            sm(!m)
        }
    })
    .catch((err)=>{
        console.log(err.response);
        alert("error in saving data")
    })
}
    }
  return (
    <div className='EmailLogin'>
    {!m?(
    <div className='EmailLoginMain'>
    <img src={logo} style={{height:'10vh'}}/>
    <div  className='inputBoxDiv'>
    <span className='spanName'>Name</span>
    <input type='text' className='inputBox' value={name} onChange={(e)=>setName(e.target.value)}></input>
    </div>
    <div className='inputBox1Div'>
    <span  className='spanName'>Email</span>
    <input type='text' className='inputBox1' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
    </div>
    <div className='inputBox1Div'>
    <span  className='spanName'>Password</span>
    <input type={op ? 'text' :  'password'} className='inputBox1' value={password} onChange={(e)=>setpasword(e.target.value)}/><img src={op?open:close} onClick={handleopen} style={{height:"4vh",width:"4vh",position:"absolute",bottom:"1vh",left:"85%",cursor:'pointer'}}/>
     {message  &&  <span className='errorspan'>&#9432; Fill all the required Fields</span>}
    </div>
    <button className='styleButton' onClick={handlesubmit}>submit</button>
    </div>):(<EmailOtp/>)}
    </div>
  )
}

export default EmailLogin