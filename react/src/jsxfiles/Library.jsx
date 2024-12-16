import React from 'react'
import '../cssfiles/Library.css'
import pl from '../assets/icons/plus_icon.png'
import library_a from '../assets/icons/library_a.png';
import liked from '../assets/liked.jpg'
function Library() {
  return (
    <div className='Library'>
    <div className='Libr'>
        <div style={{display:"flex",flexDirection:"row",position:"fixed"}}><img src={library_a} className='playlist'></img><p className='twek'> your library</p></div>
        <div className='plus_t'><img src={pl} className='playlist'></img></div>
        </div>
        <div className='other'>
            <div className='Liked'><img src={liked} className='imginside'/><p className='pfont'>Liked songs</p></div>
        </div>
    </div>
  )
}

export default Library