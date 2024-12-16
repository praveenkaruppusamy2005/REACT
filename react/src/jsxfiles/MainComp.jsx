import React from 'react'
import '../cssfiles/MainComp.css'
function MainComp(props) {
    let n=props.name
    n=n.split(" ")
  return (
    <div className='MainComp'>
        <div className='username'>Hey {n[0]} <p className='what'>we just made for you</p></div>
    </div>
  )
}

export default MainComp