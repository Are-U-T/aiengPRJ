import React from 'react';
import Navigation from "../views/Navigation";
import logo from './images/logo.png';
import '../App.css'
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import syImage from "../views/MainHome/Images/sy.jpg";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import khImage from "../views/MainHome/Images/kh.jpg";
import jhImage from "../views/MainHome/Images/jh.jpg";
import cgImage from "../views/MainHome/Images/cg.jpg";

const ProjectIntro = () => (
    <>
        <Navigation />
        <div style={{ textAlign: 'center'}} className='App'>
            <div style={{ textAlign: 'center' }} className='App'>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
                    <div>
                        <h1 style={{ fontSize: '36px', color: '#132650', fontWeight: 'bold' }}>왜? Are You T일까?</h1>
                        <p style={{ fontSize: '18px', color: '#333', marginTop: '10px' }}>
                            저희 팀의 메인 로고인 'T'는 "너 T야?"를 상징하며,
                            '선생님(teacher)'을 의미합니다. <br />이는 최고 수준의 영어 학습 지도를 제공하겠다는 저희의 약속을 나타냅니다.
                        </p>
                    </div>
                </div>
            </div>



            <div style={{marginTop : '-100px'}}></div>
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '150px', marginBottom : '10px'}}>
                {/*<img src={logo} alt="..." style={{ marginRight: '1px', width: '80px', height: '80px' }} />*/}
                <h5 id="study" style={{ fontWeight: 'bold', fontSize: '26px', color: '#132650'}}>Team</h5>
            </div>


            <Container maxWidth="lg" id="team"> {/* maxWidth를 설정하여 최대 너비를 조절할 수 있습니다. */}
                <Box className="team-container" sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 2,
                    justifyContent: 'space-around', // 여기서 간격을 균등하게 설정합니다.
                    margin: 'auto', // 이를 통해 Box를 가운데 정렬할 수 있습니다.
                }}>

                    <Card sx={{ maxWidth: 345,
                        boxShadow: 'none', // 박스 쉐도우 제거
                        backgroundColor: 'white', // 현재 배경색으로 고정
                        '&:hover': {
                            backgroundColor: 'white', // 마우스 오버 시에도 배경색을 동일하게 유지
                            // 다른 마우스 오버 효과를 추가적으로 제거할 수 있습니다.
                            boxShadow: 'none', // 마우스 오버 시 그림자 효과 제거
                            transform: 'none' // 마우스 오버 시 변형 효과 제거
                        }}}>

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
                            <Typography  variant="h5" component="div">
                                박서윤
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                취업 하고 싶어요 *^^*
                            </Typography>
                        </CardContent>

                    </Card>





                    <Card sx={{ maxWidth: 345,
                        boxShadow: 'none', // 박스 쉐도우 제거
                        backgroundColor: 'white', // 현재 배경색으로 고정
                        '&:hover': {
                            backgroundColor: 'white', // 마우스 오버 시에도 배경색을 동일하게 유지
                            // 다른 마우스 오버 효과를 추가적으로 제거할 수 있습니다.
                            boxShadow: 'none', // 마우스 오버 시 그림자 효과 제거
                            transform: 'none' // 마우스 오버 시 변형 효과 제거
                        }}}>

                        <CardMedia
                            component="img"
                            sx={{
                                height: 200, // MUI에서는 단위를 생략하고 숫자만 적어도 px로 취급합니다.
                                width: 200,
                                borderRadius: '50%',
                                margin: 'auto' // 이미지를 가운데로 정렬합니다.
                            }}
                            image={khImage}
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
                    </Card>



                    <Card sx={{ maxWidth: 345,
                        boxShadow: 'none', // 박스 쉐도우 제거
                        backgroundColor: 'white', // 현재 배경색으로 고정
                        '&:hover': {
                            backgroundColor: 'white', // 마우스 오버 시에도 배경색을 동일하게 유지
                            // 다른 마우스 오버 효과를 추가적으로 제거할 수 있습니다.
                            boxShadow: 'none', // 마우스 오버 시 그림자 효과 제거
                            transform: 'none' // 마우스 오버 시 변형 효과 제거
                        }}}>

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
                    </Card>




                    <Card sx={{ maxWidth: 345,
                        boxShadow: 'none', // 박스 쉐도우 제거
                        backgroundColor: 'white', // 현재 배경색으로 고정
                        '&:hover': {
                            backgroundColor: 'white', // 마우스 오버 시에도 배경색을 동일하게 유지
                            // 다른 마우스 오버 효과를 추가적으로 제거할 수 있습니다.
                            boxShadow: 'none', // 마우스 오버 시 그림자 효과 제거
                            transform: 'none' // 마우스 오버 시 변형 효과 제거
                        }}}>
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
                    </Card>
                </Box>
            </Container>


        </div>
    </>
);

export default ProjectIntro;
