import React, {useEffect, useRef, useState} from 'react';
import logo from './images/logo.png'
import logoXlogo from './images/logoXlogo.png';
import {Link} from 'react-router-dom';
import './Style.css';
import '../../../App.css'
import smile from './images/smile.png';
import Typography from "@mui/joy/Typography";
import down from './images/down.png'
import leveltest from './images/leveltest.png';
import speech from './images/speech.png';
import wordtest from './images/wordtest.png';

function Header() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    let scrollInterval; // 스크롤 인터벌을 저장할 변수

    const stopScrolling = () => {
        clearInterval(scrollInterval); // 인터벌 중단
        setIsScrolling(false); // 스크롤 상태 업데이트
    };

    const scrollToBottom = () => {
        clearInterval(scrollInterval); // 기존 인터벌 정리

        let totalScrollDistance = document.body.scrollHeight - window.scrollY;
        let scrollStep = 100; // 고정된 스크롤 단계 값

        scrollInterval = setInterval(() => {
            if (window.scrollY < document.body.scrollHeight - window.innerHeight) {
                window.scrollBy(0, scrollStep);
            } else {
                stopScrolling();
            }
        }, 100);

        setIsScrolling(true); // 스크롤 시작
    };

    // useEffect(() => {
    //     if (isScrolling) {
    //         document.addEventListener('wheel', stopScrolling);
    //         document.addEventListener('click', stopScrolling);
    //     } else {
    //         document.removeEventListener('wheel', stopScrolling);
    //         document.removeEventListener('click', stopScrolling);
    //     }
    //
    //     return () => {
    //         clearInterval(scrollInterval); // 컴포넌트 언마운트 시 인터벌 정리
    //         document.removeEventListener('wheel', stopScrolling);
    //         document.removeEventListener('click', stopScrolling);
    //     };
    // }, [isScrolling, scrollInterval]);

    return (
        <div className='App'>
            <div>
                <header className="masthead">
                    <img src={down} alt='down' onClick={scrollToBottom} className="scrd"/>
                    <div className="container d-flex align-items-center flex-column">
                        <img className="masthead-avatar mb-3" src={logo} alt="..." style={{maxWidth: '120px'}}/>
                        <h1 className="masthead-heading mb-2">Are You Teacher?</h1>
                        <p className="masthead-subheading mb-2" style={{fontWeight: 'bold'}}>
                            AI와 함께하는 영어 학습 여정
                        </p>
                        <p className="masthead-subheading mb-3">
                            당신의 언어 능력을 한 단계 업그레이드하세요!
                        </p>
                    </div>
                </header>
            </div>

            <div style={{marginTop: '100px'}}/>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '40px',
                marginLeft: '280px',
                marginBottom: '10px'
            }}>
                <img src={logo} alt="..." style={{marginRight: '1px', width: '80px', height: '80px'}}/>
                <h5 id="study" style={{fontWeight: 'bold', fontSize: '26px', color: '#132650'}}>학습 종류</h5>
            </div>

            <div className="grid-container" style={{maxWidth: '1200px', margin: 'auto', padding: '0 40px'}}>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', padding: '20px', gap: '100px'}}>
                    {/*<div style={{*/}
                    {/*    display: 'flex',*/}
                    {/*    alignItems: 'center',*/}
                    {/*    justifyContent: 'center',*/}
                    {/*    height: '30vh',*/}
                    {/*    flexDirection: 'column'*/}
                    {/*}}>*/}
                    {/*    <Typography level="h1" fontWeight="xl" fontSize="clamp(1rem, 0.9rem + 0.8vw, 2rem)"*/}
                    {/*                className="rainbow-text">*/}
                    {/*        간단한 레벨테스트와<br/> 내 맞춤 AI선생님이<br/> 항시 대기*/}
                    {/*    </Typography>*/}
                    {/*    <img src={smile} alt='smile' width='80px' height='auto'*/}
                    {/*         style={{marginTop: '-15px', marginLeft: '95px'}}/>*/}
                    {/*</div>*/}

                    <Link to='/leveltest' style={{textDecoration: 'none', color: 'inherit'}}>
                        <div style={{
                            border: '2px solid #132650',
                            borderRadius: '10px',
                            boxShadow: '0 6px 10px rgba(0,0,0,0.1)',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            aspectRatio: '1 / 1',
                            width: '80%',
                            backgroundColor: 'white'
                        }}>
                            <div style={{padding: '15px', textAlign: 'center'}}>
                                <h5 style={{marginBottom: '25px', fontStyle : 'bold'}}>레벨 테스트</h5>
                                <img src={leveltest} alt="Speech"
                                     style={{width: '80px', height: '80px', objectFit: 'cover', margin: '0 auto'}}/>
                                <p style={{marginTop: '25px', color: '#132650', fontSize: '13px'}}>당신의 레벨을 테스트 할 수
                                    있습니다!</p>
                            </div>
                        </div>
                    </Link>


                    <Link to='/speech' style={{textDecoration: 'none', color: 'inherit'}} className="grid-item">
                        <div onClick={() => setModalOpen(true)} style={{
                            border: '2px solid #132650',
                            borderRadius: '10px',
                            boxShadow: '0 6px 10px rgba(0,0,0,0.1)',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            aspectRatio: '1 / 1',
                            width: '80%',
                            backgroundColor: 'white'
                        }}>
                            <div style={{padding: '15px', textAlign: 'center'}}>
                                <h5 style={{marginBottom: '25px', fontStyle : 'bold'}}>스피치</h5>
                                <img src={speech} alt="Speech"
                                     style={{width: '80px', height: '80px', objectFit: 'cover', margin: '0 auto'}}/>
                                <p style={{marginTop: '23px', color: '#132650', fontSize: '14px'}}>스피킹을 합니다!</p>
                            </div>
                        </div>
                    </Link>


                    <Link to='/vocaTest' style={{textDecoration: 'none', color: 'inherit'}}>
                        <div style={{
                            border: '2px solid #132650',
                            borderRadius: '10px',
                            boxShadow: '0 6px 10px rgba(0,0,0,0.1)',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            aspectRatio: '1 / 1',
                            width: '80%',
                            backgroundColor: 'white'
                        }}>
                            <div style={{padding: '15px', textAlign: 'center'}}>
                                <h5 style={{marginBottom: '25px', fontStyle : 'bold'}}>단어 시험</h5>
                                <img src={wordtest} alt="Speech"
                                     style={{width: '80px', height: '80px', objectFit: 'cover', margin: '0 auto'}}/>
                                <p style={{marginTop: '25px', color: '#132650', fontSize: '14px'}}>검색을 통한 단어로 시험을 봅니다.</p>
                            </div>
                        </div>
                    </Link>

                </div>
            </div>

            {/*밑에*/}
            <div style={{marginTop: '150px'}}/>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '40px',
                marginLeft: '280px',
                marginBottom: '50px'
            }}>
                <img src={logo} alt="..." style={{marginRight: '1px', width: '80px', height: '80px'}}/>
                <h5 id="study" style={{fontWeight: 'bold', fontSize: '26px', color: '#132650'}}>Open AI 기술 사용</h5>
            </div>

            <div style={{maxWidth: '1200px', margin: 'auto', padding: '0 40px'}}>
                <div className="process-grid-container"
                     style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px'}}>

                    <div style={{
                        alignContent: 'center',
                        width: '600px',
                        height: '150px',
                        border: '2px solid #132650',
                        borderRadius: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '15px',
                        backgroundColor: 'white'
                    }}>
                        <div>
                            <h1 style={{fontWeight: 'bold', color: '#4A90E2', marginBottom: '5px'}}>01</h1>
                            <h5 style={{margin: '0', color: '#132650'}}>사용자가 원하는<br/><b>상황</b>과 <b>역할</b> 선택</h5>
                        </div>
                    </div>

                    <div style={{alignSelf: 'stretch', display: 'flex', alignItems: 'center'}}>
                        <i className="fas fa-arrow-right" style={{fontSize: '24px', color: '#4A90E2'}}></i>
                    </div>

                    <div style={{
                        alignContent: 'center',
                        width: '600px',
                        height: '150px',
                        border: '2px solid #132650',
                        borderRadius: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '15px',
                        backgroundColor: 'white'
                    }}>
                        <div>
                            <h1 style={{fontWeight: 'bold', color: '#4A90E2', marginBottom: '5px'}}>02</h1>
                            <h5 style={{margin: '0', color: '#132650'}}>웹 마이크로 <b>음성</b><br/><b>인식</b> 후 전달</h5>
                        </div>
                    </div>

                    <div style={{alignSelf: 'stretch', display: 'flex', alignItems: 'center'}}>
                        <i className="fas fa-arrow-right" style={{fontSize: '24px', color: '#4A90E2'}}></i>
                    </div>

                    <div style={{
                        alignContent: 'center',
                        width: '600px',
                        height: '150px',
                        border: '2px solid #132650',
                        borderRadius: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '15px',
                        backgroundColor: 'white'
                    }}>
                        <div>
                            <h1 style={{fontWeight: 'bold', color: '#4A90E2', marginBottom: '5px'}}>03</h1>
                            <h5 style={{margin: '0', color: '#132650'}}><b>Open AI</b>를<br/>활용해 답변 생성</h5>
                        </div>
                    </div>

                    <div style={{alignSelf: 'stretch', display: 'flex', alignItems: 'center'}}>
                        <i className="fas fa-arrow-right" style={{fontSize: '24px', color: '#4A90E2'}}></i>
                    </div>

                    <div style={{
                        alignContent: 'center',
                        width: '600px',
                        height: '150px',
                        border: '2px solid #132650',
                        borderRadius: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '15px',
                        backgroundColor: 'white'
                    }}>
                        <div>
                            <h1 style={{fontWeight: 'bold', color: '#4A90E2', marginBottom: '5px'}}>04</h1>
                            <h5 style={{margin: '0', color: '#132650'}}><b>TTS</b> 로<br/>AI 선생님 듣기</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <img src={logoXlogo} alt="Logo"/>
                <div style={{color: '#1D2B64', fontWeight: 'bold'}}>
                    <h4 style={{lineHeight: 2.0}}>인공지능을 개발하며 안전한 AGI 개발을 추구하는 미국의 비영리 단체이며,
                        <br/>대형 언어 모델 (LLM)과 이를 기반으로 하는 ChatGPT 등의 소프트웨어를 제공</h4>
                </div>
            </div>
        </div>
    )
}

export default Header