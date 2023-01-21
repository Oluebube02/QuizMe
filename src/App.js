import './App.css';
import Start from './Components/Start';
import bgImage from './images/intro.png'
import Question from './Components/Question';
import { useEffect, useState} from 'react';
function App() {
  const styles ={
    backgroundImage: `url(${bgImage})`,
    backgroundRepeat:"no-repeat",
    backgroundSize : "cover",
  }
  
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    } 
    return array
  }


  const [isStarted, setIsStarted] = useState(()=>false)
  const [submit, setsubmit] = useState(false)
  const [reload, setReload] = useState(false)
  const [questions, setQuestions] = useState({question:[], answer:[]})

  const togglesubmit =()=>{
    setsubmit(true)
  }
  const toggleRestart =()=>{
    setsubmit(false)
    setReload(reload=>!reload)
    
  }
  const toggleStarted = ()=>{
    setIsStarted(prevstart => !prevstart)
  }
  
  const MAX = 32
  const MIN = 19
  
  useEffect(()=>{
    setQuestions({question:[], answer:[]})
    const num = Math.ceil(Math.random() * (MAX-MIN+1) + MIN)
    const getAnswer = (data) => {
      const newdata = data.map(question=>shuffleArray([...question.incorrect_answers, question.correct_answer]))
      return newdata
     }
    fetch(`https://opentdb.com/api.php?amount=8&category=${num}`)
    .then(res=>res.json())
    .then(data => {
      setQuestions({question:data.results, answer:getAnswer(data.results)})})
  } 
  , [reload])
  
 
  let id = 0
  const allQuestions = questions.question.map(question=>{
    id+=1
    let quest = question.question
    quest = quest.replace(/&quot;/g, '').replace(/&#039;/g, '')
    const wr_answers = questions.answer[id-1].map(option=>option.replace(/&quot;/g, '').replace(/&#039;/g, '').replace(/&amp;/g, ''))
    const cr_answers = question.correct_answer.replace(/&quot;/g, '').replace(/&#039;/g, '').replace(/&amp;/g, '')
    return <Question key ={id} question = {quest} wrong ={wr_answers} right ={cr_answers} submit={submit} reload ={reload}/>
  })
  
  const allQuestionsDiv = <div className = "question-box">{allQuestions} <div className='Submit'>
    {!submit && <button onClick ={togglesubmit}>Submit</button>}
    {submit &&<div className='Submit'> <button onClick ={toggleRestart}>Restart</button></div>}
    </div></div>
  

  return (
    <div className={!isStarted?"App" :"App-start"} style={styles}>
      {isStarted?allQuestionsDiv:<Start setStarted={toggleStarted}/>}
    </div>
  );
}

export default App;
