import { useEffect, useState } from "react";
import React from "react";

export default function Choices({option, isChoice, Key, change, correct, submit}){

  const[bgColor, setBgColor] = useState("transparent")
  const style ={
    backgroundColor: bgColor
  }
  
  useEffect(()=>{
    const getColor =()=>{
      let color
      if(isChoice){
        if(submit&correct){
          color = "#94D7A2"
        }else if(submit&&!correct){
          color = "#F8BCBC"
        }else if (!submit){
          color = "#D6DBF5"
        }
      }else if (!isChoice && submit && correct){
        color = "#94D7A2"
      }else color = "transparent"
      return color
    }
    setBgColor(()=>getColor())},
  [isChoice, correct, submit])
  return(
    <button style={style} onClick={()=>change(Key)} disabled={submit}>{option}</button>
  )
}
