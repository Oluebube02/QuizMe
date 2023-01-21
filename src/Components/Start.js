import React from "react";


export default function Start({setStarted}){
  return (
    <div className="start">
      <div className = "start-content">
        <h1 className ="title">QuizME</h1>
        <p className = "description">Expand your knowledge by answering random questions</p>
        <button className="start-button" onClick={setStarted}>Start quiz</button>
      </div>
    </div>
  )
}