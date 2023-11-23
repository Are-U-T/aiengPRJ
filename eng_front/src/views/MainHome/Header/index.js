import React, {useState} from 'react';
import logo from './images/logo.png';
import { Link } from 'react-router-dom';
import './Style.css';

function Header(){
    const [isModalOpen, setModalOpen] = useState(false);
    return (
        <>
  {/* Masthead*/}

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



            <div style={{marginTop : '100px'}}/>

            <h3 id="study" style={{ marginTop: '40px', fontWeight: 'bold', marginLeft: '220px', fontSize: '26px', color: '#333' }}>학습 종류</h3>

            <div className="grid-container" style={{ maxWidth: '1200px', margin: 'auto', padding: '0 40px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', padding: '20px', gap: '20px' }} className="grid-container">
                    {/* 첫 번째 행 */}
                    <Link to='/leveltest' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ border: '2px solid #dcdcdc', borderRadius: '10px',
                        boxShadow: '0 6px 10px rgba(0,0,0,0.1)', overflow: 'hidden', cursor: 'pointer' }}>
                            <div style={{ padding: '15px', textAlign: 'center' }}>
                                <h3 style={{ marginBottom: '10px' }}>레벨 테스트</h3>
                                <img src={logo} alt="Speech" style={{ width: '120px', height: '120px', objectFit: 'cover', margin: '0 auto' }} />
                                <p style={{ marginTop: '10px', color: '#4A90E2', fontSize: '14px' }}>당신의 레벨을 테스트 할 수 있습니다!</p>
                            </div>
                        </div>
                    </Link>


                    {/* 두 번째 행 */}
                    <Link to='/speach' style={{ textDecoration: 'none', color: 'inherit' }}  className="grid-item">
                    <div onClick={() => setModalOpen(true)} style={{ border: '2px solid #dcdcdc', borderRadius: '10px',
                        boxShadow: '0 6px 10px rgba(0,0,0,0.1)', overflow: 'hidden', cursor: 'pointer' }}>
                            <div style={{ padding: '15px', textAlign: 'center' }}>
                                <h3 style={{ marginBottom: '10px' }}>Speach</h3>
                                <img src={logo} alt="Speech" style={{ width: '120px', height: '120px', objectFit: 'cover', margin: '0 auto' }} />
                                <p style={{ marginTop: '10px', color: '#4A90E2', fontSize: '14px' }}>스피킹을 합니다!</p>
                            </div>
                        </div>
                    </Link>

                    {/* 세 번째 행 */}
                    <Link to='/keyword' style={{ textDecoration: 'none', color: 'inherit' }}  className="grid-item">
                    <div onClick={() => setModalOpen(true)} style={{ border: '2px solid #dcdcdc', borderRadius: '10px',
                        boxShadow: '0 6px 10px rgba(0,0,0,0.1)', overflow: 'hidden', cursor: 'pointer' }}>
                            <div style={{ padding: '15px', textAlign: 'center' }}>
                                <h3 style={{ marginBottom: '10px' }}>Keyword</h3>
                                <img src={logo} alt="Speech" style={{ width: '120px', height: '120px', objectFit: 'cover', margin: '0 auto' }} />
                                <p style={{ marginTop: '10px', color: '#4A90E2', fontSize: '14px' }}>키워드 시험을 봅니다!</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>





            {/*밑에*/}
            <div style={{marginTop : '100px'}}/>

            <h3 id="process" style={{ marginTop: '40px', fontWeight: 'bold', marginLeft: '220px', fontSize: '26px', color: '#333' }}>구현 과정</h3>

            <div style={{ maxWidth: '1200px', margin: 'auto', padding: '0 40px' }}>
                <div className="process-grid-container" style={{ padding: '20px', gap: '20px' }}>
                    {/* 첫 번째 행 */}
                    <Link to="#" style={{ textDecoration: 'none', color: 'inherit' }}  className="grid-item">
                        <div style={{ border: '2px solid #dcdcdc', borderRadius: '10px', boxShadow: '0 6px 10px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                            <div style={{ padding: '15px', textAlign: 'center' }}>
                                <img src={logo} alt="Speech" style={{ width: '180px', height: '150px', objectFit: 'cover', margin: '0 auto' }} />
                                <p style={{ marginTop: '10px', color: '#4A90E2', fontSize: '14px' }}>레벨 1</p>
                            </div>
                        </div>
                    </Link>
                    <div className="arrow"></div>
                    {/* 두 번째 행 */}
                    <Link to="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ border: '2px solid #dcdcdc', borderRadius: '10px', boxShadow: '0 6px 10px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                            <div style={{ padding: '15px', textAlign: 'center' }}>
                                <img src={logo} alt="Speech" style={{ width: '180px', height: '150px', objectFit: 'cover', margin: '0 auto' }} />
                                <p style={{ marginTop: '10px', color: '#4A90E2', fontSize: '14px' }}>레벨 2</p>
                            </div>
                        </div>
                    </Link>
                    <div className="arrow"></div>
                    {/* 세 번째 행 */}
                    <Link to="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ border: '2px solid #dcdcdc', borderRadius: '10px', boxShadow: '0 6px 10px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                            <div style={{ padding: '15px', textAlign: 'center' }}>
                                <img src={logo} alt="Speech" style={{ width: '180px', height: '150px', objectFit: 'cover', margin: '0 auto' }} />
                                <p style={{ marginTop: '10px', color: '#4A90E2', fontSize: '14px' }}>레벨 3</p>
                            </div>
                        </div>
                    </Link>
                    <div className="arrow"></div>
                    {/* 네 번째 행 */}
                    <Link to="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ border: '2px solid #dcdcdc', borderRadius: '10px', boxShadow: '0 6px 10px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                            <div style={{ padding: '15px', textAlign: 'center' }}>
                                <img src={logo} alt="Speech" style={{ width: '180px', height: '150px', objectFit: 'cover', margin: '0 auto' }} />
                                <p style={{ marginTop: '10px', color: '#4A90E2', fontSize: '14px' }}>레벨 4</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Header