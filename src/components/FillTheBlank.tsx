import React, { FC } from 'react';

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

const FillTheBlank: FC<Props> = ({ questions, setQuestions, setPage, page }) => {
  function handleAnswer(e: React.ChangeEvent<HTMLInputElement>): void {
    const temp = [...questions];
    temp[2].answer = e.target.value;
    setQuestions(temp);
  }

  return (
    <div>
        <div className='Question-heading'>
            <h1>{questions[2].question}</h1>
        </div>

        <div className='Question-option'>
            <input onChange={handleAnswer} placeholder="answer..." defaultValue={questions[2].answer} />
        </div>

        <div className='Question-button'>
            <button onClick={() => setPage(page - 1)}>Prev</button>
            <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
    </div>
  );
};

export default FillTheBlank;
