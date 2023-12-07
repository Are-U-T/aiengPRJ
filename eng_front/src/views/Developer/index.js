import React from 'react';
import Navigation from "../../views/Navigation";
import '../../App.css';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import khImage from "./images/kh.jpg";
import jhImage from "./images/jh.jpg";
import syImage from "./images/sy.jpg";
import cgImage from "./images/cg.jpg";
import '../../App.css';
import Footer from './Footer/index';

const ProjectIntro = () => (
    <div className='App'>
        <Navigation/>
        <div style={{textAlign: 'center'}} className='App'>
            <div style={{textAlign: 'center'}} className='App'>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh'}}>
                    <div style={{fontFamily: "'NotoSansKR-Medium', sans-serif"}}>
                        <h1 style={{fontSize: '36px', color: '#132650', fontWeight: 'bold',fontFamily: "'NotoSansKR-Medium', sans-serif"}}>왜? Are You T일까?</h1>
                        <p style={{fontSize: '18px', color: '#333', marginTop: '25px',fontFamily: "'NotoSansKR-Medium', sans-serif"}}>
                            저희 팀의 메인 로고인 'T'는 "너 T야?"를 상징하며,
                            '선생님(teacher)'을 의미합니다. <br/>이는 최고 수준의 영어 학습 지도를 제공하겠다는 저희의 약속을 나타냅니다.
                        </p>
                    </div>
                </div>
            </div>

            <div style={{marginTop: '-100px'}}></div>
            <div style={{display: 'flex', alignItems: 'center', marginLeft: '150px', marginBottom: '10px'}}>
            </div>

            <Container maxWidth="lg" id="team">
                <Box className="team-container" sx={{
                    display: 'flex',
                    flexDirection: {xs: 'column', md: 'row'},
                    gap: 2,
                    justifyContent: 'space-around',
                    margin: 'auto',
                }}>

                    <Card sx={{
                        maxWidth: 345,
                        boxShadow: 'none',
                        backgroundColor: 'white',
                        '&:hover': {
                            backgroundColor: 'white',
                            boxShadow: 'none',
                            transform: 'none'
                        }
                    }}>

                        <CardMedia
                            component="img"
                            sx={{
                                height: 200,
                                width: 200,
                                borderRadius: '50%',
                                margin: 'auto'
                            }}
                            image={syImage}
                            alt="jh"
                        />

                        <CardContent sx={{textAlign: 'center'}}>
                            <Typography gutterBottom variant="h5" component="div" sx={{fontFamily: "'NotoSansKR-Medium', sans-serif"}}>
                                박서윤
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{fontFamily: "'NotoSansKR-Medium', sans-serif"}}>
                               취업 하고 싶어요!
                            </Typography>
                        </CardContent>

                    </Card>

                    <Card sx={{
                        maxWidth: 345,
                        boxShadow: 'none',
                        backgroundColor: 'white',
                        '&:hover': {
                            backgroundColor: 'white',
                            boxShadow: 'none',
                            transform: 'none'
                        }
                    }}>

                        <CardMedia
                            component="img"
                            sx={{
                                height: 200,
                                width: 200,
                                borderRadius: '50%',
                                margin: 'auto'
                            }}
                            image={khImage}
                            alt="jh"
                        />

                        <CardContent sx={{textAlign: 'center'}}>
                            <Typography gutterBottom variant="h5" component="div" sx={{fontFamily: "'NotoSansKR-Medium', sans-serif"}}>
                                정경희
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{fontFamily: "'NotoSansKR-Medium', sans-serif"}}>
                                현재 취업준비 중이에요!
                            </Typography>
                        </CardContent>
                    </Card>


                    <Card sx={{
                        maxWidth: 345,
                        boxShadow: 'none',
                        backgroundColor: 'white',
                        '&:hover': {
                            backgroundColor: 'white',
                            boxShadow: 'none',
                            transform: 'none'
                        }
                    }}>

                        <CardMedia
                            component="img"
                            sx={{
                                height: 200,
                                width: 200,
                                borderRadius: '50%',
                                margin: 'auto'
                            }}
                            image={jhImage}
                            alt="jh"
                        />

                        <CardContent sx={{textAlign: 'center'}}>
                            <Typography gutterBottom variant="h5" component="div" sx={{fontFamily: "'NotoSansKR-Medium', sans-serif"}}>
                                서정훈
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{fontFamily: "'NotoSansKR-Medium', sans-serif"}}>
                                비트코인 올해안의 1억 갈 수 있을까요?
                            </Typography>
                        </CardContent>
                    </Card>


                    <Card sx={{
                        maxWidth: 345,
                        boxShadow: 'none',
                        backgroundColor: 'white',
                        '&:hover': {
                            backgroundColor: 'white',
                            boxShadow: 'none',
                            transform: 'none'
                        }
                    }}>
                        <CardMedia
                            component="img"
                            sx={{
                                height: 200,
                                width: 200,
                                borderRadius: '50%',
                                margin: 'auto'
                            }}
                            image={cgImage}
                            alt="jh"
                        />

                        <CardContent sx={{textAlign: 'center'}}>
                            <Typography gutterBottom variant="h5" component="div" sx={{fontFamily: "'NotoSansKR-Medium', sans-serif"}}>
                                왕장령
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{fontFamily: "'NotoSansKR-Medium', sans-serif"}}>
                                창작의 고통은 즐거움입니다.<br/> -왕선생-
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            </Container>


        </div>
        <Footer/>
    </div>
);

export default ProjectIntro;