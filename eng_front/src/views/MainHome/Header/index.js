import React, {useState} from 'react';
import logo from './images/logo.png';
import logoXlogo from './images/logoXlogo.png';
import { Link } from 'react-router-dom';
import './Style.css';
import aip from './images/헤더사진.png';
import '../../../App.css'
import smile from './images/smile.png';
import Typography from "@mui/joy/Typography";

function Header(){
    const [isModalOpen, setModalOpen] = useState(false);
    return (
        <>

            <div className='App'>
                <header className="masthead">
                    <div className="container d-flex align-items-center flex-column">
                        <img className="masthead-avatar mb-3" src={logo} alt="..." style={{ maxWidth: '120px' }}/>
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


            {/*<div className="d-flex justify-content-center align-items-center make" style={{ marginTop: '200px', color: '#132650' }}>*/}
            {/*    <div style={{ marginRight: '100px', marginBottom: '200px' }}>*/}
            {/*        <h2 style={{ fontWeight: 'bold' }}>실제 사람과 대화하듯</h2>*/}
            {/*        <h3 style={{ fontWeight: 'bold' }}>대화해보세요!</h3>*/}

            {/*    </div>*/}
            {/*    <img src={aip} alt="Description" style={{ width: '500px', height: 'auto' }} />*/}
            {/*</div>*/}

            <div style={{marginTop : '100px'}}/>

            {/*<div style={{ background : 'linear-gradient(to right, #89C4F4, #1D2B64)'}}>*/}
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '40px', marginLeft: '180px', marginBottom : '10px'}}>
                <img src={logo} alt="..." style={{ marginRight: '1px', width: '80px', height: '80px' }} />
                <h5 id="study" style={{ fontWeight: 'bold', fontSize: '26px', color: '#132650' }}>학습 종류</h5>
            </div>



            <div className="grid-container" style={{ maxWidth: '1200px', margin: 'auto', padding: '0 40px'}}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', padding: '20px', gap: '100px' }}>


                    <div style = {{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '30vh', flexDirection : 'column'}}>

                        <Typography level="h1" fontWeight="xl" fontSize="clamp(1rem, 0.9rem + 0.8vw, 2rem)" className="rainbow-text"
                        >
                            간단한 레벨테스트와<br/> 내 맞춤 AI선생님이<br/> 항시 대기
                        </Typography>

                        <img src={smile} alt='smile' width='80px' height='auto' style={{marginTop : '-15px', marginLeft : '95px'}}/>
                    </div>

                    {/* 첫 번째 행 */}
                    <Link to='/leveltest' style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ border: '2px solid #132650', borderRadius: '10px',
                            boxShadow: '0 6px 10px rgba(0,0,0,0.1)', overflow: 'hidden', cursor: 'pointer', aspectRatio: '1 / 1', width: '80%', backgroundColor : 'white' }}>
                            <div style={{ padding: '15px', textAlign: 'center' }}>
                                <h5 style={{ marginBottom: '10px' }}>레벨 테스트</h5>
                                <img src={logo} alt="Speech" style={{ width: '80px', height: '80px', objectFit: 'cover', margin: '0 auto' }} />
                                <p style={{ marginTop: '10px', color: '#132650', fontSize: '14px' }}>당신의 레벨을 테스트 할 수 있습니다!</p>
                            </div>
                        </div>
                    </Link>

                    {/* 두 번째 행 */}
                    <Link to='/speech' style={{ textDecoration: 'none', color: 'inherit' }} className="grid-item">
                        <div onClick={() => setModalOpen(true)} style={{ border: '2px solid #132650', borderRadius: '10px',
                            boxShadow: '0 6px 10px rgba(0,0,0,0.1)', overflow: 'hidden', cursor: 'pointer', aspectRatio: '1 / 1', width: '80%', backgroundColor : 'white' }}>
                            <div style={{ padding: '15px',textAlign: 'center'  }}>
                                <h5 style={{ marginBottom: '10px'}}>Speech</h5>
                                <img src={logo} alt="Speech" style={{ width: '80px', height: '80px', objectFit: 'cover', margin: '0 auto' }} />
                                <p style={{ marginTop: '10px', color: '#132650', fontSize: '14px'}}>스피킹을 합니다!</p>
                            </div>
                        </div>
                    </Link>

                    {/*/!* 세 번째 행 *!/*/}
                    {/*<Link to='/keyword' style={{ textDecoration: 'none', color: 'inherit' }} className="grid-item">*/}
                    {/*    <div onClick={() => setModalOpen(true)} style={{ border: '2px solid #132650', borderRadius: '10px',*/}
                    {/*        boxShadow: '0 6px 10px rgba(0,0,0,0.1)', overflow: 'hidden', cursor: 'pointer', aspectRatio: '1 / 1', width: '80%', backgroundColor : 'white' }}>*/}
                    {/*        <div style={{ padding: '15px', textAlign: 'center' }}>*/}
                    {/*            <h5 style={{ marginBottom: '10px' }}>Keyword</h5>*/}
                    {/*            <img src={logo} alt="Speech" style={{ width: '80px', height: '80px', objectFit: 'cover', margin: '0 auto' }} />*/}
                    {/*            <p style={{ marginTop: '10px', color: '#132650', fontSize: '14px' }}>키워드 시험을 봅니다!</p>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</Link>*/}
                </div>

            </div>
            {/*</div>*/}



            {/*밑에*/}
            <div style={{marginTop : '150px'}}/>



            <div style={{ display: 'flex', alignItems: 'center', marginTop: '40px', marginLeft: '180px', marginBottom : '50px'}}>
                <img src={logo} alt="..." style={{ marginRight: '1px', width: '80px', height: '80px' }} />
                <h5 id="study" style={{ fontWeight: 'bold', fontSize: '26px', color: '#132650' }}>Open AI 기술 사용</h5>
            </div>

            <div style={{ maxWidth: '1200px', margin: 'auto', padding: '0 40px' }}>
                <div className="process-grid-container" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>

                    {/* 첫 번째 행 */}
                    <div style={{ alignContent:'center', width: '600px', height: '150px', border: '2px solid #132650', borderRadius: '10px',  display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', backgroundColor: 'white' }}>
                        <div>
                            <h1 style={{ fontWeight: 'bold', color: '#4A90E2', marginBottom: '5px' }}>01</h1>
                            <h5 style={{ margin: '0', color: '#132650' }}>사용자가 원하는<br/><b>상황</b>과 <b>역할</b> 선택</h5>
                            {/*<p style={{ color: '#333' }}>으악 뭘로 해ㅋㅋㅋㅋㅋㅋㅋ</p>*/}
                        </div>
                        {/*<img src={logo} alt="Speech" style={{ width: '60px', height: '60px', objectFit: 'cover' }} />*/}
                    </div>

                    <div style={{ alignSelf: 'stretch', display: 'flex', alignItems: 'center' }}>
                        <i className="fas fa-arrow-right" style={{ fontSize: '24px', color: '#4A90E2' }}></i>
                    </div>

                    {/* 두 번째 행 */}
                    <div style={{ alignContent:'center', width: '600px', height: '150px', border: '2px solid #132650', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', backgroundColor: 'white' }}>
                        <div>
                            <h1 style={{ fontWeight: 'bold', color: '#4A90E2', marginBottom: '5px' }}>02</h1>
                            <h5 style={{ margin: '0', color: '#132650' }}>웹 마이크로 <b>음성</b><br/><b>인식</b> 후 전달</h5>
                            {/*<p style={{ color: '#333' }}>ㅋㅋㅋㅋㅋㅋㅋ</p>*/}
                        </div>
                        {/*<img src={logo} alt="Speech" style={{ width: '60px', height: '60px', objectFit: 'cover' }} />*/}
                    </div>

                    <div style={{ alignSelf: 'stretch', display: 'flex', alignItems: 'center' }}>
                        <i className="fas fa-arrow-right" style={{ fontSize: '24px', color: '#4A90E2' }}></i>
                    </div>

                    {/* 세 번째 행 */}
                    <div style={{ alignContent:'center', width: '600px', height: '150px', border: '2px solid #132650', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', backgroundColor: 'white' }}>
                        <div>
                            <h1 style={{ fontWeight: 'bold', color: '#4A90E2', marginBottom: '5px' }}>03</h1>
                            <h5 style={{ margin: '0', color: '#132650' }}><b>Open AI</b>를<br/>활용해 답변 생성</h5>
                            {/*<p style={{ color: '#333' }}>커뮤니케이션중~</p>*/}
                        </div>
                        {/*<img src={logo} alt="Speech" style={{ width: '60px', height: '60px', objectFit: 'cover' }} />*/}
                    </div>

                    <div style={{ alignSelf: 'stretch', display: 'flex', alignItems: 'center' }}>
                        <i className="fas fa-arrow-right" style={{ fontSize: '24px', color: '#4A90E2' }}></i>
                    </div>

                    {/* 네 번째 행 */}
                    <div style={{ alignContent:'center', width: '600px', height: '150px', border: '2px solid #132650', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', backgroundColor: 'white' }}>
                        <div>
                            <h1 style={{ fontWeight: 'bold', color: '#4A90E2', marginBottom: '5px' }}>04</h1>
                            <h5 style={{ margin: '0', color: '#132650' }}><b>TTS</b> 로<br/>AI 선생님 듣기</h5>
                            {/*<p style={{ color: '#333' }}>아에ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ</p>*/}
                        </div>
                        {/*<img src={logo} alt="Speech" style={{ width: '60px', height: '60px', objectFit: 'cover' }} />*/}
                    </div>
                </div>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <img src={logoXlogo} alt="Logo" />
                <div style={{color : '#1D2B64', fontWeight : 'bold'}}>
                    <h4>인공지능을 개발하며 안전한 AGI 개발을 추구하는 미국의 비영리 단체이며,
                        <br/>대형 언어 모델 (LLM)과 이를 기반으로 하는 ChatGPT 등의 소프트웨어를 제공</h4>
                </div>
            </div>
        </>
    )
}

export default Header