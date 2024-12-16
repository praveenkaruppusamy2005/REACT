import "../cssfiles/LoginPage.css"
import applogo from '../assets/APPLOGO.png'
import google_l from '../assets/google.png'
import fb from '../assets/FBLOGO.png'
import email from '../assets/email.png'
import {Link,useNavigate} from 'react-router-dom'
function SignupPage() {
  const navigate=useNavigate()
  return (
    <div className='LoginMain'>
    <div className='LoginPage'>
    <div className='LoginPageinfo'>
      <p className='Login'>Sign up to <img src={applogo} style={{height:"4.9vh",width:"4.9vh",position:"relative",top:"-10%"}}/>Sonix</p>
    </div>
    <div className='LoginPagemethods'>
      <div className='inside_methods'><img src={google_l } className='imgtag'/><p className='ptag'>Signup with google</p></div>
      <div className='inside_methods'><img src={fb } className='imgtag' style={{position:"relative",height:"7vh",width:"7.5vh",top:"-1%"}}/><p className='ptag1' >Signup with facebook</p></div>
      <div className='inside_methods'  onClick={()=>{navigate('/email')}}><img src={email} className='imgtag' style={{height:'4vh',width:'4vh',top:"5%",right:"5%"}}/><p className='ptag'>Signup with email</p></div>
      <div className='inside_methods'><p className='ptag' style={{left:"2%"}}>Signup with phone number</p></div>
      <div className='inside_methods d'><p className='ptag2'>Already have an account?<Link to='/login' className='anchortag'>Login to sonix</Link></p></div>
    </div>
    </div>
    </div>
  )
}

export default SignupPage