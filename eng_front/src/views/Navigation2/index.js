import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import profile from './images/user.png';
import logo from './images/logo.png'
import Dropdown from 'react-bootstrap/Dropdown';
import './Navigation2.css'



const Navigation = () => {

    const handleLogout = () => {
        // 로그아웃 로직 구현
        // 예: 세션 클리어, 인증 토큰 제거, 로그인 페이지로 리디렉트 등
    };


    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Navbar.Brand href="/">
                <img src={logo} alt="Logo"/>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse >
                <Nav className="mr-auto">
                    <Nav.Link href="/main">Home</Nav.Link>
                    <Nav.Link href="/introduction">Introduction</Nav.Link>
                    <Nav.Link href="/change">개인정보 수정</Nav.Link>
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
