import React, {useEffect, useState} from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import profile from './images/user.png';
import logo from './images/logo.png'
import Dropdown from 'react-bootstrap/Dropdown';
import './Navigation.css'

const Navigation = () => {

    const handleLogout = () => {
        // 로그아웃 로직 구현
        // 예: 세션 클리어, 인증 토큰 제거, 로그인 페이지로 리디렉트 등
    };

    const [show, setShow] = useState(true);
    let lastScrollY = window.scrollY;

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY) {
                setShow(false);
            } else {
                setShow(true);
            }
            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, false);

        return () => {
            window.removeEventListener('scroll', handleScroll, false);
        };
    }, []);



    return (
        <Navbar expand="lg" sticky="top" className={`custom-navbar mr-auto ${show ? 'visible' : 'hidden'}`}>
            <Navbar.Brand href="/">
                <img src={logo} alt="Logo" className="abc"/>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-center">
                <Nav>
                    <Nav.Link href="/main" className="custom-nav-link" >Home</Nav.Link>
                    <Nav.Link href="/leveltest" className="custom-nav-link">Level Test</Nav.Link>
                    <Nav.Link href="/speech" className="custom-nav-link">Speech</Nav.Link>
                    <Nav.Link href="/developer" className="custom-nav-link">Developer</Nav.Link>
                </Nav>

                <Nav>
                    <Nav.Link href="/login" className="custom-login-link" >Login</Nav.Link>
                    <Dropdown>
                        <Dropdown.Toggle as={Nav.Link}  id="dropdown-profile">
                            <img
                                src={profile}
                                alt="Profile"
                            />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="/change">개인정보 수정</Dropdown.Item>
                            <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Navigation;