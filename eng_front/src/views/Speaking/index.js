import React, {useState, useEffect, useRef} from 'react';
import './Speaking.css';
import Navigation from "../Navigation";
import Modal from "../Speech/Modal";
import MicRecorder from "mic-recorder-to-mp3";
import axios from "axios";
import {useNavigate, useLocation} from "react-router-dom";
import mic from './images/mic.png';
import micno from './images/micno.png';
import time_finish from './images/time_finish.png';
import ModalResult from "./ModalResult";
import subtitle from "./images/subtitle.png";
import subtitleno from "./images/subtitleno.png";
import ModalStart2 from "./ModalStart2";
import '../../App.css';
import './ModalStart2.css'
import aimale from "./images/aimale.mp4";
import aifemale from "./images/aifemale.mp4";
import loginImg from "../Speech/images/loginImg.png";

function Speaking({selectedItem, selectedAiRole, selectedMyRole}) {
    const [timeSpent, setTimeSpent] = useState(300); // 페이지에 머문 시간

    // 녹음
    const [isRecording, setIsRecording] = useState(false);
    const [recorder, setRecorder] = useState(new MicRecorder({bitRate: 128}));

    // 모달  1,2,3
    const [isModalOpen, setIsModalOpen] = useState(false); // 대화 5분 채오면 자동으로 나오는 모달
    const [isModal2Open, setIsModal2Open] = useState(false); // 5분 안 채우고 대화 종료 버튼 누르면 나오는 모달
    const [loginModalOpen, setLoginModalOpen] = useState(false);

    // 자막
    const [liveSubtitles, setLiveSubtitles] = useState([]); // 실시간 자막
    const [recommendedQuestions, setRecommendedQuestions] = useState([]); // 상황에 맞는 추천 질문
    const [correctGrammar, setCorrectGrammer] = useState([]); // 문법 고치는 자막
    const [showSubtitles, setShowSubtitles] = useState(true); // 자막 컨테이너들 전체

    const [startModalOpen2, setStartModalOpen2] = useState(false);
    const [isTurningOff, setIsTurningOff] = useState(false);
    const [inputSearch, setInputSearch] = useState('');

    // 사진과 자막 컨테이너의 동적 스타일을 위한 클래스
    const imageContainerClass = showSubtitles ? "image-container" : "image-container expanded";
    const subtitlesContainerClass = showSubtitles ? "subtitles-container" : "subtitles-container hidden";

    const navigate = useNavigate();

    // 프론트에서 세션 uid 가져오기
    const userNum = sessionStorage.getItem('userNum');

    const location = useLocation();
    const crid = location.state?.crid; // 채팅방 생성시에 전달 받은 crid 전달 받아서 서버에 넘겨줌
    const speaker = null;


    const [placeholder, setPlaceholder] = useState('한국어 입력');


    // 남자 여자 확인
    const gender = location.state?.gender;
    const videoSource = gender === 0 ? aimale : aifemale;

    // 단어장
    const [getWord, setGetWord] = useState([]);
    const [sourceLang, setSourceLang] = useState("ko");
    const [targetLang, setTargetLang] = useState("en");

    const videoRef = useRef(null);

    const [timeSpent2, setTimeSpent2] = useState(5000);

    useEffect(() => {
        const activationThreshold = 0; // 閾值，1 秒為 1000 毫秒
        const intervalId = setInterval(() => {
            if (timeSpent2 <= activationThreshold) {
                handleMicActivation();
                setTimeSpent2(60000); // 重設時間
            } else {
                // 減少時間
                setTimeSpent2((prevTime) => prevTime - 60000);
            }
        }, 60000); // 每秒觸發一次

        // 在組件卸載時清理計時器
        return () => clearInterval(intervalId);
    }, [timeSpent2]);


    const [currentSearchResults, setCurrentSearchResults] = useState([]);
    const [previousSearchResults, setPreviousSearchResults] = useState([]);


    const handleMicActivation = async () => {
        // 在這裡實現向後端發送消息的邏輯
        console.log('麥克風在 30 秒內未啟用。向後端發送消息。');

        try {

            // 发送音频数据到后台
            const response = await axios.post('http://localhost/api/audio/autoQuestion', null, {
                params: {
                    text: "ask me a question",
                    userNum: userNum,
                },
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

        setIsTurningOff(false);
        console.log('Recording stopped');
    };

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
        // setTimeSpent2(50000);

        recorder.start().then(() => {
            setIsRecording(true);
        }).catch((e) => console.error(e));
    };

    const stopRecording = async () => {

        setIsTurningOff(true);
        setIsRecording(false);

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

        setIsTurningOff(false);
        console.log('Recording stopped');
    };

    const toggleSubtitles = () => {
        setShowSubtitles(!showSubtitles);
    };

    const handleEndConversation = async () => {
        // Assuming you have userNum stored in a variable
        const userNum = sessionStorage.getItem('userNum');

        try {
            const response = await axios.post('http://localhost/user/addExperience', null, {
                params: {
                    userNum: userNum,
                    score: 300-timeSpent
                }
            });

            // Handle the response as needed
            console.log(response.data);

            setIsModal2Open(false);
            navigate('/main');
        } catch (error) {
            // Handle the error
            console.error('Error:', error);
        }
    };

    const searchBtn = async (event) => {
        event.preventDefault();

        try {
            // Papago API 호출
            const response = await fetch('http://localhost/api/papago', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({sourceLang, targetLang, search: inputSearch}),
            });

            if (response.ok) {
                const searchData = await response.text();

                // 새로운 검색 결과 저장
                const newResult = {query: inputSearch, result: searchData};

                // 이전 검색 결과 업데이트 (현재 검색 결과의 첫 번째 항목만 저장)
                if (currentSearchResults.length > 0) {
                    setPreviousSearchResults([currentSearchResults[0]]);
                }

                // 현재 검색 결과 업데이트 (새로운 결과를 맨 앞에 추가)
                setCurrentSearchResults([newResult]);

                // 검색 결과 저장 API 호출
                const data = {
                    crid,
                    unum: userNum,
                    word: inputSearch,
                    resultWord: searchData
                };

                const saveResponse = await fetch('http://localhost/voca/insert', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (saveResponse.ok) {
                    userWord();
                    console.log('successfully.');
                } else {
                    console.error('Failed.');
                }
                setInputSearch('');
            }
        } catch (error) {
            console.error('Papago Error:', error);
        }
    };

    // 단어장
    const userWord = async () => {
        try {
            const response = await axios.post('http://localhost/voca/getWord', {crid});
            console.log('응답:', response.data);
            setGetWord(response.data);
        } catch (error) {
            console.error('error: ', error);
        }
    };

    const changeLang = () => {

        setSourceLang((prevLang) => (prevLang === 'ko' ? 'en' : 'ko'));
        setTargetLang((prevLang) => (prevLang === 'ko' ? 'en' : 'ko'));
        setPlaceholder((prevLang) => (prevLang === '한국어 입력' ? '영어 입력' : '한국어 입력'));
    }

    return (
        <div className='App'>
            <Navigation/>
            <ModalStart2 isOpen={startModalOpen2} onClose={Close2}>
                <div style={{maxWidth: '600px'}}>
                    <h3 className='gh' style={{textAlign: 'center'}}>사용방법 안내</h3>
                    <h3 className='gh3'>AI와 함께하는 회화 공부</h3>
                    <div className="micq">
                        <div className="micq-flex">
                            <div style={{display: "flex", marginTop: "10px"}}>
                                <img src={mic} alt='mic' width='30px' height='30px'/>
                                <img src={micno} alt='mic' width='30px' height='30px'/>
                            </div>
                            <p>마이크 ON/OFF</p>
                        </div>
                        <div className="micq-flex">
                            <div style={{display: "flex", marginTop: "10px"}}>
                                <img src={subtitle} alt='subtitle' width='30px' height='30px'/>
                                <img src={subtitleno} alt='subtitleno' width='30px' height='30px'/>
                            </div>
                            <p>실시간 자막 확인 가능</p>
                        </div>
                        <div className="micq-flex">
                            <img src={time_finish} alt='time_finish' width='60px' height='60px'/>
                            <p>남은 시간 확인 및 클릭 시 대화 종료</p>
                            <div/>
                        </div>
                        <p>한글 또는 영어 단어 검색 가능</p>
                        <p>상황에 맞는 질문을 2분마다 제시</p>
                        <div className='redcss'>
                            자막을 닫으면 검색 섹션과 질문 추천 섹션도 닫힙니다<br/>
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
                        <source src={videoSource} type="video/mp4"/>
                    </video>
                </div>

                {showSubtitles && (
                    <>
                        <div className={`${subtitlesContainerClass} junghunsub`}>
                            <h3 style={{fontFamily: "'NotoSansKR-Medium', sans-serif"}}>실시간 자막</h3>
                            <ul>
                                {liveSubtitles.map((subtitle, index) => (
                                    <li key={index}>
                                        {subtitle.SPEAKER}: {subtitle.CONTENT}
                                    </li>
                                ))}
                            </ul>
                        </div>


                        <div className='mrt' style={{fontFamily: "'NotoSansKR-Medium', sans-serif"}}>
                            <div className="typo-correction-container">
                                <b style={{color: 'midnightblue'}}>검색 섹션</b>
                                <div className="search-container">
                                    <input
                                        type="text"
                                        value={inputSearch}
                                        onChange={(e) => setInputSearch(e.target.value)}
                                        className="search-input"
                                        placeholder={placeholder}
                                    />
                                    <button onClick={searchBtn} className="search-btn">검색</button>
                                    <button onClick={changeLang} className="lang-toggle-btn">한글/영어 전환</button>
                                </div>

                                <div className='searchResults'>
                                    {currentSearchResults.map((currentItem, index) => {
                                        const previousItem = previousSearchResults[index];
                                        return (
                                            <div key={index} className='resultRow'>
                                                <div
                                                    className='currentResult'> {currentItem.query} : {currentItem.result}</div>

                                                {previousItem && <div
                                                    className='previousResult'> {previousItem.query} : {previousItem.result}</div>}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>


                        <div className="question-suggestion-container junghun" style={{fontFamily: "'NotoSansKR-Medium', sans-serif"}}>
                            <b style={{color: 'midnightblue' }}>질문추천 섹션</b>
                            {recommendedQuestions.map((subtitle, index) => (
                                <div key={index}>
                                    {subtitle.CONTENT}
                                </div>
                            ))}
                        </div>
                    </>
                )}

                <div className='mrts' style={{fontFamily: "'NotoSansKR-Medium', sans-serif"}}>
                    <div className={`buttons-containerpp ${!showSubtitles ? "buttons-hidden-subtitles" : ""}`}>
                        <button onClick={toggleRecording}
                                className={`${isRecording ? "recording-active" : ""} ${isTurningOff ? "tuof" : ""}`}
                                disabled={isTurningOff}>
                            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <img src={isRecording ? mic : micno} alt={isRecording ? "중지" : "시작"}
                                     style={{width: '35px', height: '35px'}}/>
                                {isTurningOff && <span style={{fontSize: '10px'}}>대화 생성중..</span>}
                            </div>
                        </button>

                        <button onClick={toggleSubtitles}>
                            <img src={showSubtitles ? subtitle : subtitleno}
                                 alt={showSubtitles ? "자막 숨기기" : "자막 보이기"}
                                 style={{width: '35px', height: '35px'}}/>
                        </button>
                        <button onClick={() => setIsModal2Open(true)}>
                            {formatTime(timeSpent)}
                            <br/>
                            <div style={{color: 'blueviolet'}}>대화 종료</div>
                        </button>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <h2 className="modal-title" style={{fontFamily: "'NotoSansKR-Medium', sans-serif"}}>알림</h2>
                    <div className="modal-body" style={{fontFamily: "'NotoSansKR-Medium', sans-serif"}}>
                        <p>5분이 지났습니다. 메인 화면으로 돌아갑니다.</p>
                        <p>지정된 시간이 초과되었습니다. 메인 화면으로 돌아가서 다시 시작하세요.</p>
                        <p>현재 진행 시간: {formatTime(timeSpent)}</p>
                    </div>
                    <button className="modal-button" onClick={() => {
                        handleEndConversation();
                        setIsModalOpen(false);
                        navigate('/main');
                    }}>확인
                    </button>
                </Modal>
            )}

            {isModal2Open && (
                <ModalResult isOpen={isModal2Open} onClose={() => setIsModal2Open(false)}>

                    <h2 className="modal-title">대화 종료</h2>
                    <div className="modal-body">
                        <p>대화가 종료되었습니다.</p>
                    </div>
                    <button className="modal-button" onClick={() => {
                        handleEndConversation();
                        setIsModal2Open(false);
                        navigate('/main');
                    }}>확인
                    </button>
                </ModalResult>
            )}

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

export default Speaking;