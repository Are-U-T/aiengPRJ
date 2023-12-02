import React, {useEffect, useState} from 'react';
import  './style.css'
import '../../../App.css'
import up from './images/up.png';


export default function Footer(){

    const [isScrolling, setIsScrolling] = useState(false);
    let scrollInterval; // 스크롤 인터벌을 저장할 변수

    const stopScrolling = () => {
        clearInterval(scrollInterval); // 인터벌 중단
        setIsScrolling(false); // 스크롤 상태 업데이트
    };

    const scrollToTop = () => {
        let currentScrollDistance = window.scrollY;
        let scrollStep = currentScrollDistance / 100; // 스크롤 단계 설정

        scrollInterval = setInterval(() => {
            if (window.scrollY > 0) {
                window.scrollBy(0, -scrollStep); // 위로 스크롤
            } else {
                stopScrolling(); // 스크롤 중단
            }
        }, 100);

        setIsScrolling(true); // 스크롤 시작
    };

    useEffect(() => {
        // 스크롤 중에는 이벤트 리스너를 추가
        if (isScrolling) {
            document.addEventListener('wheel', stopScrolling);
            document.addEventListener('click', stopScrolling);
        }

        // 컴포넌트 언마운트 시 또는 스크롤이 중단될 때 이벤트 리스너 제거
        return () => {
            document.removeEventListener('wheel', stopScrolling);
            document.removeEventListener('click', stopScrolling);
        };
    }, [isScrolling]);

    return(
        <>

            <div style={{marginTop : '100px'}} className='App'>
                <img src={up} alt='up' onClick={scrollToTop} className="scru"/>

                <footer className="footer" style={{ backgroundColor: 'black', color: 'white'}}>
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
                                <p style={{marginTop : '-15px',fontSize :'11px'}}>Are U T 공식채널</p>
                                <div className="social-links" style={{marginTop : '-10px'}}>
                                    <a className="social-icon facebook-icon" href="https://www.facebook.com/sunmoonuniversity/?locale=ko_KR"><i className="fab fa-facebook-f" /></a>
                                    <a className="social-icon instagram-icon" href="https://www.instagram.com/sunmoonuniv/?hl=ko"><i className="fab fa-instagram" /></a>
                                    <a className="social-icon youtube-icon" href="https://www.youtube.com/channel/UCwK3hT2ah8OA9Hzjmiq4TmQ/videos"><i className="fab fa-youtube" /></a>
                                    <a className="social-icon github-icon" href="https://github.com/Are-U-T/aiengPRJ">
                                        <i className="fab fa-github"></i>
                                    </a>

                                    <a className="social-icon notion-icon" href="https://www.notion.so/a93a058a1f6449849a0f394bfe12f75a">
                                        <i className="fab fa-notion"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>






    </>
    )
}