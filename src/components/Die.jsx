import React from 'react'

export const Die = (props) => {

  const style = {
    backgroundColor: props.isHeld ? "green" : "#22222222"
  }
  return (
    <div style={style} 
    onClick={()=> props.handleClick(props.id)}
    className='
        h-16 w-16 border-2 font-bold text-xl text-center border-red-900'>
        {props.value}
        </div>
  )
}
