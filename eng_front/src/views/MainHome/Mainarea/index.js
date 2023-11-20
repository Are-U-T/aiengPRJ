import React, {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from './Typography';
import Button from './Button';
import productCurvyLines from './images/productCurvyLines.png';
import aic from './images/AI대화.png';
import eng from './images/영어학습.png';
import success from './images/성공사례.png';
import logo from './images/logo.png';


const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

const number = {
  fontSize: 24,
  fontFamily: 'default',
  color: 'secondary.main',
  fontWeight: 'medium',
};

const image = {
  height: 55,
  my: 4,
};
export default function Mainarea(){

    return (
        <>
        <div>
  {/* Portfolio Section*/}
  <section className="page-section portfolio" id="portfolio">
    <div className="container">
      {/* Portfolio Section Heading*/}
      <h2 className="page-section-heading text-center"
          style={{ marginTop: '40px', fontWeight: 'bold', fontSize: '40px', color: '#333' }}>학습 효과</h2>

      {/* Icon Divider*/}
      <div className="divider-custom">
        <div className="divider-custom-line" />
        <div className="divider-custom-icon"><i className="fas fa-star" /></div>
        <div className="divider-custom-line" />
      </div>
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

          <Box
              component="section"
              sx={{ display: 'flex', overflow: 'hidden', bgcolor: 'yellow' }}
          >
            <Container sx={{ mt: 15, mb: 20, display: 'flex', position: 'relative' }}>
              <Box
                  component="img"
                  src={productCurvyLines}
                  alt="curvy lines"
                  sx={{ pointerEvents: 'none', position: 'absolute', top: -180 }}
              />
              <Grid container spacing={5}>
                <Grid item xs={12} md={4}>
                  <Box sx={item}>
                    <Box
                        component="img"
                        src={logo}
                        alt="suitcase"
                        sx={{ height: 55 }}
                    />
                    <Typography variant="h6" sx={{ my: 5 }}>
                      The best luxury hotels
                    </Typography>
                    <Typography variant="h5">
                      {
                        'From the latest trendy boutique hotel to the iconic palace with XXL pool'
                      }

                      {
                        ', go for a mini-vacation just a few subway stops away from your home.'
                      }
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={item}>
                    <Box
                        component="img"
                        src={logo}
                        alt="graph"
                        sx={{ height: 55 }}
                    />
                    <Typography variant="h6" sx={{ my: 5 }}>
                      New experiences
                    </Typography>
                    <Typography variant="h5">
                      {
                        'Privatize a pool, take a Japanese bath or wake up in 900m2 of garden… '
                      }

                      {'your Sundays will not be alike.'}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={item}>
                    <Box
                        component="img"
                        src={logo}
                        alt="clock"
                        sx={{ height: 55 }}
                    />
                    <Typography variant="h6" sx={{ my: 5 }}>
                      Exclusive rates
                    </Typography>
                    <Typography variant="h5">
                      {'By registering, you will access specially negotiated rates '}
                      {'that you will not find anywhere else.'}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>




          <Box
              component="section"
              sx={{ display: 'flex', bgcolor: 'sky', overflow: 'hidden' }}
          >
            {/*secondary.light*/}
            <Container
                sx={{
                  mt: 10,
                  mb: 15,
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
            >
              <Box
                  component="img"
                  src={productCurvyLines}
                  alt="curvy lines"
                  sx={{
                    pointerEvents: 'none',
                    position: 'absolute',
                    top: -180,
                    opacity: 0.7,
                  }}
              />
              <Typography variant="h4" marked="center" component="h2" sx={{ mb: 14 }}>
                How it works
              </Typography>
              <div>
                <Grid container spacing={5}>
                  <Grid item xs={12} md={4}>
                    <Box sx={item}>
                      <Box sx={number}>1.</Box>
                      <Box
                          component="img"
                          src={logo}
                          alt="suitcase"
                          sx={image}
                      />
                      <Typography variant="h5" align="center">
                        Appointment every Wednesday 9am.
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box sx={item}>
                      <Box sx={number}>2.</Box>
                      <Box
                          component="img"
                          src={logo}
                          alt="graph"
                          sx={image}
                      />
                      <Typography variant="h5" align="center">
                        First come, first served. Our offers are in limited quantities, so
                        be quick.
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box sx={item}>
                      <Box sx={number}>3.</Box>
                      <Box
                          component="img"
                          src={logo}
                          alt="clock"
                          sx={image}
                      />
                      <Typography variant="h5" align="center">
                        {'New offers every week. New experiences, new surprises. '}
                        {'Your Sundays will no longer be alike.'}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </Box>

  {/* About Section*/}
          <section className="page-section" style={{ backgroundColor: 'yellow', color: 'black' }} id="about">
    <div className="container">
      {/* About Section Heading*/}
      <h2 className="page-section-heading text-center"
          style={{paddingTop: '5px', color: 'black', fontWeight: 'bold'}}>
        너랑 나
      </h2>
      {/* Icon Divider*/}
      <div className="divider-custom" style={{marginRight: '-20px', marginTop: '-10px'}}>
        <div className="divider-custom-line" />
        <div className="divider-custom-icon"><i className="fas fa-star" /></div>
        <div className="divider-custom-line" />
      </div>
      {/* About Section Content*/}
      <div className="row">
        <div className="col-lg-4 ms-auto"><p className="lead">Freelancer is a free bootstrap theme created by Start Bootstrap. The download includes the complete source files including HTML, CSS, and JavaScript as well as optional SASS stylesheets for easy customization.</p></div>
        <div className="col-lg-4 me-auto"><p className="lead">You can create your own custom avatar for the masthead, change the icon in the dividers, and add your email address to the contact form to make it fully functional!</p></div>
      </div>
    </div>
  </section>
</div>
        </>
    )
}