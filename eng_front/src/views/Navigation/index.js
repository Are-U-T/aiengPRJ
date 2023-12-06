import React, {useEffect, useState} from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import profile from '../MyPage/MypageArea/images/user.png';
import logo from './images/logo.png'
import Dropdown from 'react-bootstrap/Dropdown';
import './Navigation.css'
import { useNavigate } from 'react-router-dom';
import P1 from '../MyPage/MypageArea/images/1.png';
import P2 from '../MyPage/MypageArea/images/2.png';
import P3 from '../MyPage/MypageArea/images/3.png';
import P4 from '../MyPage/MypageArea/images/4.png';
import P5 from '../MyPage/MypageArea/images/5.png';
import P6 from '../MyPage/MypageArea/images/6.png';
import P7 from '../MyPage/MypageArea/images/7.png';
import P8 from '../MyPage/MypageArea/images/8.png';
import P9 from '../MyPage/MypageArea/images/9.png';

const Navigation = () => {
    const [userName, setUserName] = useState(null);
    const [show, setShow] = useState(true);

    const navigate = useNavigate();
    let lastScrollY = window.scrollY;

    const userPhotoNumber = parseInt(sessionStorage.getItem('userPhoto')) || 1;

    let selectedPhoto;
    switch (userPhotoNumber) {
        case 1:
            selectedPhoto = P1;
            break;
        case 2:
            selectedPhoto = P2;
            break;
        case 3:
            selectedPhoto = P3;
            break;
        case 4:
            selectedPhoto = P4;
            break;
        case 5:
            selectedPhoto = P5;
            break;
        case 6:
            selectedPhoto = P6;
            break;
        case 7:
            selectedPhoto = P7;
            break;
        case 8:
            selectedPhoto = P8;
            break;
        case 9:
            selectedPhoto = P9;
            break;
        default:
            selectedPhoto = profile;
    }

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

    useEffect(() => {
        const storedUserName = sessionStorage.getItem('userName');
        setUserName(storedUserName);
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('userName');
        sessionStorage.removeItem('userNum');
        sessionStorage.removeItem('userPhoto');
        setUserName(null);
        navigate('/login');
    };

    return (
        <div className='App'>
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
                    <Nav.Link href="/ranking" className="custom-nav-link">Ranking</Nav.Link>
                </Nav>

                <Nav>
                    {userName ? (
                        <Dropdown>
                            <Dropdown.Toggle as={Nav.Link} id="dropdown-profile" className="kkk">
                               <div className="userName"> {userName + '님'}</div>
                                <img src={selectedPhoto} alt="Profile" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="/mypage">마이페이지</Dropdown.Item>
                                <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    ) : (
                        <Nav.Link href="/login" className="custom-login-link">Login</Nav.Link>
                    )}
                </Nav>

            </Navbar.Collapse>
        </Navbar>
        </div>
    );
}

export default Navigation;