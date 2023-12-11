import React, {useEffect, useState} from 'react';
import './style.css'
import '../../../App.css'
import up from './images/up.png'

export default function Footer() {

    const scrollToTop = () => {
        window.scrollTo(0, 0);
    };

    return (
        <div className='App'>
            <div style={{marginTop: '100px'}}>
                <img src={up} alt='up' onClick={scrollToTop} className="scru"/>

                <footer className="footer" style={{backgroundColor: 'black', color: 'white'}}>
                    <div className="footer-container">
                        <div className="row">

                            <div className="col-lg-6 col-md-12 mb-2 d-flex">
                                <div>
                                    <h5 className="uu">About</h5>
                                    <b>너랑나 | 박서윤 서정훈 정경희 왕장령</b>
                                    <p style={{color: '#CECECE', margin: '0px'}}>충남 아산시 탕정면 선문로221번길 70</p>
                                    <p> Are You T.Since 2023</p>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6 mb-2">
                                <h5 className="uu">Contact</h5>
                                <div>
                                    <a href="mailto:p81500@naver.com" className="email-link">p81500@naver.com</a>
                                    <p>010-XXXX-XXXX</p>
                                </div>
                            </div>


                            <div className="col-lg-3 col-md-6 mb-2">
                                <h5 className="uu">Follow Us</h5>
                                <p style={{marginTop: '-15px', fontSize: '11px'}}>Are U T 공식채널</p>
                                <div className="social-links" style={{marginTop: '-10px'}}>
                                    <a className="social-icon facebook-icon"
                                       href="https://www.facebook.com/sunmoonuniversity/?locale=ko_KR"><i
                                        className="fab fa-facebook-f"/></a>
                                    <a className="social-icon instagram-icon"
                                       href="https://www.instagram.com/sunmoonuniv/?hl=ko"><i
                                        className="fab fa-instagram"/></a>
                                    <a className="social-icon youtube-icon"
                                       href="https://www.youtube.com/channel/UCwK3hT2ah8OA9Hzjmiq4TmQ/videos"><i
                                        className="fab fa-youtube"/></a>
                                    <a className="social-icon github-icon" href="https://github.com/Are-U-T/aiengPRJ">
                                        <i className="fab fa-github"></i>
                                    </a>

                                    <a className="social-icon notion-icon"
                                       href="https://www.notion.so/a93a058a1f6449849a0f394bfe12f75a">
                                        <i className="fab fa-notion"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}