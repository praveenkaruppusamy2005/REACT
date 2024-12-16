import React from 'react'
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import AppLaunch from './jsxfiles/AppLaunch'
import LoginPage from './jsxfiles/LoginPage'
import SignupPage from './jsxfiles/SignupPage'
import Home from './jsxfiles/Home'
import ErrorLoginPage from './jsxfiles/ErrorLoginPage'
import EmailLogin from './jsxfiles/EmailLogin'
function App() {
  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",width:"100vw",backgroundColor:"black"}}>
    <BrowserRouter>
      <Routes>
        <Route path='' element={<AppLaunch/>}></Route>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/signup' element={<SignupPage/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/error' element={<ErrorLoginPage/>}></Route>
        <Route path='/email' element={<EmailLogin/>}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App