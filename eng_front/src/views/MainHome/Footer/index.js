import React from 'react';
import  './style.css'
import '../../../App.css'
import {CardActionArea} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import jhImage from '../Images/jh.jpg';
import syImage from '../Images/sy.jpg';
import cgImage from '../Images/cg.jpg';
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import aic from './images/AI대화.png';
import eng from './images/영어학습.png';
import success from './images/성공사례.png';
import khImage from '../Images/kh.jpg';
import logo from './images/logo.png';
import hugi from './images/후기.png';


export default function Footer(){

    return(
        <>
            <div style={{marginTop : '50px'}}/>
            <img src={hugi} alt="후기" style={{ maxWidth: '100%', height: 'auto' }} />



            <div style={{marginTop : '100px'}} className='App'>
                <footer className="footer" style={{ backgroundColor: '#333333', color: 'white', padding: '10px 0', height: '130px'}}>
                    <div className="footer-container">
                        <div className="row">

                            <div className="col-lg-6 col-md-12 mb-2 d-flex">
                                <img src={logo} alt="logo" style={{ maxWidth: '100px', marginRight: '15px' }}/>
                                <div>
                                    <h5 className="uu">Are You T?</h5>
                                    <p>여러분의 성공을 기원합니다.</p>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6 mb-2">
                                <h5 className="uu">Follow Us</h5>
                                <div className="social-links">
                                    <a className="social-icon facebook-icon" href="#!"><i className="fab fa-facebook-f" /></a>
                                    <a className="social-icon twitter-icon" href="#!"><i className="fab fa-twitter" /></a>
                                    <a className="social-icon instagram-icon" href="#!"><i className="fab fa-instagram" /></a>
                                    <a className="social-icon youtube-icon" href="#!"><i className="fab fa-youtube" /></a>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6 mb-2">
                                <h5 className="uu">Contact</h5>
                                <ul className="contact-list contact-text-large">
                                    <li><a href="mailto:smartkorea77@gmail.com">이메일</a></li>
                                    <li><a href="https://maps.google.com">위치</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
    </>
    )
}