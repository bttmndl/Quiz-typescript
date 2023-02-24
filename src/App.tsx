import React, { useState, useEffect } from 'react';
import './App.css';
import DragAndDrop from './components/DragAndDrop';
import FillTheBlank from './components/FillTheBlank';
import MultipleChoise from './components/MultipleChoise';
import MultiSelect from './components/MultiSelect';
import Popup from './components/Popup';
import TrueFalse from './components/TrueFalse';

type Question = {
  question: string;
  option: string[];
  answer: string;
  correct: string;
};

interface FormData {
  name: string;
  email: string;
  phone: string;
  language: string;
}

export default function App(): JSX.Element {
  const [questions, setQuestions] = useState<Question[]>([
    {
      question: 'Q. What is React?',
      option: ['a library', 'a framework', 'a compiler', 'none of these'],
      answer: '',
      correct: 'a library',
    },
    {
      question: 'Q. javascript is superset of typescript ?',
      option: ['true', 'false'],
      answer: '',
      correct: 'false',
    },
    {
      question: 'Q. the value of pi is ____? ',
      option: ["helllo"],
      answer: '',
      correct: '3.14',
    },
    {
      question: "Q. Match the following with correct options, (use Drag/Drop)",
      option: ["Structure","Design","Code","Deployement","github","IDE","html","CSS"],
      answer: "",
      correct:"6754"
    },
    {
      question: 'Q. Choose all the correct statement bellow..',
      option: ['javascript is a single threaded, syncronous language', 'javascript is single threaded asyncronous language', 'javascript is staticly typed', 'javascript is dynamically typed'],
      answer: '',
      correct: '03',
    }
  ]);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    language: 'english',
  });
  const [page, setPage] = useState<number>(1);
  const [start, setStart] = useState<boolean>(true)
  const [sec, setSec] = useState<number>(0);
  const [min, setMin] = useState<number>(0);
  const [hr, setHr] = useState<number>(0);

  let k: any = null;
  useEffect(()=>{
    if(sec===60){
      setSec(0);
      setMin(p=>p=p+1);
    }
    if(min===60){
      setHr(p=>p=p+1);
      setMin(p=>p=0);
    }
    if(!start){
      k = setInterval(()=>{
        setSec(p=>p+1)        
      },1000)
    }
    return ()=>clearInterval(k);
  },[start, sec])

  return (
    <div className="App">
      {start ? <Popup formData={formData} setFormData={setFormData} setStart={setStart}/> :
      (<div className='Main-Body'>
        <div className="Header">
          <h1>QUIZZ APP</h1>
          <h1 style={{color:"white"}}>{hr<10 && '0'}{hr} : {min<10 && '0'}{min} : {sec<10 && '0'}{sec}</h1>
          <div style={{display:"flex", justifyContent:"space-around"}}>
            {[...Array(5)].map((ele, idx) => (
              <div
                key={idx}
                className="Header-circle"
                style={{
                  backgroundColor: questions[idx].answer ? 'red' : 'gray',
                }}
                onClick={() => setPage(idx + 1)}
              >
                <h3>{idx + 1}</h3>
              </div>
            ))}
          </div>
        </div>


        <div className='Main-Body-Question'>
            {page === 1 && (
              <MultipleChoise
                questions={questions}
                setQuestions={setQuestions}
                setPage={setPage}
                page={page}
              />
            )}
            {page === 2 && (
              <TrueFalse
                questions={questions}
                setQuestions={setQuestions}
                setPage={setPage}
                page={page}
              />
            )}
            {page === 3 && (
              <FillTheBlank
                questions={questions}
                setQuestions={setQuestions}
                setPage={setPage}
                page={page}
              />
            )}
            {page === 4 && (
              <DragAndDrop
                questions={questions}
                setQuestions={setQuestions}
                setPage={setPage}
                page={page}
              />
            )}
            {page === 5 && (
              <MultiSelect
                questions={questions}
                setQuestions={setQuestions}
                setPage={setPage}
                page={page}
                name={formData.name}
                min={min}
                sec={sec}
              />
            )}
        </div>
      </div>)}
    </div>
  );
}
