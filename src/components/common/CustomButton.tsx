import { Button } from '@pankod/refine-mui';
import React from 'react'
import { CustomButtonProps } from 'interfaces/components';


const CustomButton = ({disabled, type, title, backgroundColor, color, fullWidth, icon, handleClick,style={}}: CustomButtonProps) => {
 
  return (
    <Button
    type ={type === 'submit'?'submit':'button'}
    sx={{
      ...style,
      flex:fullWidth?1 : 'unset',
      padding:'10px 15px',
      width:fullWidth?'100%' : 'fit-content',
      minWidth:130,
      backgroundColor,
      color,
      textAlign:'center',
      fontSize:16,
      fontWeight:600,
      gap:'10px',
      textTransform:'capitalize',
      '&:hover':{
        opacity:0.9,
        backgroundColor
      }
    }}
    disabled={disabled?true:false}
    onClick={handleClick}
    >
      {icon}
      {title}
    </Button>
  )
}

export default CustomButton