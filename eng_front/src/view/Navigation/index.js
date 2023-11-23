import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import profile from './images/user.png';
import logo from './images/logo.png'


const Navigation = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src={logo}
                        width="60"
                        height="60"
                        className="d-inline-block align-top"
                        alt="Logo"
                        />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/main">Home</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/signup">Sign Up</Nav.Link>
                        <Nav.Link href="/introduction">Introduction</Nav.Link>
                        <Nav.Link href="/change">개인정보 수정</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/profile">
                            <img
                                src={profile}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                                alt="Profile"
                            />
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;
