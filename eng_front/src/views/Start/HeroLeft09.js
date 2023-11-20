/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Button from '@mui/joy/Button';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@mui/joy/Typography';
import ArrowForward from '@mui/icons-material/ArrowForward';
import TwoSidedLayout from './TwoSidedLayout';
import {useNavigate} from "react-router-dom";
import MuiLink from '@mui/material/Link';

export default function HeroLeft09() {

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/main');
    };


    return (
        <TwoSidedLayout reversed>
            <Typography
                level="h1"
                fontWeight="xl"
                fontSize="clamp(1.575rem, 1.3636rem + 1.4818vw, 3rem)"
                //fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
            >
                AI 영어 회화 학습에<br/> 오신 것을 환영합니다!
            </Typography>

            <Typography fontSize="lg" textColor="text.secondary" lineHeight="lg">
                A descriptive secondary text placeholder. Use it to explain your business
                offer better.
            </Typography>
            <Button
                size="lg"
                endDecorator={<ArrowForward fontSize="xl" />}
                sx={{ mt: 2, mb: 1 }}
                onClick={handleButtonClick}
            >
                Get Started
            </Button>
            <Typography>
                Already a member? <MuiLink component={RouterLink} to="/login" fontWeight="lg">
                Sign in
            </MuiLink>
            </Typography>

        </TwoSidedLayout>
    );
}