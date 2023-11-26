import React, {useState, useEffect} from 'react';
import {CssVarsProvider, useColorScheme} from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel, {formLabelClasses} from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
//import Link from '@mui/joy/Link';
import {Link} from 'react-router-dom';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import Navigation from "../Navigation";
import logo from './images/logo.png';
import {useNavigate} from 'react-router-dom';
import $ from "jquery";
import axios from "axios";
import NaverLogin from 'react-naver-login';

function ColorSchemeToggle(props) {
    const {mode, setMode} = useColorScheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <IconButton size="sm" variant="outlined" color="neutral" disabled/>;
    }

    return (

        <IconButton
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
            {mode === 'light' ? <DarkModeRoundedIcon/> : <LightModeRoundedIcon/>}
        </IconButton>
    );
}

export default function JoySignInSideTemplate() {
    // 네이버 소셜로그인 //
    // const NAVER_CLIENT_ID = "Z1aW6yz9f3F2pxa5d41X"; // 발급받은 클라이언트 아이디
    // const REDIRECT_URI = "http://localhost:3000/oauth/naver/callback"; // Callback URL
    // const STATE = "flase";
    // const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;

    // const NaverLogin = () => {
    //     window.location.href = NAVER_AUTH_URL;
    // };

    const [access_token, setAccessToken] = useState();

    const handleLogin = () => {

        NaverLogin.login({
            clientId: "Z1aW6yz9f3F2pxa5d41X",
            callbackUrl: "http://localhost:3000/oauth/naver/callback",
        });
    };

    const handleAccessToken = (result) => {
        const { access_token } = result;
        setAccessToken(access_token);

        NaverLogin.getProfile({
            access_token,
        }).then((profile) => {
            console.log(profile);
        }).catch((error) => {
            console.error(error);
        });
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
                <CssBaseline/>
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
                                py: 3,
                                display: 'flex',
                                alignItems: 'left',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Box
                                sx={{
                                    gap: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <IconButton variant="soft" color="primary" size="sm">
                                    <img src={logo} alt="Logo" style={{width: 50, height: 50}}/>
                                </IconButton>
                                <Typography level="title-lg">너 T야?</Typography>
                            </Box>
                            <ColorSchemeToggle/>
                        </Box>
                        <Box
                            component="main"
                            sx={{
                                my: 'auto',
                                py: 2,
                                pb: 5,
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
                            <Stack gap={4} sx={{mb: 2}}>
                                <Stack gap={1}>
                                    <Typography level="h3">Sign in</Typography>
                                    <Typography level="body-sm">
                                        New to company?{' '}
                                        <Link to="/signup" level="title-sm">
                                            Sign up!
                                        </Link>
                                    </Typography>
                                </Stack>
                            </Stack>

                            <Stack gap={4} sx={{mt: 2}}>
                                <form onSubmit={handleSubmit}>
                                    <FormControl required>
                                        <FormLabel>Email</FormLabel>
                                        <Input type="email" name="email"/>
                                    </FormControl>
                                    <FormControl required>
                                        <FormLabel>Password</FormLabel>
                                        <Input type="password" name="password"/>
                                    </FormControl>
                                    <Stack gap={4} sx={{mt: 2}}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}
                                        >
                                            {/*<Checkbox size="sm" label="Remember me" name="persistent" />*/}
                                            {/*<Link level="title-sm" href="#replace-with-a-link">*/}
                                            {/*    Forgot your password?*/}
                                            {/*</Link>*/}
                                        </Box>
                                        <Button type="submit" fullWidth>
                                            Sign in
                                        </Button>

                                        {/*<div>*/}
                                        {/*    <button onClick={handleLogin}>네이버 로그인</button>*/}
                                        {/*    {access_token && (*/}
                                        {/*        <div>*/}
                                        {/*            <h2>Access Token: {access_token}</h2>*/}
                                        {/*            {handleAccessToken(access_token)}*/}
                                        {/*        </div>*/}
                                        {/*    )}*/}
                                        {/*</div>*/}

                                        <NaverLogin
                                            clientId="Z1aW6yz9f3F2pxa5d41X"
                                            callbackUrl="http://localhost:3000/oauth/naver/callback"
                                            render={(props) => <div onClick={props.onClick}>Naver Login</div>}
                                            onSuccess={(result) => {
                                                const { access_token } = result;
                                                setAccessToken(access_token);
                                            }}
                                            onFailure={(result) => console.error(result)}
                                        />

                                        {/*<NaverLogin*/}
                                        {/*    clientId="Z1aW6yz9f3F2pxa5d41X"*/}
                                        {/*    callbackUrl="http://localhost:3000/oauth/naver/callback"*/}
                                        {/*    render={(props) => <div onClick={props.onClick}>Naver Login</div>}*/}
                                        {/*    onSuccess={(naverUser) => console.log(naverUser)}*/}
                                        {/*    onFailure={() => console.error("false")}*/}
                                        {/*/>*/}
                                    </Stack>
                                </form>
                            </Stack>
                        </Box>
                        <Box component="footer" sx={{py: 3}}>
                            <Typography level="body-xs" textAlign="center">
                                © 너랑 나 {new Date().getFullYear()}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={(theme) => ({
                        height: '100%',
                        position: 'absolute',
                        right: 0,
                        top: '86px',
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