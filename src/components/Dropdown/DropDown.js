import React, { useEffect, useRef } from 'react'

export default function DropDown(props) {
     const dropdownRef = useRef()
    const handleClick = (event) => {
      if(dropdownRef && dropdownRef.current.contains(event.target)){
        if(props.onClose)props.onClose()
      }
    }

    useEffect(()=> {
        document.addEventListener('click', handleClick)

        return() => {
            document.removeEventListener('click', handleClick)
        }
    })
  
    return (
    <div ref={dropdownRef} className='dropdown' style={{
      position: "absolute",
      top:"100%",
      right:"0"
    }}>
     
      {props.children}
    </div>
  )
}
//It's important to put the given styling in dropdown ,,,,,, that's why we also have to give position relative to 
//its parent element