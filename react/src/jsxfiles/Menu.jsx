import React from 'react'
import '../cssfiles/menu.css'
import acc from '../assets/icons/account.png';
import settings from '../assets/icons/settings.png';
function Menu() {
  return (
        <div className='flex flex-col menu'>
            <ul className='flex flex-col menus'>
                <li><img src={acc}/><span>Profile</span></li>
                <li><img src={settings}/><span>Settings</span></li>
                <hr style={{opacity:"0.2"}}></hr>
                <li style={{paddingLeft:"40px",marginTop:"-6px"}}>Log out</li>
            </ul>
        </div>
  )
}

export default Menu