import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Question from './question';
import Navigation from "../Navigation";
import '../../App.css';
import ModalStart from './ModalStart3';
import './ModalStart3.css'
import correctSound from './정답.mp3';
import wrongSound from './오답.mp3';
import './Style.css';
import Footer from './Footer/index';
import Modal from "../Speech/Modal";
import loginImg from "../Speech/images/loginImg.png";

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

const VisualFeedback = ({isCorrect}) => {
    const canvasRef = useRef(null);
    let startAngle = 0.5 * Math.PI;
    let endAngle = 2.5 * Math.PI;

    useEffect(() => {
        // canvasRef.current가 존재하는지 확인
        if (!canvasRef.current) {
            return;
        }

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);

        let currentAngle = startAngle;
        let startX = canvas.width - 5;
        let startY = 50;
        let endX = canvas.width / 2;
        let endY = canvas.height - 200;
        let currentX = startX, currentY = startY;

        const draw = () => {
            context.lineWidth = 3 + Math.random();
            context.lineCap = 'round';
            context.lineJoin = 'round';
            context.strokeStyle = 'red';

            context.beginPath();

            if (isCorrect) {
                if (currentAngle < endAngle) {
                    currentAngle += 0.1;
                    context.arc(canvas.width * 3 / 4, 100, 50, startAngle, currentAngle);
                    requestAnimationFrame(draw);
                }
            } else {
                if (currentX > endX && currentY < endY) {
                    currentX -= 3;
                    currentY += 3;
                    context.moveTo(startX, startY);
                    context.lineTo(currentX, currentY);
                    requestAnimationFrame(draw);
                }
            }

            context.stroke();
        };

        draw();
    }, [isCorrect]);

    return <canvas ref={canvasRef} width={400} height={400} style={{position: 'absolute', top: 80, left: 400}}/>;
};


function EngExam() {
    const navigate = useNavigate();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [selectedOption, setSelectedOption] = useState(null); // 添加 selectedOption 状态
    const currentQuestion = questionsData[currentQuestionIndex];
    const [score, setScore] = useState(0); // 添加 score 状态
    const [confirmButtonVisible, setConfirmButtonVisible] = useState(true);
    const [startModalOpen3, setStartModalOpen3] = useState(false);
    const [buttonState, setButtonState] = useState('확인');
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const userNum = sessionStorage.getItem('userNum');

    useEffect(() => {
        if (userNum == null) {
            // 모달 창 띄워서 로그인 하세요 하고 확인 누르면 로그인 창으로 보내기
            setLoginModalOpen(true);
        }
    }, [userNum]);

    const closeModalAndNavigate = () => {
        setLoginModalOpen(false);
        navigate('/login');
    };

    useEffect(() => {
        setStartModalOpen3(true);
    }, []);

    const Close2 = () => {
        setStartModalOpen3(false);
    };


    useEffect(() => {
        setStartModalOpen3(true);
    }, []);

    const Close3 = () => {
        setStartModalOpen3(false);
    };

    const handleAnswer = (questionId, option) => {
        setSelectedOption(option);
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: option,
        }));
    };

    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);

    const handleSendAns = () => {
        if (buttonState === '확인') {
            const isCorrect = selectedOption === currentQuestion.answer;
            setIsAnswerCorrect(isCorrect);

            if (isCorrect) {
                new Audio(correctSound).play();
                setScore((prevScore) => prevScore + 10);
            } else {
                new Audio(wrongSound).play();
            }

            setButtonState('다음 문제');
        } else {

            if (currentQuestionIndex < questionsData.length - 1) {
                setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
                setIsAnswerCorrect(null);
                setSelectedOption(null);
                setButtonState('확인');
            } else {
                navigate('/resultpage', {state: {score: score}});
            }
        }
    };

    const moveToNextQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setIsAnswerCorrect(null);
        setSelectedOption(null);
    };

    const handleSkipButtonClick = () => {
        if (currentQuestionIndex < questionsData.length - 1) {
            moveToNextQuestion();

        } else if (currentQuestionIndex === questionsData.length - 1) {
            navigate('/resultpage', {state: {score: score}});
        }
    };

    return (
        <div className='App'>
            <Navigation/>
            <ModalStart isOpen={startModalOpen3} onClose={Close3}>
                <div style={{textAlign: 'center', maxWidth: '600px'}}>
                    <h3 className='ghx'>사용방법 안내</h3>
                    <h3 className='ghx2'>레벨테스트</h3>
                    <div className="modal-instructionsx">
                        <p><b>Step 1</b> 빈칸에 알맞는 단어를 선택</p>
                        <p><b>Step 2</b> 우측 상단에서 푼 문제의 수와 진행률 확인</p>
                        <p><b>Step 3</b> Skip 버튼을 눌러 다음 문제로 넘어가기</p>
                        <p><b>Step 4</b> 모든 문제를 완료하면, 역량 분석 결과 확인</p>
                    </div>

                    <div className="foox">
                        <button onClick={() => setStartModalOpen3(false)} className="qwex">확인</button>
                    </div>
                </div>
            </ModalStart>
            <div style={{marginTop: '110px'}}/>

            <div style={{
                backgroundColor: 'white',
                height: '100vh',
                width: '1024px',
                margin: 'auto',
                flexDirection: 'column',
                justifyContent: 'center',
                fontFamily: "'NotoSansKR-Medium', sans-serif"
            }}>

                <div style={{textAlign: 'center', marginBottom: '10px'}}>
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
                            backgroundColor: '#f5f5f5',
                            fontFamily: "'NotoSansKR-Medium', sans-serif"
                        }}
                        onClick={handleSkipButtonClick}
                    >
                        Skip {currentQuestionIndex + 1}/{questionsData.length}
                    </button>
                </div>


                <div style={{textAlign: 'center', marginBottom: '120px', marginLeft: '80px', marginRight: '80px',fontFamily: "'NotoSansKR-Medium', sans-serif"}}>
                    {currentQuestion && (
                        <div style={{fontFamily: "'NotoSansKR-Medium', sans-serif"}}>

                            {isAnswerCorrect !== null && (
                                <VisualFeedback isCorrect={isAnswerCorrect}/>
                            )}
                            <Question
                                key={currentQuestion.id}
                                question={currentQuestion}
                                onAnswer={handleAnswer}
                                selectedOption={selectedOption}
                            />

                        </div>
                    )}
                </div>

                <div style={{textAlign: 'center'}}>
                    <button
                        style={{
                            width: '260px',
                            height: '40px',
                            cursor: Object.keys(answers).length > 0 ? 'pointer' : 'not-allowed',
                            backgroundColor: selectedOption ? '#1E90FF' : '#c0bfbf',
                            borderRadius: '20px',
                            fontSize: '16px',
                            color: '#FEFCFF',
                            border: "none",
                        }}
                        onClick={handleSendAns}
                        disabled={Object.keys(answers).length === 0}
                    >
                        {buttonState}
                    </button>
                </div>
            </div>
            <div style={{marginTop : '-300px'}}/>
            <Footer/>

            <Modal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)}>
                <div className="speechModalCenter">
                    <img src={loginImg} alt='로그인 이미지' className="speechLoginImg"/>
                    <h4>로그인 후 이용해 주세요</h4>
                    <button onClick={closeModalAndNavigate} className="modal-custom-button">
                        닫기
                    </button>
                </div>
            </Modal>
        </div>
    );
}

export default EngExam;