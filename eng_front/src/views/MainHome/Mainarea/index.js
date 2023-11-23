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
        <div>
  {/* Portfolio Section*/}
  <section className="page-section portfolio" id="portfolio">
    <div className="container">
      {/* Portfolio Section Heading*/}
      <h2 id='effect' className="page-section-heading text-center"
          style={{ marginTop: '40px', fontWeight: 'bold', fontSize: '40px', color: '#333' }}>학습 효과</h2>

      <div className="divider-custom"/>
      {/*밑에 띄어쓰기*/}


      {/* Portfolio Grid Items*/}
      <div className="row justify-content-center">
        {/* Portfolio Item 1*/}
        <div className="col-md-6 col-lg-4 mb-5">
          <div className="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#portfolioModal1">
            <div className="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
              <div className="portfolio-item-caption-content text-center text-white"><i className="fas fa-plus fa-3x" /></div>
            </div>
            <img className="img-fluid" src={aic} alt="..." />
          </div>
        </div>
        {/* Portfolio Item 2*/}
        <div className="col-md-6 col-lg-4 mb-5">
          <div className="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#portfolioModal2">
            <div className="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
              <div className="portfolio-item-caption-content text-center text-white"><i className="fas fa-plus fa-3x" /></div>
            </div>
            <img className="img-fluid" src={eng} alt="..." />
          </div>
        </div>
        {/* Portfolio Item 3*/}
        <div className="col-md-6 col-lg-4 mb-5">
          <div className="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#portfolioModal3">
            <div className="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
              <div className="portfolio-item-caption-content text-center text-white"><i className="fas fa-plus fa-3x" /></div>
            </div>
            <img className="img-fluid" src={success} alt="..." />
          </div>
        </div>
      </div>
    </div>

  </section>

          <div style={{marginTop : '100px'}}></div>

          <h2 id='user' className="page-section-heading text-center"
              style={{ marginTop: '40px', fontWeight: 'bold', fontSize: '40px', color: '#333' }}>사용 대상</h2>

          <Box
              component="section"
              sx={{ display: 'flex', overflow: 'hidden', bgcolor: 'white'}}
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




          <div style={{marginTop : '100px'}}></div>
          <h2 id="reason" className="page-section-heading text-center" style={{ marginTop: '40px', fontWeight: 'bold', fontSize: '40px', color: '#333' }}>사용하는 이유</h2>
          <Container
              sx={{
                mt: { xs: 5, md: 10 }, // 모바일 화면에서는 상단 여백을 줄임
                mr: { xs: 2, md: 12 }, // 모바일 화면에서는 오른쪽 여백을 줄임
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
          >
            <Grid container spacing={{ xs: 4, md: 8 }}> {/* 모바일 화면에서는 간격을 줄임 */}
              <Grid item xs={12} md={6}>
                <Grid container spacing={0}>
                  <Grid item xs={6} style={{ borderRight: '1px solid #ccc', padding: '0', margin: '0' }}> {/* 여기서 Padding과 Margin을 0으로 설정 */}
                    <img
                        src={freedom}
                        alt="icon1"
                        style={{ ...customImage, alignSelf: 'center', margin: '0' }} // 이미지 위치 조정
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ ...customItem, borderRight: 'none' }}> {/* 여기서는 경계선 제거 */}
                      <Typography variant="h5" align="center" style={{ fontSize: '1rem', fontWeight: 'bold', marginTop: '30px' }}> {/* 텍스트 크기와 스타일 조정 */}
                        언제 어디서나 마음 껏 자유롭게!
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>


              <Grid item xs={12} md={6}>
                <Grid container spacing={0}>
                  <Grid item xs={6} style={{ borderRight: '1px solid #ccc', padding: '0', margin: '0' }}> {/* 여기서 Padding과 Margin을 0으로 설정 */}
                    <img
                        src={study}
                        alt="icon2"
                        style={{ ...customImage, alignSelf: 'center', margin: '0' }} // 이미지 위치 조정
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ ...customItem, borderRight: 'none' }}> {/* 여기서는 경계선 제거 */}
                      <Typography variant="h5" align="center" style={{ fontSize: '1rem', fontWeight: 'bold', marginTop: '30px' }}> {/* 텍스트 크기와 스타일 조정 */}
                       능력에 따른 효과적이고 맞춤형 학습
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>

              {/* 두 개의 추가 그리드 아이템 */}
              <Grid item xs={12} md={6}>
                <Grid container spacing={0}>
                  <Grid item xs={6} style={{ borderRight: '1px solid #ccc', padding: '0', margin: '0' }}> {/* 여기서 Padding과 Margin을 0으로 설정 */}
                    <img
                        src={free}
                        alt="icon3"
                        style={{ ...customImage, alignSelf: 'center', margin: '0' }} // 이미지 위치 조정
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ ...customItem, borderRight: 'none' }}> {/* 여기서는 경계선 제거 */}
                      <Typography variant="h5" align="center" style={{ fontSize: '1rem', fontWeight: 'bold', marginTop: '30px' }}> {/* 텍스트 크기와 스타일 조정 */}
                        무료로 인한 부담감 제로!
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}>
                <Grid container spacing={0}>
                  <Grid item xs={6} style={{ borderRight: '1px solid #ccc', padding: '0', margin: '0' }}> {/* 여기서 Padding과 Margin을 0으로 설정 */}
                    <img
                        src={design}
                        alt="icon4"
                        style={{ ...customImage, alignSelf: 'center', margin: '0' }} // 이미지 위치 조정
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ ...customItem, borderRight: 'none' }}> {/* 여기서는 경계선 제거 */}
                      <Typography variant="h5" align="center" style={{ fontSize: '1rem', fontWeight: 'bold', marginTop: '30px' }}> {/* 텍스트 크기와 스타일 조정 */}
                        모두가 좋아하는 편한 디자인!
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>






          {/* About Section*/}
          <div style={{marginTop : '100px'}}></div>
          <section className="page-section" style={{ backgroundColor: 'white', color: 'black' }} id="about">
    <div className="container">
      {/* About Section Heading*/}
      <h2 className="page-section-heading text-center"
          style={{paddingTop: '5px', color: 'black', fontWeight: 'bold'}}>
        너랑 나
      </h2>
      <div className="divider-custom"/>
      {/* About Section Content*/}
      <div className="row">
        <div className="col-lg-3 ms-auto"><p className="lead">너랑 나는 4명의 팀으로 구성되어 있습니다.</p></div>
        <div className="col-lg-3 me-auto"><p className="lead">효율적인 운영을 위해 늘 최선을 다하고 있습니다.</p></div>
      </div>
    </div>
  </section>
</div>
        </>
    )
}