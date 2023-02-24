import React, { useState, useEffect } from "react";

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
};

function DragAndDrop ({ questions, setQuestions, setPage, page }:Props):JSX.Element {
  const [data, setData] = useState<string[]>(questions[3].option.slice(4));

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("text/plain", event.currentTarget.id);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    const itemId = e.dataTransfer.getData("text/plain");
    const itemIndex:number|undefined = data.findIndex((item) => item === itemId);

    if (itemIndex !== -1) {
      const newData:string[] = [...data];
      newData.splice(itemIndex, 1);
      newData.splice(index, 0, itemId);
      setData(newData);
    }
  };

  useEffect(()=>{
    let ans: string = "";
    let checkArr = [...questions[3].option];
    for(let i=0; i<data.length; i++){
      ans+=checkArr.indexOf(data[i]);
    }
    
    let temp= [...questions];
    temp[3].answer = ans;
    setQuestions(temp);
  },[data])

  return (
    <div className="Question">
        <div className='Question-heading'>
            <h1>{questions[3].question}</h1>
        </div>

        <div className='Question-option' style={{width:"400px", display:'flex', justifyContent:"space-around", alignItems:"center", flexWrap:"wrap", flexDirection:"column"}}>
            {data.map((item, index) => (
              <div style={{display:"flex", justifyContent:"space-around"}} key = {index+index}>
                <div style={{width:"200px", height:"30px", border:"1px solid green", display:"flex", justifyContent:"center", alignItems:"center"}}>
                  {questions[3].option[index]}
                </div>
                <div
                style={{cursor:"pointer", width:"200px", height:"30px", border:"1px solid green", display:"flex", justifyContent:"center", alignItems:"center"}}
                key={item}
                id={item}
                draggable={true}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                >
                {item}
                </div>
              </div>
            ))}
            
        </div>

        <div className='Question-button'>
            <button onClick={() => setPage(page - 1)}>Prev</button>
            <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
    </div>
  );
};

export default DragAndDrop;
