import React, {useState, useEffect, useRef} from 'react';
import './Speaking.css';
import ai5 from '../../../../../../../Desktop/move/Speaking/images/ai5.png';
import Navigation from "../Navigation";
import Modal from "../Speech/Modal";
import MicRecorder from "mic-recorder-to-mp3";
import axios from "axios";
import {useNavigate, useLocation} from "react-router-dom";
import mic from '../../../../../../../Desktop/move/Speaking/images/mic.png';
import micno from '../../../../../../../Desktop/move/Speaking/images/micno.png';
import time_finish from '../../../../../../../Desktop/move/Speaking/images/time_finish.png';
import ModalResult from "../../../../../../../Desktop/move/Speaking/ModalResult";
import subtitle from "../../../../../../../Desktop/move/Speaking/images/subtitle.png";
import subtitleno from "../../../../../../../Desktop/move/Speaking/images/subtitleno.png";
import ModalStart2 from "../../../../../../../Desktop/move/Speaking/ModalStart2";
import '../../App.css';
import './ModalStart2.css'

import aimale from "../../../../../../../Desktop/move/Speaking/images/aimale.mp4";
import aifemale from "../../../../../../../Desktop/move/Speaking/images/aifemale.mp4";

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

    const [startModalOpen2, setStartModalOpen2] = useState(false);
    
    // 사진과 자막 컨테이너의 동적 스타일을 위한 클래스
    const imageContainerClass = showSubtitles ? "image-container" : "image-container expanded";
    const subtitlesContainerClass = showSubtitles ? "subtitles-container" : "subtitles-container hidden";

    const navigate = useNavigate(); // useNavigate 훅 사용

    // 프론트에서 세션 uid 가져오기
    const userNum = sessionStorage.getItem('userNum');

    const location = useLocation();
    const crid = location.state?.crid; // 채팅방 생성시에 전달 받은 crid 전달 받아서 서버에 넘겨줌
    const speaker =null;

    // 남자 여자 확인
    const gender = location.state?.gender;
    const videoSource = gender === 0 ? aimale : aifemale;

    const videoRef = useRef(null);

    useEffect(() => {
        setStartModalOpen2(true);
    }, []);

    const Close2 = () => {
        setStartModalOpen2(false);
    };

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

                videoRef.current.play();
                audioElement.addEventListener('ended', () => {
                    videoRef.current.pause();
                });
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

            <ModalStart2 isOpen={startModalOpen2} onClose={Close2}>
                <div style={{ maxWidth: '600px', margin: 'auto' }}>
                    <h3 className='gh' style={{textAlign: 'center'}}>사용방법 안내</h3>

                    <div className="micq">
                        <img src={mic} alt='mic' width='25px' height='25px'/>  <img src={micno} alt='mic' width='25px' height='25px'/>
                        <p>마이크를 켜거나 끌 수 있습니다.</p>

                        <img src={subtitle} alt='subtitle' width='25px' height='25px'/>  <img src={subtitleno} alt='subtitleno' width='32px' height='32px'/>
                        <p>실시간으로 대화내용을 보거나 끌 수 있습니다.</p>

                        <img src={time_finish} alt='time_finish' width='40px' height='35px'/>
                        <p>남은 시간을 확인하며 클릭 시, 대화가 종료됩니다.</p>

                        <div className='redcss'>
                            <span style={{color : 'black',fontSize : '25px'}}> ※ </span> 대화내용을 끄게 되면 오타섹션과 질문추천 섹션도 함께 닫힙니다.<br/>
                            <span style={{color : 'black',fontSize : '25px'}}> ※ </span>  마이크를 켜면 시간이 줄어들며, 멈추면 시간이 줄어들지 않습니다.
                        </div>

                    </div>

                    <div className="fooha">
                        <button onClick={() => setStartModalOpen2(false)} className="qwer">확인</button>
                    </div>
                </div>
            </ModalStart2>

            <div className="speaking-container">
                <div className={imageContainerClass}>
                    <video ref={videoRef} width="580" height="580" loop muted autoPlay={false} className='vvi'>
                        <source src={videoSource} type="video/mp4" />
                    </video>
                </div>

                {showSubtitles && (
                    <>
                        <div className={`${subtitlesContainerClass} junghunsub`}>
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
                            <div className="typo-correction-container junghunerr">
                                <b>유저의 Speech를 Text로 수정한 문장!<br/>문법이 틀리면 고쳐서 출력돼요</b>
                                    {correctGrammar.map((subtitle, index) => (
                                        <div key={index}>
                                            {subtitle.CONTENT}
                                        </div>
                                    ))}
                            </div>
                        </div>




                        <div className="question-suggestion-container junghun">
                            <b>2분마다 유저가 선택한 상황에<br/>대해 추천 질문이 떠요</b>
                                {recommendedQuestions.map((subtitle, index) => (
                                    <div key={index}>
                                        {subtitle.CONTENT}
                                    </div>
                                ))}
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
