"use client"
import React, { useContext, useEffect } from 'react'

const MobileButtons = () => {

    
  return (
    <div style={{ position: 'fixed', bottom: '10px', left: '10px' }}>
      <div style={{ userSelect:'none', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '75px' }}>
        <button id='w' className='mobile-button' style={{  userSelect:'none', fontSize:'1.4em', marginBottom: '5px', width: '30px', height: '30px' }}>W</button>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
          <button id='a' className='mobile-button' style={{ userSelect:'none', fontSize:'1.4em', width: '30px', height: '30px' }}>A</button>
          <button id='d' className='mobile-button' style={{  userSelect:'none',fontSize:'1.4em', width: '30px', height: '30px' }}>D</button>
        </div>
        <button id='s' className='mobile-button' style={{  userSelect:'none',fontSize:'1.4em', marginTop: '5px', width: '30px', height: '30px' }}>S</button>
      </div>
    </div>
  )
}

export default MobileButtons