/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Button from '@mui/joy/Button';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@mui/joy/Typography';
import ArrowForward from '@mui/icons-material/ArrowForward';
import TwoSidedLayout from './TwoSidedLayout';
import {useNavigate} from "react-router-dom";
import MuiLink from '@mui/material/Link';
import aip from "../MainHome/Header/images/헤더사진.png";
import './Start.css';

export default function HeroLeft09() {

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/main');
    };


    return (
        <>
        {/*    <div className='make'>*/}
        {/*<TwoSidedLayout reversed>*/}
        {/*    <Typography*/}
        {/*        level="h1"*/}
        {/*        fontWeight="xl"*/}
        {/*        fontSize="clamp(1.575rem, 1.3636rem + 1.4818vw, 3rem)"*/}
        {/*        //fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"*/}
        {/*        textColor="#132650"*/}
        {/*    >*/}
        {/*        AI 영어 회화 학습에<br/> 오신 것을 환영합니다!*/}
        {/*    </Typography>*/}

        {/*    <Typography fontSize="lg" textColor="#132650" lineHeight="lg">*/}
        {/*        실제 사람과 대화하듯<br/>*/}
        {/*        대화해보세요!*/}
        {/*    </Typography>*/}
        {/*    <Button*/}
        {/*        size="lg"*/}
        {/*        endDecorator={<ArrowForward fontSize="xl" />}*/}
        {/*        sx={{ mt: 2, mb: 1 }}*/}
        {/*        onClick={handleButtonClick}*/}
        {/*    >*/}
        {/*        시작하기*/}
        {/*    </Button>*/}
        {/*    <Typography>*/}
        {/*       회원인가요? <MuiLink component={RouterLink} to="/login" fontWeight="lg">*/}
        {/*        로그인 하러가기*/}
        {/*    </MuiLink>*/}
        {/*    </Typography>*/}

        {/*</TwoSidedLayout>*/}
        {/*    </div>*/}



            <div className="d-flex justify-content-center align-items-center make" style={{  color: '#132650' }}>
                <div style={{ marginRight: '100px' }}>
                    <Typography
                        level="h1"
                        fontWeight="xl"
                        fontSize="clamp(1.575rem, 1.3636rem + 1.4818vw, 3rem)"
                        textColor="#132650"
                    >
                        AI 영어 회화 학습에<br /> 오신 것을 환영합니다!
                    </Typography>

                    <Typography level="h4" marginTop="20px">
                        실제 사람과 대화하듯
                    </Typography>
                    <Typography level="h4">
                        대화해보세요!
                    </Typography>

                    <Button
                        size="lg"
                        endDecorator={<ArrowForward fontSize="xl" />}
                        sx={{ mt: 2, mb: 1 }}
                        onClick={handleButtonClick}
                    >
                        시작하기
                    </Button>
                    <Typography>
                        회원인가요?{' '}
                        <MuiLink component={RouterLink} to="/login" fontWeight="lg">
                            로그인 하러가기
                        </MuiLink>
                    </Typography>
                </div>

                <img src={aip} alt="Description" style={{ width: '600px', height: 'auto' }} />
            </div>








        </>
    );
}