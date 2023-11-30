import React, { useState, useEffect } from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel, { formLabelClasses } from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
//import Link from '@mui/joy/Link';
import { Link } from 'react-router-dom';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import Navigation from "../Navigation";
import logo from './images/logo.png';
import Avatar from "@mui/material/Avatar";
import { useNavigate } from 'react-router-dom';
import {GoogleOAuthProvider} from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import KakaoLogin from "react-kakao-login";
import loginValidation from './Validation';

function ColorSchemeToggle(props) {
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <IconButton size="sm" variant="outlined" color="neutral" disabled />;
    }

    return (

        <IconButton

            style={{
                width: '45px',
                height: '45px',
                padding: '8px',
                display: 'flex',
                justifyContent: 'center',
                alignItems : 'center'
            }}

            id="toggle-mode"
            size="sm"
            variant="outlined"
            color="neutral"
            aria-label="toggle light/dark mode"
            {...props}
            onClick={(event) => {
                if (mode === 'light') {
                    setMode('dark');
                } else {
                    setMode('light');
                }
                if (props.onClick) props.onClick(event);
            }}
        >
            {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
        </IconButton>
    );
}


export default function JoySignInSideTemplate() {

    const kakaoClientId = '0e395d0577e5959b7a73d1ebdcbcf376'
    const kakaoOnSuccess = async (data) => {
        console.log(data)
        try {
            const response = await fetch('http://localhost/user/google-login', {
                method: 'Put',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: data.profile.properties.nickname,
                    email: data.profile.kakao_account.email,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('User data from backend:', data);
                navigate('/main');
            } else {
                console.error('Failed to log in with Google.');
            }
        } catch (error) {
            console.error('Error during Google login:', error);
        }
    }
    const kakaoOnFailure = (error) => {
        console.log(error);
    };

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = {
            email: form.email.value,
            pw: form.password.value,
        };

        try {
            const response = await fetch('http://localhost/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Login successful:', responseData);

                navigate('/main');
            } else {
                const errorMessage = await response.text();
                console.error('Login failed:', errorMessage);

            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    }
    return (
        <>
            <Navigation/>
            <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
                <CssBaseline />
                <GlobalStyles
                    styles={{
                        ':root': {
                            '--Collapsed-breakpoint': '769px', // form will stretch when viewport is below `769px`
                            '--Cover-width': '50vw', // must be `vw` only
                            '--Form-maxWidth': '800px',
                            '--Transition-duration': '0.4s', // set to `none` to disable transition
                        },
                    }}
                />
                <Box
                    sx={(theme) => ({
                        width:
                            'clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)',
                        transition: 'width var(--Transition-duration)',
                        transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
                        position: 'relative',
                        zIndex: 1,
                        display: 'flex',
                        justifyContent: 'flex-end',
                        backdropFilter: 'blur(12px)',
                        backgroundColor: 'rgba(255 255 255 / 0.2)',
                        [theme.getColorSchemeSelector('dark')]: {
                            backgroundColor: 'rgba(19 19 24 / 0.4)',
                        },
                    })}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            minHeight: '100dvh',
                            width:
                                'clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)',
                            maxWidth: '100%',
                            px: 2,
                        }}
                    >

                        <Box
                            component="header"
                            sx={{
                                py: 11,
                                display: 'flex',
                                alignItems: 'left',
                                justifyContent: 'space-between',
                                marginLeft: 'auto',
                            }}
                        >

                            <ColorSchemeToggle />
                        </Box>




                        <Box
                            component="main"
                            sx={{
                                my: 'auto',
                                py: -5,
                                pb: 15,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                width: 400,
                                maxWidth: '100%',
                                mx: 'auto',
                                borderRadius: 'sm',
                                '& form': {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2,
                                },
                                [`& .${formLabelClasses.asterisk}`]: {
                                    visibility: 'hidden',
                                },
                            }}
                        >


                            <Stack gap={4} sx={{ mb: 2 }}>
                                <Stack gap={1}>
                                    <Typography level="h3">로그인</Typography>
                                    <Typography level="body-sm">
                                        아직 회원이 아닌가요?<span style={{ marginRight: '5px' }}></span>
                                        <Link to="/signup" level="title-sm" style={{ textDecoration: 'none' }}>
                                            회원가입 하러가기!
                                        </Link>
                                    </Typography>
                                </Stack>
                            </Stack>

                            <Stack gap={4} sx={{ mt: 2 }}>
                                <form onSubmit={handleSubmit}>
                                    <FormControl required>
                                        <FormLabel>이메일</FormLabel>
                                        <Input type="email" name="email" />
                                    </FormControl>
                                    <FormControl required>
                                        <FormLabel>비밀번호</FormLabel>
                                        <Input type="password" name="password" />
                                    </FormControl>
                                    <Stack gap={4} sx={{ mt: -2}}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}
                                        >
                                        </Box>
                                        <Button type="submit" fullWidth>
                                            로그인
                                        </Button>

                                        <KakaoLogin
                                            token={kakaoClientId}
                                            onSuccess={kakaoOnSuccess}
                                            onFail={kakaoOnFailure}
                                        />


                                        <GoogleOAuthProvider clientId="868155967382-ubbhk0fdkoq93q63btkkmeats8h5p7o2.apps.googleusercontent.com">
                                            <GoogleLogin
                                                onSuccess={async credentialResponse => {
                                                    var decoded = jwtDecode(credentialResponse.credential);
                                                    try {
                                                        const response = await fetch('http://localhost/user/google-login', {
                                                            method: 'Put',
                                                            headers: {
                                                                'Content-Type': 'application/json',
                                                            },
                                                            body: JSON.stringify({
                                                                name: decoded.name,
                                                                email: decoded.email,}),
                                                        });

                                                        if (response.ok) {
                                                            const data = await response.json();
                                                            console.log('User data from backend:', data);
                                                            navigate('/main');
                                                        } else {
                                                            console.error('Failed to log in with Google.');
                                                        }
                                                    } catch (error) {
                                                        console.error('Error during Google login:', error);
                                                    }
                                                }}
                                                onError={() => {
                                                    console.log('Login Failed');
                                                }}
                                            />
                                        </GoogleOAuthProvider>

                                    </Stack>
                                </form>
                            </Stack>
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={(theme) => ({
                        height: '100%',
                        position: 'absolute',
                        right: 0,
                        top:'80px',
                        bottom: 0,
                        left: 'clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))',
                        transition:
                            'background-image var(--Transition-duration), left var(--Transition-duration) !important',
                        transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
                        backgroundColor: 'background.level1',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundImage:
                            'url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)',
                        [theme.getColorSchemeSelector('dark')]: {
                            backgroundImage:
                                'url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)',
                        },
                    })}
                />
            </CssVarsProvider>
        </>
    );
}