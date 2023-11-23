import React from 'react';
import  './style.css'
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


export default function Footer(){

    const onInstaIconButtonClickHandler = () => {
        window.open("https://www.instagram.com");
    };

    const onNaverBlogIconButtonClickHandler = () => {
        window.open("https://blog.naver.com");
    }

    return(
        <>
            <h2 className="page-section-heading text-center text-uppercase mb-0"
                style={{paddingTop: '30px', color: 'black', fontWeight: 'bold'}}>
                팀 소개
            </h2>
            {/* Icon Divider*/}
            <div className="divider-custom" style={{marginRight: '-20px', marginTop: '-10px'}}>
                <div className="divider-custom-line" />
                <div className="divider-custom-icon"><i className="fas fa-star" /></div>
                <div className="divider-custom-line" />
            </div>


            <Container maxWidth="lg"> {/* maxWidth를 설정하여 최대 너비를 조절할 수 있습니다. */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 2,
                    justifyContent: 'space-around', // 여기서 간격을 균등하게 설정합니다.
                    margin: 'auto', // 이를 통해 Box를 가운데 정렬할 수 있습니다.
                }}>
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    sx={{
                        height: 200, // MUI에서는 단위를 생략하고 숫자만 적어도 px로 취급합니다.
                        width: 200,
                        borderRadius: '50%',
                        margin: 'auto' // 이미지를 가운데로 정렬합니다.
                    }}
                    image={syImage}
                    alt="jh"
                />

                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography gutterBottom variant="h5" component="div">
                        박서윤
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        취업 하고 싶어요 *^^*
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>


            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        sx={{
                            height: 200, // MUI에서는 단위를 생략하고 숫자만 적어도 px로 취급합니다.
                            width: 200,
                            borderRadius: '50%',
                            margin: 'auto' // 이미지를 가운데로 정렬합니다.
                        }}
                        image={jhImage}
                        alt="jh"
                    />

                    <CardContent sx={{ textAlign: 'center' }}>
                        <Typography gutterBottom variant="h5" component="div">
                            정경희
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>



            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        sx={{
                            height: 200, // MUI에서는 단위를 생략하고 숫자만 적어도 px로 취급합니다.
                            width: 200,
                            borderRadius: '50%',
                            margin: 'auto' // 이미지를 가운데로 정렬합니다.
                        }}
                        image={jhImage}
                        alt="jh"
                    />

                    <CardContent sx={{ textAlign: 'center' }}>
                        <Typography gutterBottom variant="h5" component="div">
                            서정훈
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            안녕하세요!!
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>




            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        sx={{
                            height: 200, // MUI에서는 단위를 생략하고 숫자만 적어도 px로 취급합니다.
                            width: 200,
                            borderRadius: '50%',
                            margin: 'auto' // 이미지를 가운데로 정렬합니다.
                        }}
                        image={cgImage}
                        alt="jh"
                    />

                    <CardContent sx={{ textAlign: 'center' }}>
                        <Typography gutterBottom variant="h5" component="div">
                            왕장령
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            히히힣
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
                </Box>
            </Container>









        {/*<div id="footer">*/}
        {/*    <div className="footer-container">*/}
        {/*        <div className="footer-top">*/}
        {/*            <div className="footer-logo-box">*/}
        {/*                <div className="icon-box">*/}
        {/*                    <div className="icon logo-light-icon">*/}

        {/*                    </div>*/}
        {/*                </div>*/}
        {/*                <div className="footer-logo-text">*/}
        {/*                    {'Are you T?'}*/}
        {/*                </div>*/}
        {/*            </div>*/}
        {/*            <div className="footer-link-box">*/}
        {/*                <div className="footer-email-link">*/}
        {/*                    {"smartkorea77@gmail.com"}*/}
        {/*                </div>*/}
        {/*                <div className="icon-button" onClick={onInstaIconButtonClickHandler}>*/}
        {/*                    <div className="icon insta-icon"></div>*/}
        {/*                </div>*/}
        {/*                <div className="icon-button" onClick={onNaverBlogIconButtonClickHandler}>*/}
        {/*                    <div className="icon naver-blog-con"></div>*/}
        {/*                </div>*/}

        {/*            </div>*/}
        {/*        </div>*/}

        {/*        <div className="footer-bottom">*/}
        {/*            <div className="footer-copyright">*/}
        {/*                {'왕가네 탕후루..'}*/}
        {/*            </div>*/}
        {/*        </div>*/}

        {/*    </div>*/}
        {/*</div>*/}


            <div>
                {/* Footer*/}
                <footer className="footer text-center">
                    <div className="container">
                        <div className="row">
                            {/* Footer Location*/}
                            <div className="col-lg-4 mb-5 mb-lg-0">
                                <h4 className="text-uppercase mb-4">Location</h4>
                                <p className="lead mb-0">
                                    2215 John Daniel Drive
                                    <br />
                                    Clark, MO 65243
                                </p>
                            </div>
                            {/* Footer Social Icons*/}
                            <div className="col-lg-4 mb-5 mb-lg-0">
                                <h4 className="text-uppercase mb-4">Around the Web</h4>
                                <a className="btn btn-outline-light btn-social mx-1" href="#!"><i className="fab fa-fw fa-facebook-f" /></a>
                                <a className="btn btn-outline-light btn-social mx-1" href="#!"><i className="fab fa-fw fa-twitter" /></a>
                                <a className="btn btn-outline-light btn-social mx-1" href="#!"><i className="fab fa-fw fa-linkedin-in" /></a>
                                <a className="btn btn-outline-light btn-social mx-1" href="#!"><i className="fab fa-fw fa-dribbble" /></a>
                            </div>
                            {/* Footer About Text*/}
                            <div className="col-lg-4">
                                <h4 className="text-uppercase mb-4">About Freelancer</h4>
                                <p className="lead mb-0">
                                    Freelance is a free to use, MIT licensed Bootstrap theme created by
                                    <a href="http://startbootstrap.com">Start Bootstrap</a>
                                    .
                                </p>
                            </div>
                        </div>
                    </div>
                </footer>
                {/* Copyright Section*/}
                <div className="copyright py-4 text-center text-white">
                    <div className="container"><small>Copyright © Your Website 2023</small></div>
                </div>
                {/* Portfolio Modals*/}
                {/* Portfolio Modal 1*/}
                <div className="portfolio-modal modal fade" id="portfolioModal1" tabIndex={-1} aria-labelledby="portfolioModal1" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header border-0"><button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close" /></div>
                            <div className="modal-body text-center pb-5">
                                <div className="container">
                                    <div className="row justify-content-center">
                                        <div className="col-lg-8">
                                            {/* Portfolio Modal - Title*/}
                                            <h2 className="portfolio-modal-title text-secondary text-uppercase mb-0">Ai 영어학습</h2>
                                            {/* Icon Divider*/}
                                            <div className="divider-custom">
                                                <div className="divider-custom-line" />
                                                <div className="divider-custom-icon"><i className="fas fa-star" /></div>
                                                <div className="divider-custom-line" />
                                            </div>
                                            {/* Portfolio Modal - Image*/}
                                            <img className="img-fluid rounded mb-5" src={aic} alt="..." />
                                            {/* Portfolio Modal - Text*/}
                                            <p className="mb-4">진짜 사람같은 AI와 자유롭게 대화해보세요!</p>
                                            <button className="btn btn-primary" data-bs-dismiss="modal">
                                                <i className="fas fa-xmark fa-fw" />
                                                닫기
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Portfolio Modal 2*/}
                <div className="portfolio-modal modal fade" id="portfolioModal2" tabIndex={-1} aria-labelledby="portfolioModal2" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header border-0"><button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close" /></div>
                            <div className="modal-body text-center pb-5">
                                <div className="container">
                                    <div className="row justify-content-center">
                                        <div className="col-lg-8">
                                            {/* Portfolio Modal - Title*/}
                                            <h2 className="portfolio-modal-title text-secondary text-uppercase mb-0">편리성</h2>
                                            {/* Icon Divider*/}
                                            <div className="divider-custom">
                                                <div className="divider-custom-line" />
                                                <div className="divider-custom-icon"><i className="fas fa-star" /></div>
                                                <div className="divider-custom-line" />
                                            </div>
                                            {/* Portfolio Modal - Image*/}
                                            <img className="img-fluid rounded mb-5" src={eng} alt="..." />
                                            {/* Portfolio Modal - Text*/}
                                            <p className="mb-4">언제 어디서든 시간과 장소를 구애 받지 않고, 편하게 이용할 수 있습니다.</p>
                                            <button className="btn btn-primary" data-bs-dismiss="modal">
                                                <i className="fas fa-xmark fa-fw" />
                                                닫기
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Portfolio Modal 3*/}
                <div className="portfolio-modal modal fade" id="portfolioModal3" tabIndex={-1} aria-labelledby="portfolioModal3" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header border-0"><button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close" /></div>
                            <div className="modal-body text-center pb-5">
                                <div className="container">
                                    <div className="row justify-content-center">
                                        <div className="col-lg-8">
                                            {/* Portfolio Modal - Title*/}
                                            <h2 className="portfolio-modal-title text-secondary text-uppercase mb-0">성공</h2>
                                            {/* Icon Divider*/}
                                            <div className="divider-custom">
                                                <div className="divider-custom-line" />
                                                <div className="divider-custom-icon"><i className="fas fa-star" /></div>
                                                <div className="divider-custom-line" />
                                            </div>
                                            {/* Portfolio Modal - Image*/}
                                            <img className="img-fluid rounded mb-5" src={success} alt="..." />
                                            {/* Portfolio Modal - Text*/}
                                            <p className="mb-4">T와 함께하며 영어분야에서 성공하세요!</p>
                                            <button className="btn btn-primary" data-bs-dismiss="modal">
                                                <i className="fas fa-xmark fa-fw" />
                                                Close Window
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </>
    )
}