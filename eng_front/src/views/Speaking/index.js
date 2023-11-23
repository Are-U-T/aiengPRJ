import React, { useState, useEffect } from 'react';
import './Speaking.css';
import ai5 from './images/ai5.png';
import Navigation from "../Navigation2";
import Navigation2 from "../Navigation2";
import Modal from "../Speach/Modal";
import MicRecorder from "mic-recorder-to-mp3";
import axios from "axios";

function Speaking({ selectedItem, selectedAiRole, selectedMyRole }) {
    const [timeSpent, setTimeSpent] = useState(0); // 페이지에 머문 시간

    const [liveSubtitles, setLiveSubtitles] = useState([]);  // 실시간 자막목록
    const [currentInput, setCurrentInput] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [recorder, setRecorder] = useState(new MicRecorder({ bitRate: 128 }));

    const startRecording = () => {
        recorder.start().then(() => {
            setIsRecording(true);
        }).catch((e) => console.error(e));
    };

    const stopRecording = async () => {
        try {
            const [buffer, blob] = await recorder.stop().getMp3();

            const formData = new FormData();
            formData.append('audio', blob, 'recording.mp3');

            // 发送音频数据到后台
            const response = await axios.post('http://localhost/api/audio/upload', formData);
            console.log('Audio sent successfully:', response.data);
        } catch (error) {
            console.error('Error sending audio:', error);
        }

        setIsRecording(false);
    };


    // const handleButtonClick = () => {
    //     console.log(`Button clicked for item: ${selectedItem}, AI: ${selectedAirole} , ME : ${selectedMyrole}`);
    //     setIsModalOpen(true); // 모달 열기
    // };




    const [recommendedQuestions, setRecommendedQuestions] = useState([]);

    // 대화 내용에 따라 추천 질문 업데이트
    const updateRecommendedQuestions = (conversation) => {
        // 대화 분석 로직 (가상 코드)
        // 예: const newQuestions = QuestionGenerator.getQuestionsBasedOnConversation(conversation);
        // setRecommendedQuestions(newQuestions);
    };

    // 대화 업데이트 시 추천 질문도 업데이트
    useEffect(() => {
        updateRecommendedQuestions(liveSubtitles);
    }, [liveSubtitles]);





    // STT 처리 함수 (가상 코드)
    const handleSpeechToText = (audioInput) => {
        // STT 서비스를 사용하여 오디오를 텍스트로 변환
        // 예: const text = STTService.convert(audioInput);
        // setCurrentInput(text);
    };

    // AI 응답 처리 함수 (가상 코드)
    const handleAIResponse = (inputText) => {
        // AI 서비스에 텍스트를 전달하고 응답을 받음
        // 예: const response = AIService.getResponse(inputText);
        // setLiveSubtitles([...liveSubtitles, { user: inputText, ai: response }]);
    };

    // 사용자 음성 입력이 들어올 때 처리
    useEffect(() => {
        if (currentInput) {
            handleAIResponse(currentInput);
        }
    }, [currentInput]);



    useEffect(() => {
        const timer = setInterval(() => {
            setTimeSpent(time => time + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // 시간을 분과 초로 변환하는 함수
    const formatTime = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}분 ${seconds}초`;
    };

    return (
        <>
        <Navigation2/>

        <div className="speaking-container">
            <div className="content-container">
                <div className="image-container">

                    <img src={ai5} alt="Example" width='70%' height='70%'/>
                    <div className="time-spent">
                        진행 시간: {formatTime(timeSpent)}
                    </div>
                    <div className="buttons-containerpp">
                        <button onClick={startRecording} disabled={isRecording}>Start Recording</button>
                        <button onClick={stopRecording} disabled={!isRecording}>Stop Recording</button>
                    </div>
                </div>
                <div className="subtitles-container">
                    <h3 style={{textAlign : 'center'}}>실시간 자막</h3>
                    <ul>
                        {liveSubtitles.map((subtitle, index) => (
                            <li key={index}>
                                사용자: {subtitle.user}<br/>
                                AI: {subtitle.ai}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="info-question-container">
            <div className="role-info">
                선택된 아이템: {selectedItem} <br />
                AI 역할: {selectedAiRole} <br />
                나의 역할: {selectedMyRole}
            </div>
            <div className="questions-container">
                <h3>추천 질문</h3>
                <ul>
                    {recommendedQuestions.map((question, index) => (
                        <li key={index}>{question}</li>
                    ))}
                </ul>
            </div>
        </div>
        </div>




            {/*<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>*/}
            {/*    <div style={{ textAlign: 'center', maxWidth: '500px', margin: 'auto' }}>*/}
            {/*        <h3 style={{ color: 'red', fontWeight: 'bold', fontSize: '30px', margin: '40px 0' }}>유의사항</h3>*/}

            {/*        <ul style={{ listStyle: 'none', marginLeft: '100',marginTop : '20', textAlign: 'left'}}>*/}
            {/*            <li style={{ fontWeight: 'bold', fontSize: '20px', margin: '10px 0' }}>1. 공부에 열심히 임할 것을 약속합니다.</li>*/}
            {/*            <li style={{ fontWeight: 'bold', fontSize: '20px', margin: '10px 0' }}>2. 어려움에도 포기하지 않습니다.</li>*/}
            {/*            <li style={{ fontWeight: 'bold', fontSize: '20px', margin: '10px 0' }}>3. 매일 꾸준히 학습합니다.</li>*/}
            {/*            <li style={{ fontWeight: 'bold', fontSize: '20px', margin: '10px 0' }}>4. 긍정적인 태도를 유지합니다.</li>*/}
            {/*            <li style={{ fontWeight: 'bold', fontSize: '20px', margin: '10px 0' }}>5. 시간 관리에 신경 씁니다.</li>*/}
            {/*            <li style={{ fontWeight: 'bold', fontSize: '20px', margin: '10px 0' }}>6. 수업에 적극적으로 참여합니다.</li>*/}
            {/*            <li style={{ fontWeight: 'bold', fontSize: '20px', margin: '10px 0' }}>7. 궁금한 점은 적극적으로 질문합니다.</li>*/}
            {/*            <li style={{ fontWeight: 'bold', fontSize: '20px', margin: '10px 0' }}>8. 동료 학습자를 존중합니다.</li>*/}
            {/*            <li style={{ fontWeight: 'bold', fontSize: '20px', margin: '10px 0' }}>9. 건강한 생활 습관을 유지합니다.</li>*/}
            {/*            <li style={{ fontWeight: 'bold', fontSize: '20px', margin: '10px 0' }}>10. 목표를 세우고 이를 따릅니다.</li>*/}
            {/*        </ul>*/}

            {/*        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>*/}
            {/*            <button*/}
            {/*                onClick={() => {*/}
            {/*                    setIsModalOpen(false);*/}
            {/*                    handlePageChange();*/}
            {/*                }}*/}
            {/*                style={{*/}
            {/*                    padding: '12px 24px',*/}
            {/*                    marginRight: '80px',*/}
            {/*                    backgroundColor: 'lightblue',*/}
            {/*                    border: 'none',*/}
            {/*                    borderRadius: '5px',*/}
            {/*                    cursor: 'pointer',*/}
            {/*                    fontWeight: 'bold',*/}
            {/*                    fontSize: '16px',*/}
            {/*                }}*/}
            {/*            >*/}
            {/*                확인*/}
            {/*            </button>*/}
            {/*            <button*/}
            {/*                onClick={() => setIsModalOpen(false)}*/}
            {/*                style={{*/}
            {/*                    padding: '12px 24px',*/}
            {/*                    backgroundColor: 'lightcoral',*/}
            {/*                    border: 'none',*/}
            {/*                    borderRadius: '5px',*/}
            {/*                    cursor: 'pointer',*/}
            {/*                    fontWeight: 'bold',*/}
            {/*                    fontSize: '16px'*/}
            {/*                }}*/}
            {/*            >*/}
            {/*                닫기*/}
            {/*            </button>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</Modal>*/}
        </>
    );
}

export default Speaking;
