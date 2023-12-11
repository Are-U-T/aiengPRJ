import React, {useState} from 'react';
import '../../App.css';

function Question({question, onAnswer}) {
    const {id, question: questionText, options} = question;
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        onAnswer(id, option);
    };

    return (
        <div className='App'>
            <div key={id} style={{textAlign: 'center'}}>
                <div style={{textAlign: 'center', marginBottom: '70px'}}>
                    <h3 style={{fontSize: '20px', fontFamily: "'NotoSansKR-Medium', sans-serif"}}>{questionText}</h3>
                </div>
                <ul style={{listStyle: 'none', padding: 0}}>
                    {options.map((option) => (
                        <li key={option}>
                            <button
                                style={{
                                    borderColor: selectedOption === option ? '#1E90FF' : 'white',
                                    borderWidth: '2.6px',
                                    borderStyle: 'solid',
                                    width: '500px', // Adjust the width as needed
                                    height: '52px', // Adjust the height as needed
                                    margin: '4px', // Add margin as needed
                                    fontSize: '16px',
                                    borderRadius: '5px',
                                    textAlign: 'left', // 文字靠右
                                }}
                                onClick={() => handleOptionClick(option)}
                            >
                                {option}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Question;
