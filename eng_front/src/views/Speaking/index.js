import React, {useState, useEffect} from 'react';
import './Speaking.css';
import ai5 from './images/ai5.png';
import Navigation from "../Navigation";
import Modal from "../Speech/Modal";
import MicRecorder from "mic-recorder-to-mp3";
import axios from "axios";
import {useNavigate, useLocation} from "react-router-dom";
import mic from './images/mic.png';
import micno from './images/micno.png';
import ModalResult from "./ModalResult";
import subtitle from "./images/subtitle.png";
import subtitleno from "./images/subtitleno.png";

function Speaking({selectedItem, selectedAiRole, selectedMyRole}) {
    const [timeSpent, setTimeSpent] = useState(300); // 페이지에 머문 시간

    // 녹음
    const [isRecording, setIsRecording] = useState(false);
    const [recorder, setRecorder] = useState(new MicRecorder({bitRate: 128}));

    // 모달  1,2
    const [isModalOpen, setIsModalOpen] = useState(false); // 대화 5분 채오면 자동으로 나오는 모달
    const [isModal2Open, setIsModal2Open] = useState(false); // 5분 안 채우고 대화 종료 버튼 누르면 나오는 모달

    // 자막
    const [liveSubtitles, setLiveSubtitles] = useState([]); // 실시간 자막
    const [recommendedQuestions, setRecommendedQuestions] = useState([]); // 상황에 맞는 추천 질문
    const [correctGrammar , setCorrectGrammer] = useState([]); // 문법 고치는 자막
    const [showSubtitles, setShowSubtitles] = useState(true); // 자막 컨테이너들 전체
    
    // 사진과 자막 컨테이너의 동적 스타일을 위한 클래스
    const imageContainerClass = showSubtitles ? "image-container" : "image-container expanded";
    const subtitlesContainerClass = showSubtitles ? "subtitles-container" : "subtitles-container hidden";

    // 프론트에서 세션 uid 가져오기
    const userNum = sessionStorage.getItem('userNum');

    const navigate = useNavigate(); // useNavigate 훅 사용

    const location = useLocation();
    const crid = location.state?.crid; // 채팅방 생성시에 전달 받은 crid 전달 받아서 서버에 넘겨줌
    const speaker =null;

    // 컴포넌트 마운트 시와 일정한 간격으로 자막을 가져오기 위해 useEffect 사용
    useEffect(() => {
        fetchSubtitles(); // 컴포넌트 마운트 시 자막 가져오기

        const subtitleInterval = setInterval(() => {
            fetchSubtitles(); // 일정한 간격으로 자막 가져오기 (필요에 따라 간격 조절)
        }, 1000); // 1초마다 가져오도록 설정. 필요에 따라 조절하세요.

        // 컴포넌트 언마운트 시 간격 정리
        return () => clearInterval(subtitleInterval);
    }, [crid]);

    // 올바른 문법 자막 업데이트
    useEffect(() => {
        correctGrammer("Corrected grammar"); // 컴포넌트 마운트 시 자막 가져오기

        const subtitleInterval = setInterval(() => {
            correctGrammer("Corrected grammar"); // 일정한 간격으로 자막 가져오기 (필요에 따라 간격 조절)
        }, 1000); // 1초마다 가져오도록 설정. 필요에 따라 조절하세요.

        // 컴포넌트 언마운트 시 간격 정리
        return () => clearInterval(subtitleInterval);
    }, [crid]);

    // 대화 업데이트 시 추천 질문도 업데이트
    useEffect(() => {
        const subtitleInterval = setInterval(() => {
            updateRecommendedQuestions("recommend");
        }, 200000); // 2분 마다 업데이트
        return () => clearInterval(subtitleInterval);
    }, [crid]);

    // 일정한 간격으로 서버에서 자막을 가져오는 함수
    const fetchSubtitles = async () => {
        try {
            const response = await axios.post('http://localhost/chatting/content', {crid});
            // console.log('자막 응답:', response.data); // 응답 로깅
            setLiveSubtitles(response.data);
        } catch (error) {
            console.error('자막을 가져오는 중 오류 발생:', error);
        }
    };

    // 대화 내용에 따라 추천 질문 업데이트
    const updateRecommendedQuestions = async (speaker) => {
        try {
            const response = await axios.post('http://localhost/chat-gpt/recommend', {crid, speaker, userNum});
            // console.log('자막 응답:', response.data); // 응답 로깅
            setRecommendedQuestions(response.data);
            // console.log('recommendedQuestions:', recommendedQuestions);
        } catch (error) {
            console.error('자막을 가져오는 중 오류 발생:', error);
        }
    };

    // 문법 고친 자막 업데이트
    const correctGrammer = async (speaker) => {
        try {
            const response = await axios.post('http://localhost/chatting/grammar', {crid, speaker, userNum});
            // console.log('자막 응답:', response.data); // 응답 로깅
            setCorrectGrammer(response.data);
            // console.log('recommendedQuestions:', recommendedQuestions);
        } catch (error) {
            console.error('자막을 가져오는 중 오류 발생:', error);
        }
    };


    // 페이지에 머문 시간을 추적하는 useEffect
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

    // 시간을 분과 초로 변환하는 함수
    const formatTime = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}분 ${seconds}초`;
    };

    const handleTimeLimitReached = () => {
        // 모든 기능 종료 로직 (예: 녹음 중지, 타이머 정지 등)
        if (isRecording) {
            stopRecording(); // 녹음 중지
        }

        setIsModalOpen(true); // 모달 열기
    };

    // 녹음
    const toggleRecording = () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

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
            formData.append('userNum', userNum); // 세션에 저장된 uid

            // 发送音频数据到后台
            const response = await axios.post('http://localhost/api/audio/upload', formData, {
                responseType: 'arraybuffer', // 设置响应类型为二进制数组
            });

            if (response.status === 200) {
                const audioBlob = new Blob([response.data], {type: 'audio/mp3'});
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

    const toggleSubtitles = () => {
        setShowSubtitles(!showSubtitles);
    };

    return (
        <>
            <Navigation/>

            <div className="speaking-container">
                <div className={imageContainerClass}>
                    <img src={ai5} alt="Speaking Example"/>
                </div>

                {showSubtitles && (
                    <>
                        <div className={subtitlesContainerClass}>
                            <h3>실시간 자막</h3>
                            <ul>
                                {liveSubtitles.map((subtitle, index) => (
                                    <li key={index}>
                                        {subtitle.SPEAKER}: {subtitle.CONTENT}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className='mrt'>
                            <div className="typo-correction-container">
                                <b>유저의 Speech를 Text로 수정한 문장!<br/>문법이 틀리면 고쳐서 출력돼요</b>
                                <ul>
                                    {correctGrammar.map((subtitle, index) => (
                                        <li key={index}>
                                            {subtitle.CONTENT}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="question-suggestion-container">
                            <b>2분마다 유저가 선택한 상황에<br/>대해 추천 질문이 떠요</b>
                            <ul>
                                {recommendedQuestions.map((subtitle, index) => (
                                    <li key={index}>
                                        {subtitle.CONTENT}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}

                <div className='mrts'>
                    <div className={`buttons-containerpp ${!showSubtitles ? "buttons-hidden-subtitles" : ""}`}>
                        <button onClick={toggleRecording} className={isRecording ? "recording-active" : ""}>
                            <img src={isRecording ? mic : micno} alt={isRecording ? "중지" : "시작"} style={{ width: '35px', height: '35px' }}/>
                        </button>
                        <button onClick={toggleSubtitles}>
                            <img src={showSubtitles ? subtitle : subtitleno} alt={showSubtitles ? "자막 숨기기" : "자막 보이기"}
                                 style={{ width: '35px', height: '35px' }}/>
                        </button>
                        <button onClick={() => setIsModal2Open(true)}>
                            {formatTime(timeSpent)}
                            <br/>
                            <div style={{color : 'blueviolet'}}>대화 종료</div>
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
