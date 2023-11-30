import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Question from './question';
import Navigation from "../Navigation";

const questionsData = [
    {
        id: 1,
        question: (
            <div style={{textAlign: 'center'}}>
                <div style={{display: 'inline-block', textAlign: 'left'}}>
                    A: Do you have any __________ plans for the weekend?<br/>
                    B: Yes, I'm thinking of going to the beach.
                </div>
            </div>
        ),
        options: ["A: special", "B: extraordinary", "C: unique", "D: specific"],
        answer: "D: specific",
    },
    {
        id: 2,
        question: (
            <div style={{textAlign: 'center'}}>
                <div style={{display: 'inline-block', textAlign: 'left'}}>
                    A: I can't find my keys anywhere. Have you seen them?<br/>
                    B: Check on the __________ table. You might have left them there.
                </div>
            </div>
        ),
        options: ["A: dining", "B: kitchen", "C: coffee", "D: bedside"],
        answer: "B: kitchen",
    },
    {
        id: 3,
        question: (
            <div style={{textAlign: 'center'}}>
                <div style={{display: 'inline-block', textAlign: 'left'}}>
                    A: I'm not sure if I can attend the meeting tomorrow.<br/>
                    B: You should __________ your schedule and see if you can make it.
                </div>
            </div>
        ),
        options: ["A: analyze", "B: assess", "C: evaluate", "D: examine"],
        answer: "C: evaluate",
    },
    {
        id: 4,
        question: (
            <div style={{textAlign: 'center'}}>
                <div style={{display: 'inline-block', textAlign: 'left'}}>
                    A: The project deadline is approaching. We need to __________ our efforts.<br/>
                    B: Agreed. Let's allocate more resources to speed up the process.
                </div>
            </div>
        ),
        options: ["A: intensify", "B: enhance", "C: escalate", "D: amplify"],
        answer: "A: intensify",
    },
    {
        id: 5,
        question: (
            <div style={{textAlign: 'center'}}>
                <div style={{display: 'inline-block', textAlign: 'left'}}>
                    A: The author's use of language in this novel is quite __________.<br/>
                    B: Indeed, the prose is rich and filled with layers of meaning.
                </div>
            </div>
        ),
        options: ["A: intricate", "B: convoluted", "C: elaborate", "D: labyrinthine"],
        answer: "A: intricate",
    },
    {
        id: 6,
        question: (
            <div style={{textAlign: 'center'}}>
                <div style={{display: 'inline-block', textAlign: 'left'}}>
                    A: I appreciate your __________ in handling this matter diplomatically.<br/>
                    B: Thank you. It's crucial to maintain a professional approach.
                </div>
            </div>
        ),
        options: ["A: finesse", "B: prowess", "C: adeptness", "D: virtuosity"],
        answer: "A: finesse",
    },
    {
        id: 7,
        question: (
            <div style={{textAlign: 'center'}}>
                <div style={{display: 'inline-block', textAlign: 'left'}}>
                    A: The CEO's decision to diversify the company's portfolio was a __________ move.<br/>
                    B: It indeed opened up new opportunities and reduced risk.
                </div>
            </div>
        ),
        options: ["A: strategic", "B: tactical", "C: judicious", "D: sagacious"],
        answer: "A: strategic",
    },
    {
        id: 8,
        question: (
            <div style={{textAlign: 'center'}}>
                <div style={{display: 'inline-block', textAlign: 'left'}}>
                    A: The scientist's groundbreaking research has __________ our understanding of physics.<br/>
                    B: It's revolutionary. The implications are far-reaching.
                </div>
            </div>
        ),
        options: ["A: transcended", "B: surpassed", "C: augmented", "D: elevated"],
        answer: "A: transcended",
    },
    {
        id: 9,
        question: (
            <div style={{textAlign: 'center'}}>
                <div style={{display: 'inline-block', textAlign: 'left'}}>
                    A: His ability to stay calm under pressure is truly a sign of great __________.<br/>
                    B: Even in the most challenging situations, he remains composed and focused.
                </div>
            </div>
        ),
        options: ["A: fortitude", "B: equanimity", "C: resilience", "D: tenacity"],
        answer: "B: equanimity",
    },
    {
        id: 10,
        question: (
            <div style={{textAlign: 'center'}}>
                <div style={{display: 'inline-block', textAlign: 'left'}}>
                    A: His ability to remain calm under pressure is truly __________.<br/>
                    B: Not everyone can handle such high-stakes situations with grace.
                </div>
            </div>
        ),
        options: ["A: commendable", "B: laudable", "C: exemplary", "D: admirable"],
        answer: "A: commendable",
    },
];

function EngExam() {
    const navigate = useNavigate();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [selectedOption, setSelectedOption] = useState(null); // 添加 selectedOption 状态
    const currentQuestion = questionsData[currentQuestionIndex];
    const [score, setScore] = useState(0); // 添加 score 状态
    const [confirmButtonVisible, setConfirmButtonVisible] = useState(true);


    const handleAnswer = (questionId, option) => {
        setSelectedOption(option);
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: option,
        }));
    };

    const handleSendAns = () => {
        if (selectedOption && currentQuestionIndex < questionsData.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            setConfirmButtonVisible(false);
            if (selectedOption === currentQuestion.answer) {
                setScore((prevScore) => prevScore + 10);
            }
            setSelectedOption(null);
        } else if (currentQuestionIndex === questionsData.length - 1) {
            if (selectedOption === currentQuestion.answer) {
                navigate('/resultpage', {state: {score: score + 10}});
            } else {
                navigate('/resultpage', {state: {score: score}});
            }


        }
    };

    const handleSkipButtonClick = () => {
        if (currentQuestionIndex < questionsData.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            setSelectedOption(null);
            // setConfirmButtonVisible(true);
        } else if (currentQuestionIndex === questionsData.length - 1) {
            navigate('/resultpage', {state: {score: score}});
        }
    };

    return (
        <>
            <Navigation/>
            <div style={{marginTop: '150px'}}/>

            <div style={{
                backgroundColor: 'white',
                height: '100vh',
                width: '1024px',
                margin: 'auto',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>

                <div style={{textAlign: 'center', marginBottom: '10px'}}>
                    <h2>영어 테스트 {currentQuestionIndex + 1}/{questionsData.length}</h2>
                </div>
                <div style={{textAlign: 'right', marginBottom: '30px'}}>
                    <button
                        style={{
                            width: '80px',
                            height: '30px',
                            marginRight: '20px',
                            borderRadius: '30px',
                            border: "none",
                            color: '#686A6C',
                            backgroundColor: '#f5f5f5'
                        }}
                        onClick={handleSkipButtonClick}
                    >
                        Skip
                    </button>
                </div>
                <div style={{textAlign: 'center', marginBottom: '150px', marginLeft: '80px', marginRight: '80px'}}>
                    {currentQuestion && (
                        <Question
                            key={currentQuestion.id}
                            question={currentQuestion}
                            onAnswer={handleAnswer}
                            selectedOption={selectedOption}
                        />
                    )}
                </div>
                <div style={{textAlign: 'center', marginBottom: '100px'}}>
                    <button
                        style={{
                            width: '260px',
                            height: '40px',
                            cursor: Object.keys(answers).length > 0 ? 'pointer' : 'not-allowed',
                            backgroundColor: selectedOption ? '#1E90FF' : '#c0bfbf',
                            // display: confirmButtonVisible ? 'block' : 'none',
                            borderRadius: '20px',
                            margin: 'auto',
                            fontSize: '16px',
                            color: '#FEFCFF',
                            border: "none"
                        }}
                        onClick={handleSendAns}
                        disabled={Object.keys(answers).length === 0}
                    >
                        확인
                    </button>
                </div>
            </div>
        </>
    );
}

export default EngExam;