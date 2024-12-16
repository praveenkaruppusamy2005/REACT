import React, { useState, useEffect } from 'react';
import logo from '../assets/APPLOGO.png';
import search from '../assets/icons/search.png';
import home from '../assets/icons/home_a.png';
import home_a from '../assets/icons/home.png';
import library from '../assets/icons/library.png';
import library_a from '../assets/icons/library_a.png';
import profile_pic from '../assets/icons/profile.png';
import '../cssfiles/AppBar.css';
import Menu from './Menu';

function AppBar() {
  const [image, setImage] = useState(home);
  const [lib, setLib] = useState(library);
  const [menuVisible, setMenuVisible] = useState(false);
  const width = window.innerWidth;

  const toggleMenu = (e) => {
    e.stopPropagation();
    setMenuVisible((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  useEffect(() => {
    const handleDocumentClick = () => {
      closeMenu();
    };

    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <div className='AppBar' onClick={()=>{setMenuVisible(false)}} onM>
      <span className="appname" style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <img src={logo} className='logohw' alt="Logo" />
        {width < 480 && <p>SONIX</p>}
      </span>
      <span className="textwek" style={{ display: "flex", flexDirection: "row", gap: "1vh", alignItems: "center" }}>
        <img
          src={image}
          onClick={() => { setImage(home); setLib(library); }}
          className='logohw1'
          alt="Home Icon"
        />
        {width > 480 && <p>Home</p>}
      </span>
      <span style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        {width > 480 && (
          <input
            type='text'
            className="searchbar"
            style={{ position: "relative" }}
            placeholder='Search......'
          />
        )}
        <img
          src={search}
          style={{ position: width < 480 ? "relative" : "absolute", height: "4vh", paddingLeft: "1%" }}
          alt="Search Icon"
        />
      </span>
      <span style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <img
          className='logohw12'
          src={profile_pic}
          onClick={toggleMenu}
          alt="Profile"
        />
      </span>
      {menuVisible && <Menu />}
    </div>
  );
}

export default AppBar;
