import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import AppBar from '../jsxfiles/AppBar'
import Library from './Library'
import MainComp from './MainComp'
import MiniPlayer from './MiniPlayer'
function Home() {
  const[name,setName]=useState('')
  const [songdata,setsongdata]=useState([])
  useEffect(()=>{
    fetch('http://127.0.0.1:8000/api/data/user/retrive')
  .then(response => response.json())
  .then(data => console.log(data));
    axios
    .get('http://127.0.0.1:8000/api/data/user/retrive', { withCredentials: true })
    .then((response)=>{setName(response.data.displayName)})
    .catch((error)=>{
      console.log(error.response.data)
    }
    )},[])
    useEffect(()=>{
      axios.get('http://127.0.0.1:8000/songs')
      .then((response)=>{
        setsongdata(response.data)
      })
      .catch((err)=>{
        console.log(err)
      })
    },[])
  return(
    <div >
    <AppBar/>
    <Library/>
    <MainComp name={name}/>
    <MiniPlayer songs={songdata}/>
    </div>
  )
}

export default Home