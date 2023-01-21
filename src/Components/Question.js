import React, { useEffect, useState,} from "react";
import Choices from "./Choices";

export default function Question({question, wrong, right, submit, reload}){


  useEffect(()=>{
    setChosen("")
   }, [reload])
        
  
  const [chosen, setChosen] = useState("")

  const changeChosen = (key) => {
    setChosen(key)
  } 
  
  
  const optionDisplay = ()=>{
    let buttons = []
    for (let i = 0; i<wrong.length; i+=1){
      buttons.push(<Choices key={i} option={wrong[i]} isChoice = {chosen===i} Key = {i} change ={changeChosen} correct={wrong[i]!==right?false:true} submit={submit}/>)
    }
    
    return buttons
    
  }

  const displaybuttons = optionDisplay()
  

  return(
    
    <div className="question-div">
      <p>{question}</p>
      <div className="optionButtons">
        {[...displaybuttons]}
      </div>
    </div>
  )
}