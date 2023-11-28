import React, { useState, useEffect } from 'react';
import './Speaking.css';
import ai5 from './images/ai5.png';
import Navigation from "../Navigation";
import Modal from "./Modal";
import ModalResult from "./ModalResult";
import MicRecorder from "mic-recorder-to-mp3";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import mic from './images/mic.png';
import micno from './images/micno.png';

function Speaking({ selectedItem, selectedAiRole, selectedMyRole }) {
    const [timeSpent, setTimeSpent] = useState(300);

    // const [liveSubtitles, setLiveSubtitles] = useState([]);  // 실시간 자막목록
    const [currentInput, setCurrentInput] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [recorder, setRecorder] = useState(new MicRecorder({ bitRate: 128 }));
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
    const [isModal2Open, setIsModal2Open] = useState(false); // modal2 상태


    const [showSubtitles, setShowSubtitles] = useState(true);

    const navigate = useNavigate(); // useNavigate 훅 사용

    const toggleRecording = () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };



    // 자막 토글 함수
    const toggleSubtitles = () => {
        setShowSubtitles(!showSubtitles);
    };

    // 테스트용 자막 데이터
    const initialSubtitles = [
        { user: "사용자 대화 내용 1", ai: "AI 대답 1" },
        { user: "사용자 대화 내용 2", ai: "AI 대답 2" },
        // 추가적인 테스트 데이터...
    ];

    // useState를 사용하여 초기 자막 상태 설정
    const [liveSubtitles, setLiveSubtitles] = useState(initialSubtitles);


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
            const response = await axios.post('http://localhost/api/audio/upload', formData, {
                responseType: 'arraybuffer', // 设置响应类型为二进制数组
            });

            if (response.status === 200) {
                const audioBlob = new Blob([response.data], { type: 'audio/mp3' });
                const url = URL.createObjectURL(audioBlob);
                console.log('Audio sent successfully:', url);

                // 直接播放音频
                const audioElement = new Audio(url);
                audioElement.play();
            } else {
                console.error('Failed to send audio. Status code:', response.status);
            }
        } catch (error) {
            console.error('Error sending audio:', error);
        }

        setIsRecording(false);
        console.log('Recording stopped');
    };



    const handleTimeLimitReached = () => {
        // 모든 기능 종료 로직 (예: 녹음 중지, 타이머 정지 등)
        if (isRecording) {
            stopRecording(); // 녹음 중지
        }

        setIsModalOpen(true); // 모달 열기
    };




    useEffect(() => {
        let timer;
        if (isRecording && timeSpent > 0) {
            // 녹음 중이고 시간이 남아 있을 때만 시간 감소
            timer = setInterval(() => {
                setTimeSpent(time => time - 1);
            }, 1000);
        } else if (!isRecording || timeSpent === 0) {
            // 녹음이 중지되거나 시간이 0에 도달했을 때 호출
            clearInterval(timer);
            if (timeSpent === 0) {
                handleTimeLimitReached();
            }
        }

        // 컴포넌트가 언마운트 되거나 isRecording, timeSpent가 변경될 때 타이머 정리
        return () => clearInterval(timer);
    }, [isRecording, timeSpent]);

    useEffect(() => {
        // 시간이 0초가 되면 모달창을 띄우는 로직
        if (timeSpent === 0 && !isModalOpen) {
            handleTimeLimitReached();
        }
    }, [timeSpent, isModalOpen]); // 의존성 배열에 isModalOpen을 추가



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


    // 시간을 분과 초로 변환하는 함수
    const formatTime = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}분 ${seconds}초`;
    };

    // 자막 컨테이너 및 이미지 컨테이너의 클래스를 조건부로 설정
    const imageContainerClass = showSubtitles ? "image-container" : "image-container expanded";
    const subtitlesContainerClass = showSubtitles ? "subtitles-container" : "subtitles-container hidden";

    return (
        <>
            <Navigation/>

            <div className="speaking-container">
                <div className={imageContainerClass}>
                    <img src={ai5} alt="Speaking Example" />
                </div>

                {showSubtitles && (
                    <>
                        <div className={subtitlesContainerClass}>
                            <h3>실시간 자막</h3>
                            <ul>
                                {liveSubtitles.map((subtitle, index) => (
                                    <li key={index}>
                                        사용자: {subtitle.user}<br/>
                                        AI: {subtitle.ai}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className='mrt'>
                            <div className="typo-correction-container">
                                오타
                            </div>
                        </div>

                        <div className="question-suggestion-container">
                            질문 추천
                        </div>
                    </>
                )}

                <div className='mrts'>
                    <div className={`buttons-containerpp ${!showSubtitles ? "buttons-hidden-subtitles" : ""}`}>
                    <button onClick={toggleRecording}>
                        <img src={isRecording ? mic : micno} alt={isRecording ? "중지" : "시작"}
                             style={{ width: '50px', height: '50px' }}/>
                    </button>
                    <button onClick={toggleSubtitles}>
                        {showSubtitles ? "자막 숨기기" : "자막 보이기"}
                    </button>
                    <button onClick={() => setIsModal2Open(true)}>
                        {formatTime(timeSpent)}
                        <br/>
                        대화 종료
                    </button>
                </div>
            </div>
            </div>




            {/*이 부분은 모달창*/}
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    {/* 모달의 전체 내용을 여기에 배치 */}
                    <h2 className="modal-title">알림</h2>
                    <div className="modal-body">
                        <p>5분이 지났습니다. 메인 화면으로 돌아갑니다.</p>
                        <p>지정된 시간이 초과되었습니다. 메인 화면으로 돌아가서 다시 시작하세요.</p>
                        <p>현재 진행 시간: {formatTime(timeSpent)}</p>
                    </div>
                    <button className="modal-button" onClick={() => {
                        setIsModalOpen(false); // 모달 상태를 false로 설정하여 닫음
                        navigate('/main'); // 메인 화면으로 이동
                    }}>확인</button>
                </Modal>
            )}


            {isModal2Open && (
                <ModalResult isOpen={isModal2Open} onClose={() => setIsModal2Open(false)}>
                    {/* 모달창 내용 */}
                    <h2 className="modal-title">대화 종료</h2>
                    <div className="modal-body">
                        <p>대화가 종료되었습니다.</p>
                        {/* 추가 내용 */}
                    </div>
                    <button className="modal-button" onClick={() => {
                        setIsModal2Open(false); // 모달 상태를 false로 설정하여 닫음
                        navigate('/main'); // 메인 화면으로 이동
                    }}>확인</button>
                </ModalResult>
            )}
        </>
    );
}

export default Speaking;