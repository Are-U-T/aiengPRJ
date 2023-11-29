import React, {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from './Typography';
import Button from './Button';
import aic from './images/AI대화.png';
import eng from './images/영어학습.png';
import success from './images/성공사례.png';
import logo from './images/logo.png';
import child from './images/어린이.png';
import worker from './images/직장인.png';
import student from './images/학생.png';
import freedom from './images/자유.png';
import study from './images/학습.png';
import free from './images/무료.png';
import design from './images/디자인.png';
import '../../../App.css'
import studyImg1 from './images/studyImg1.jpg'
import speakingexam from "./images/speakingexam.png";
import nationalexam from "./images/nationalexam.png";
import './exam.css';
import hugi from '../Mainarea/images/후기.png';


const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

const customItem = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRight: '1px solid #ccc', // 오른쪽 테두리만 추가
  padding: '10px',
  margin: '10px',
};

const customImage = {
  maxWidth: '60%',
  height: 'auto',
};


export default function Mainarea(){

    return (
        <>
        <div className='App'>

          <div style={{marginTop : '150px'}}/>

          <div style={{ display: 'flex', alignItems: 'center', marginTop: '40px', marginLeft: '180px', marginBottom : '10px'}}>
            <img src={logo} alt="..." style={{ marginRight: '1px', width: '80px', height: '80px' }} />
            <h5 id="study" style={{ fontWeight: 'bold', fontSize: '26px', color: '#132650' }}>학습 효과</h5>
          </div>

          <section className="page-section" id="portfolio" style={{ marginTop: '-120px',  cursor: 'default' }}>
            <div className="container">
              <div className="row justify-content-between">
                {/* Portfolio Item 1 */}
                <div className="col-md-6 col-lg-4 mb-5">
                  <div className="portfolio-item mx-auto" style={{ background: 'linear-gradient(90deg, #89C4F4, #3a7bd5)', borderRadius: '20px', overflow: 'hidden' }}>
                    <img className="img-fluid" src={aic} alt="..."/>
                    <p style={{ padding: '20px', color: '#fff', fontSize: '17px', fontWeight: 'bold', textAlign: 'center' }}>
                      사람과의 회화 부담감을 감소
                    </p>
                  </div>
                </div>
                {/* Portfolio Item 2 */}
                <div className="col-md-6 col-lg-4 mb-5">
                  <div className="portfolio-item mx-auto" style={{ background: 'linear-gradient(90deg, #3a7bd5, #1D2B64)', borderRadius: '20px', overflow: 'hidden' }}>
                    <img className="img-fluid" src={eng} alt="..." />
                    <p style={{ padding: '20px', color: '#fff', fontSize: '17px', fontWeight: 'bold', textAlign: 'center' }}>
                      사용자가 원할 때마다 언제 어디서든
                    </p>
                  </div>
                </div>
                {/* Portfolio Item 3 */}
                <div className="col-md-6 col-lg-4 mb-5">
                  <div className="portfolio-item mx-auto" style={{ background: 'linear-gradient(90deg, #1D2B64, #3a6073)', borderRadius: '20px', overflow: 'hidden' }}>
                    <img className="img-fluid" src={studyImg1} alt="..."/>
                    <p style={{ padding: '20px', color: '#fff', fontSize: '17px', fontWeight: 'bold', textAlign: 'center' }}>
                      T와 함께 회화 만렙 되기
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>




          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '180px'}}>
            <img src={logo} alt="..." style={{ marginRight: '1px', width: '80px', height: '80px' }} />
            <h5 id="study" style={{ fontWeight: 'bold', fontSize: '26px', color: '#132650' }}>사용 대상</h5>
          </div>

          <Box
              component="section"
              sx={{ display: 'flex', overflow: 'hidden'}}
          >
            <Container sx={{ mt: 5, mb: 20, display: 'flex', position: 'relative' }}>


              <Grid container spacing={5}>
                <Grid item xs={12} md={4}>
                  <Box sx={item}>
                    <Box
                        component="img"
                        src={child}
                        alt="suitcase"
                        sx={{ height: 320 }}
                    />
                    <Typography variant="h6" sx={{ my: 2, fontWeight: 'bold', fontSize: '1.5rem' }}>
                      어린이
                    </Typography>

                    <Typography variant="h6" sx={{ mt: 2}}>
                      {
                        '유아기부터 영어 경쟁력을 키울 수 있도록 모국어 환경에서 맞춤형 1:1 행복한 학습'
                      }

                    </Typography>
                  </Box>


                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={item}>
                    <Box
                        component="img"
                        src={worker}
                        alt="graph"
                        sx={{ height: 320 }}
                    />
                    <Typography variant="h6" sx={{ my: 2, fontWeight: 'bold', fontSize: '1.5rem' }}>
                      직장인
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 2}}>
                      {
                        '성공적으로 언어 경쟁력 향상,급여 인상, 전직, 관심을 가지고 공부하고 자유롭게 목표 달성'
                      }
                    </Typography>
                  </Box>
                </Grid>


                <Grid item xs={12} md={4}>
                  <Box sx={item}>
                    <Box
                        component="img"
                        src={student}
                        alt="clock"
                        sx={{ height: 320 }}
                    />
                    <Typography variant="h6" sx={{ my: 2, fontWeight: 'bold', fontSize: '1.5rem' }}>
                      학생
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 2}}>
                      {
                        '유학시 약점, 시험, 쉬운 합격을 바탕으로 한 특별한 준비'
                      }
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>

          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '180px'}}>
            <img src={logo} alt="..." style={{ marginRight: '1px', width: '80px', height: '80px' }} />
            <h5 id="study" style={{ fontWeight: 'bold', fontSize: '26px', color: '#132650' }}>사용하는 이유</h5>
          </div>
          <div style={{marginTop : '-30px'}}></div>
          <Container
              sx={{
                mt: { xs: 5, md: 10 },
                mx : 'auto',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
          >
            <Grid container spacing={{ xs: 4, md: 8 }}>
              <Grid item xs={12} md={6}>
                <Grid container spacing={0}>
                  <Grid item xs={6} style={{ borderRight: '1px solid #ccc', padding: '0', margin: '0' }}>
                    <img
                        src={freedom}
                        alt="icon1"
                        style={{ ...customImage, alignSelf: 'center', marginLeft: '20px' }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ ...customItem, borderRight: 'none' }}>
                      <Typography variant="h5" align="center" style={{ fontSize: '1rem', fontWeight: 'bold', marginTop: '30px' }}>
                        언제 어디서나 마음 껏 자유롭게!
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>


              <Grid item xs={12} md={6}>
                <Grid container spacing={0}>
                  <Grid item xs={6} style={{ borderRight: '1px solid #ccc', padding: '0', margin: '0' }}>
                    <img
                        src={study}
                        alt="icon2"
                        style={{ ...customImage, alignSelf: 'center', marginLeft: '20px' }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ ...customItem, borderRight: 'none' }}> {/* 여기서는 경계선 제거 */}
                      <Typography variant="h5" align="center" style={{ fontSize: '1rem', fontWeight: 'bold', marginTop: '30px' }}>
                       능력에 따른 효과적이고 맞춤형 학습
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>

              {/* 두 개의 추가 그리드 아이템 */}
              <Grid item xs={12} md={6}>
                <Grid container spacing={0}>
                  <Grid item xs={6} style={{ borderRight: '1px solid #ccc', padding: '0', margin: '0' }}>
                    <img
                        src={free}
                        alt="icon3"
                        style={{ ...customImage, alignSelf: 'center', marginLeft: '20px' }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ ...customItem, borderRight: 'none' }}> {/* 여기서는 경계선 제거 */}
                      <Typography variant="h5" align="center" style={{ fontSize: '1rem', fontWeight: 'bold', marginTop: '30px' }}>
                        무료로 인한 부담감 제로!
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}>
                <Grid container spacing={0}>
                  <Grid item xs={6} style={{ borderRight: '1px solid #ccc', padding: '0', margin: '0' }}>
                    <img
                        src={design}
                        alt="icon4"
                        style={{ ...customImage, alignSelf: 'center', marginLeft: '20px' }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ ...customItem, borderRight: 'none' }}> {/* 여기서는 경계선 제거 */}
                      <Typography variant="h5" align="center" style={{ fontSize: '1rem', fontWeight: 'bold', marginTop: '30px' }}>
                        모두가 좋아하는 편한 디자인!
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>

          <div style={{marginTop : '150px'}}/>

          <div style={{ display: 'flex', alignItems: 'center', marginTop: '40px', marginLeft: '180px', marginBottom : '10px'}}>
            <img src={logo} alt="..." style={{ marginRight: '1px', width: '80px', height: '80px' }} />
            <h5 id="study" style={{ fontWeight: 'bold', fontSize: '26px', color: '#132650' }}> 시험 정보, 알고 계셨나요?</h5>
          </div>


          <div className="im">
            <a href="https://www.opic.or.kr/opics/jsp/senior/index.jsp">
              <img src={speakingexam} alt="스피킹시험" className="ei"/>
            </a>
            <a href="http://www.espt.org/">
              <img src={nationalexam} alt="국가시험" className="ei"/>
            </a>
          </div>




          <div style={{marginTop : '150px'}}/>
          <img src={hugi} alt="후기" style={{ maxWidth: '100%', height: 'auto' }} />




</div>
        </>
    )
}