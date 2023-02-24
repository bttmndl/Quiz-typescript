import React, { useState, useEffect } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  language: string;
}

interface PopupProps {
    formData: FormData,
    setFormData: React.Dispatch<React.SetStateAction<FormData>>,
    setStart: React.Dispatch<React.SetStateAction<boolean>>,
}



const Popup: React.FC<PopupProps> = ({formData, setFormData, setStart}) => {
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [beforeStart, setBeforeStart] = useState<boolean>(false);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const [cnt, setCnt] = useState<number>(3);
  const handleStartClick = () => {
    setBeforeStart(true);
  };

  const isFormDataValid = (): boolean => {
    return Object.values(formData).every((value) => value.trim() !== '');
  };

  const handleFormValidation = () => {
    setIsFormValid(isFormDataValid());
  };

  let k:any = null;

  useEffect(() => {
    if(cnt===0) {
        setStart(p=>p=false)
    }
    if(beforeStart){
        k = setInterval(()=>{
            setCnt(p=>p=p-1)
        }, 1000)
    }
  
    return () => clearInterval(k);
  }, [beforeStart, cnt])


  return (
    <div className="popup-container">
      {beforeStart ? <h1 style={{fontSize: '200px', color:"red"}}>{cnt}</h1> : 
      <div className="popup">
        <h2>Fill The Details</h2>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} onBlur={handleFormValidation} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} onBlur={handleFormValidation} />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} onBlur={handleFormValidation} />
        </div>
        <div className="form-group">
          <label htmlFor="language">Language:</label>
          <select id="language" name="language" value={formData.language} onChange={handleInputChange}>
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
          </select>
        </div>
        <button type="button" onClick={handleStartClick} disabled={!isFormValid}>
          Start Quiz
        </button>
      </div>}
    </div>
  );
};

export default Popup;
