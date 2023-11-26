import React, {useState} from 'react';
import logo from './images/logo.png';
import { Link } from 'react-router-dom';
import './Style.css';
import aip from './images/헤더사진.png';

function Header(){
    const [isModalOpen, setModalOpen] = useState(false);
    return (
        <>

            <div>
                <header className="masthead">
                    <div className="container d-flex align-items-center flex-column">
                        <img className="masthead-avatar mb-3" src={logo} alt="..." style={{ maxWidth: '120px' }}/>
                        <h1 className="masthead-heading mb-2">Are You T?</h1>
                        <p className="masthead-subheading mb-2" style={{fontWeight: 'bold'}}>
                            AI와 함께하는 영어 학습 여정
                        </p>
                        <p className="masthead-subheading mb-3">
                            당신의 언어 능력을 한 단계 업그레이드하세요!
                        </p>
                    </div>
                </header>
            </div>


            <div className="d-flex justify-content-center align-items-center make" style={{ marginTop: '200px', color: '#132650' }}>
                <div style={{ marginRight: '100px', marginBottom: '200px' }}>
                    <h2 style={{ fontWeight: 'bold' }}>실제 사람과 대화하듯</h2>
                    <h3 style={{ fontWeight: 'bold' }}>대화해보세요!</h3>

                </div>
                <img src={aip} alt="Description" style={{ width: '500px', height: 'auto' }} />
            </div>







            <div style={{marginTop : '150px'}}/>




            {/*<div style={{ background : 'linear-gradient(to right, #89C4F4, #1D2B64)'}}>*/}
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '40px', marginLeft: '200px', marginBottom : '10px'}}>
                <img src={logo} alt="..." style={{ marginRight: '1px', width: '80px', height: '80px' }} />
                <h5 id="study" style={{ fontWeight: 'bold', fontSize: '26px', color: '#132650' }}>학습 종류</h5>
            </div>


            <div className="grid-container" style={{ maxWidth: '1200px', margin: 'auto', padding: '0 40px'}}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', padding: '20px', gap: '100px' }}>

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

                    {/* 세 번째 행 */}
                    <Link to='/keyword' style={{ textDecoration: 'none', color: 'inherit' }} className="grid-item">
                        <div onClick={() => setModalOpen(true)} style={{ border: '2px solid #132650', borderRadius: '10px',
                            boxShadow: '0 6px 10px rgba(0,0,0,0.1)', overflow: 'hidden', cursor: 'pointer', aspectRatio: '1 / 1', width: '80%', backgroundColor : 'white' }}>
                            <div style={{ padding: '15px', textAlign: 'center' }}>
                                <h5 style={{ marginBottom: '10px' }}>Keyword</h5>
                                <img src={logo} alt="Speech" style={{ width: '80px', height: '80px', objectFit: 'cover', margin: '0 auto' }} />
                                <p style={{ marginTop: '10px', color: '#132650', fontSize: '14px' }}>키워드 시험을 봅니다!</p>
                            </div>
                        </div>
                    </Link>
                </div>

                </div>
            {/*</div>*/}



            {/*밑에*/}
            <div style={{marginTop : '150px'}}/>



            <div style={{ display: 'flex', alignItems: 'center', marginTop: '40px', marginLeft: '200px', marginBottom : '10px'}}>
                <img src={logo} alt="..." style={{ marginRight: '1px', width: '80px', height: '80px' }} />
                <h5 id="study" style={{ fontWeight: 'bold', fontSize: '26px', color: '#132650' }}>구현 과정</h5>
            </div>

            <div style={{ maxWidth: '1200px', margin: 'auto', padding: '0 40px' }}>
                <div className="process-grid-container" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px', overflowX: 'auto' }}>

                    {/* 첫 번째 행 */}
                    <div style={{ width: '600px', height: '150px', border: '2px solid #132650', borderRadius: '10px', boxShadow: '0 6px 10px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', backgroundColor: 'white' }}>
                            <div>
                                <p style={{ fontWeight: 'bold', color: '#4A90E2', marginBottom: '5px' }}>01</p>
                                <h4 style={{ margin: '0', color: '#132650' }}>처음</h4>
                                <p style={{ color: '#333' }}>으악 뭘로 해ㅋㅋㅋㅋㅋㅋㅋ</p>
                            </div>
                            <img src={logo} alt="Speech" style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                        </div>

                    <div style={{ alignSelf: 'stretch', display: 'flex', alignItems: 'center' }}>
                        <i className="fas fa-arrow-right" style={{ fontSize: '24px', color: '#4A90E2' }}></i>
                    </div>

                    {/* 두 번째 행 */}
                    <div style={{ width: '600px', height: '150px', border: '2px solid #132650', borderRadius: '10px', boxShadow: '0 6px 10px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', backgroundColor: 'white' }}>
                        <div>
                            <p style={{ fontWeight: 'bold', color: '#4A90E2', marginBottom: '5px' }}>02</p>
                            <h4 style={{ margin: '0', color: '#132650' }}>뭐지</h4>
                            <p style={{ color: '#333' }}>ㅋㅋㅋㅋㅋㅋㅋ</p>
                        </div>
                        <img src={logo} alt="Speech" style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                    </div>

                    <div style={{ alignSelf: 'stretch', display: 'flex', alignItems: 'center' }}>
                        <i className="fas fa-arrow-right" style={{ fontSize: '24px', color: '#4A90E2' }}></i>
                    </div>

                    {/* 세 번째 행 */}
                    <div style={{ width: '600px', height: '150px', border: '2px solid #132650', borderRadius: '10px', boxShadow: '0 6px 10px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', backgroundColor: 'white' }}>
                        <div>
                            <p style={{ fontWeight: 'bold', color: '#4A90E2', marginBottom: '5px' }}>03</p>
                            <h4 style={{ margin: '0', color: '#132650' }}>대화</h4>
                            <p style={{ color: '#333' }}>커뮤니케이션중~</p>
                        </div>
                        <img src={logo} alt="Speech" style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                    </div>

                    <div style={{ alignSelf: 'stretch', display: 'flex', alignItems: 'center' }}>
                        <i className="fas fa-arrow-right" style={{ fontSize: '24px', color: '#4A90E2' }}></i>
                    </div>

                    {/* 네 번째 행 */}
                    <div style={{ width: '600px', height: '150px', border: '2px solid #132650', borderRadius: '10px', boxShadow: '0 6px 10px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', backgroundColor: 'white' }}>
                            <div>
                                <p style={{ fontWeight: 'bold', color: '#4A90E2', marginBottom: '5px' }}>04</p>
                                <h4 style={{ margin: '0', color: '#132650' }}>결과</h4>
                                <p style={{ color: '#333' }}>아에ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ</p>
                            </div>
                            <img src={logo} alt="Speech" style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                        </div>
                </div>
            </div>






        </>
    )
}

export default Header