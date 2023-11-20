import React, { } from 'react';
import logo from './images/logo.png';
import { Link } from 'react-router-dom';

function Header(){
    return (
        <>
  {/* Masthead*/}
               <div>
                   <header className="masthead bg-primary text-white text-center">
                       <div className="container d-flex align-items-center flex-column" style={{marginTop: '-90px'}}>
                           <img className="masthead-avatar mb-5" src={logo} alt="..." />
                           <h1 className="masthead-heading mb-0">Are You T?</h1>
                           <div className="divider-custom divider-light">
                               <div className="divider-custom-line" />
                               <div className="divider-custom-icon"><i className="fas fa-star" /></div>
                               <div className="divider-custom-line" />
                           </div>
                           <p className="masthead-subheading font-weight-light mb-0">너랑 나</p>
                           <p className="masthead-subheading font-weight-light mb-0" style={{marginTop: '20px',
                           fontWeight : 'bold'}}>
                               AI와 함께하는 맞춤형 영어 학습 여정 - 당신의 언어 능력을 한 단계 업그레이드하세요!
                           </p>
                       </div>
                   </header>
               </div>

            <div style={{marginTop : '100px'}}/>

            <h3 style={{ marginTop: '40px', fontWeight: 'bold', marginLeft: '220px', fontSize: '26px', color: '#333' }}>학습 종류</h3>

            <div style={{ maxWidth: '1200px', margin: 'auto', padding: '0 40px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', padding: '20px', gap: '20px' }}>
                    {/* 첫 번째 행 */}
                    <Link to="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ border: '2px solid #dcdcdc', borderRadius: '10px', boxShadow: '0 6px 10px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                            <div style={{ padding: '15px', textAlign: 'center' }}>
                                <h3 style={{ marginBottom: '10px' }}>레벨 테스트</h3>
                                <img src={logo} alt="Speech" style={{ width: '120px', height: '120px', objectFit: 'cover', margin: '0 auto' }} />
                                <p style={{ marginTop: '10px', color: '#4A90E2', fontSize: '14px' }}>당신의 레벨을 테스트 할 수 있습니다!</p>
                            </div>
                        </div>
                    </Link>

                    {/* 두 번째 행 */}
                    <Link to="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ border: '2px solid #dcdcdc', borderRadius: '10px', boxShadow: '0 6px 10px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                            <div style={{ padding: '15px', textAlign: 'center' }}>
                                <h3 style={{ marginBottom: '10px' }}>Speach</h3>
                                <img src={logo} alt="Speech" style={{ width: '120px', height: '120px', objectFit: 'cover', margin: '0 auto' }} />
                                <p style={{ marginTop: '10px', color: '#4A90E2', fontSize: '14px' }}>스피킹을 합니다!</p>
                            </div>
                        </div>
                    </Link>

                    {/* 세 번째 행 */}
                    <Link to="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ border: '2px solid #dcdcdc', borderRadius: '10px', boxShadow: '0 6px 10px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
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

            <h3 style={{ marginTop: '40px', fontWeight: 'bold', marginLeft: '220px', fontSize: '26px', color: '#333' }}>시험 종류</h3>

            <div style={{ maxWidth: '1200px', margin: 'auto', padding: '0 40px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', padding: '20px', gap: '20px' }}>
                    {/* 첫 번째 행 */}
                    <Link to="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ border: '2px solid #dcdcdc', borderRadius: '10px', boxShadow: '0 6px 10px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                            <div style={{ padding: '15px', textAlign: 'center' }}>
                                <img src={logo} alt="Speech" style={{ width: '120px', height: '120px', objectFit: 'cover', margin: '0 auto' }} />
                                <p style={{ marginTop: '10px', color: '#4A90E2', fontSize: '14px' }}>레벨 1</p>
                            </div>
                        </div>
                    </Link>

                    {/* 두 번째 행 */}
                    <Link to="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ border: '2px solid #dcdcdc', borderRadius: '10px', boxShadow: '0 6px 10px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                            <div style={{ padding: '15px', textAlign: 'center' }}>
                                <img src={logo} alt="Speech" style={{ width: '120px', height: '120px', objectFit: 'cover', margin: '0 auto' }} />
                                <p style={{ marginTop: '10px', color: '#4A90E2', fontSize: '14px' }}>레벨 2</p>
                            </div>
                        </div>
                    </Link>

                    {/* 세 번째 행 */}
                    <Link to="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ border: '2px solid #dcdcdc', borderRadius: '10px', boxShadow: '0 6px 10px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                            <div style={{ padding: '15px', textAlign: 'center' }}>
                                <img src={logo} alt="Speech" style={{ width: '120px', height: '120px', objectFit: 'cover', margin: '0 auto' }} />
                                <p style={{ marginTop: '10px', color: '#4A90E2', fontSize: '14px' }}>레벨 3</p>
                            </div>
                        </div>
                    </Link>

                    {/* 네 번째 행 */}
                    <Link to="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ border: '2px solid #dcdcdc', borderRadius: '10px', boxShadow: '0 6px 10px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                            <div style={{ padding: '15px', textAlign: 'center' }}>
                                <img src={logo} alt="Speech" style={{ width: '120px', height: '120px', objectFit: 'cover', margin: '0 auto' }} />
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