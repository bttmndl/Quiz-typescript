import React, { useEffect, useState } from 'react';
import PieChart from './PieChart';


let x =0;
let secc:number;
let minn:number;
type Question = {
  question: string;
  option: string[];
  answer: string;
  correct: string;
};

type Props = {
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  name: string;
  min: number;
  sec: number;
};

function MultiSelect({ questions, setQuestions, setPage, page, name, min, sec }: Props): JSX.Element {
  const [selectedIndex, setSelectedIndex] = useState<number[]>([])
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  function handleAnswer(idx: number): void {
    let temp = [...questions];
    let selIndexes = [...selectedIndex];
    if(selIndexes.includes(idx)){
      selIndexes = selIndexes.filter((ele) => ele !== idx)
    } else {
      selIndexes.push(idx);
    }
    setSelectedIndex(selIndexes);
    let s: string = "";
    for(let i=0; i<selIndexes.length; i++){
      s+= selIndexes[i];
    }
    temp[4].answer = s;
    setQuestions(temp);
  }

  function handleSubmit(): void {
    setShowPopup(true);
  }

  function handleConfirmSubmit(): void {
    for(let i=0; i<questions.length; i++){
      if(i<=3){
        if(questions[i].answer === questions[i].correct) x++;
      }else{
        let ans = questions[i].answer.split("");
        let cor = questions[i].correct.split("");
        let flag = true;
        for(let j=0; j<ans.length; j++){
          if(!cor.includes(ans[j])){
            flag = false;
            break;
          }
        }
        if(flag) x++;
      }
    }

    setShowPopup(false);
    setShowConfirmation(true);
    minn = min;
    secc = sec;
  }
  useEffect(()=>{
    
  },[showPopup])

  function handleCancelSubmit(): void {
    setShowPopup(false);
  }
  
  return (
    <div className='Question'>
      <div className='Question-heading'>
        <h1>{questions[4].question}</h1>
      </div>

      <div className='Question-option'>
        {questions[4].option.map((opt, idx) => (
          <div key={opt}>
            <input
              type="checkbox"
              id={opt}
              name={opt}
              value={opt}
              onChange={() => handleAnswer(idx)}
              checked={selectedIndex.includes(idx)}
            />
            <label htmlFor={opt}>{" " + opt}</label>
          </div>
        ))}
      </div>

      <div className='Question-button'>
        <button onClick={() => setPage(page - 1)}>Prev</button>
        <button style={{ color: "yellow", backgroundColor: "red", marginLeft: "400px" }} onClick={handleSubmit}>Submit</button>
      </div>

      {showPopup &&
        <div className="popups">
          <div className="popups-content">
            <h2>Are you sure you want to submit?</h2>
            <div className="popups-buttons">
              <button className="confirm-button" onClick={handleConfirmSubmit}>Yes</button>
              <button style={{backgroundColor:"red"}} className="confirm-button" onClick={handleCancelSubmit}>No</button>
            </div>
          </div>
        </div>
      }

      { showConfirmation && 
        <div className="popups">
          <div className="popups-content" style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
            <h1>Hello, {name} your Quiz Stats</h1>
            <h3>Total Time  0{minn}:{secc}</h3>
            <PieChart totalQuestions={5} correctlyAnswered={x} wronglyAnswered={5-x}/>
            <button className="confirm-button" style={{backgroundColor:"red"}} onClick={()=>window.location.reload()}>Close</button>
          </div>
        </div>
      }

    </div>
  );
}

export default MultiSelect;
