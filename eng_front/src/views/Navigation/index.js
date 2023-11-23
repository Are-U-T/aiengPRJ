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
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className={`mr-auto ${show ? 'visible' : 'hidden'}`}>
                <Navbar.Brand href="/">
                    <img src={logo} alt="Logo"/>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse >
                    <Nav className="mr-auto">
                        <Nav.Link href="/main">Home</Nav.Link>
                        <Nav.Link href="/introduction">Introduction</Nav.Link>
                        <Nav.Link href="/change">개인정보 수정</Nav.Link>
                        <Nav.Link href="#study">학습 종류</Nav.Link>
                        <Nav.Link href="#process">구현 과정</Nav.Link>
                        <Nav.Link href="#effect">학습 효과</Nav.Link>
                        <Nav.Link href="#user">사용 대상</Nav.Link>
                        <Nav.Link href="#reason">사용 이유</Nav.Link>
                        <Nav.Link href="#team">팀 소개</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/signup">Sign Up</Nav.Link>
                    </Nav>

                    <Nav>
                        <Dropdown>
                            <Dropdown.Toggle as={Nav.Link}  id="dropdown-profile">
                                <img
                                    src={profile}
                                    width="40"
                                    height="40"
                                    alt="Profile"
                                />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="/profile-edit">개인정보 수정</Dropdown.Item>
                                <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>

                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
    );
}

export default Navigation;
