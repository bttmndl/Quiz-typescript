import React from 'react';

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

function TrueFalse({ questions, setQuestions, setPage, page }: Props): JSX.Element {
  function handleAnswer(e: React.ChangeEvent<HTMLInputElement>): void {
    let temp = [...questions];
    temp[1].answer = e.target.id;
    setQuestions(temp);
  }

  console.log(questions);

  return (
    <div className='Question'>
        <div className='Question-heading'>
            <h1>{questions[1].question}</h1>
        </div>

        <div className='Question-option'>
            {questions[1].option.map((opt) => (
                <div key={opt}>
                <input
                    type="radio"
                    id={opt}
                    name={opt}
                    value={opt}
                    onChange={handleAnswer}
                    checked={questions[1].answer === opt}
                />
                <label htmlFor={opt}>{" " + opt}</label>
                </div>
            ))}
        </div>

        <div className='Question-button'>
            <button onClick={() => setPage(page - 1)}>Prev</button>
            <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
    </div>
  );
}

export default TrueFalse;
