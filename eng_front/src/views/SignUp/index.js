import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import {Link} from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import userValidation from './Validation';

const defaultTheme = createTheme();

export default function SignInSide() {
    const navigate = useNavigate();

    const handleSubmit = async (event) => {

        userValidation();

        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const userData = {
            email: data.get('mail'),
            pw: data.get('password'),
            name: data.get('name'),
            gender: data.get('gender'),
        };

        try {
            // 첫 번째 요청: 이메일 검증
            // const validateResponse = await fetch('http://localhost/user/save', {
            //     method: 'put',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(userData),
            // });

            // if (validateResponse.status === 200) {
                // 두 번째 요청: 사용자 정보 저장
                const saveResponse = await fetch('http://localhost/user/save', {
                    method: 'put',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });

                if (saveResponse.ok) {
                    console.log('User registered successfully.');
                    navigate('/login');
                } else {
                    console.error('Failed to register user.');
                }
            // }
            // else {
            //     console.error('Email validation failed.');
            // }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    // 이메일 인증
    const $ = require("jquery");

    async function sendNum() {

        const mail = document.querySelector("input[id=mail]");

        if (mail.value == "") {
            alert("이메일을 입력하세요.");
            mail.focus();
            return false;
        }
        ;

        // var mailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
        var mailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
        if (!mailRegExp.test(mail.value)) {
            alert("올바른 이메일을 입력해주세요.");
            mail.focus();
            mail.value = "";
            return false;
        }

        const emailData = {
            email: $("#mail").val(),
        };

        try {
            const response = await axios.post('http://localhost/mail', emailData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                console.log('Email sent successfully.');
            } else {
                console.error('Failed to send email.');
            }
        } catch (error) {
            console.error('Error during email sending:', error);
        }
    }

    // 사용자가 입력한 인증번호와 서버에서 받은 인증번호를 비교
    function confirmNum() {

        const number = document.querySelector("input[id=number]");

        const num1 = $("#number").val();

        if (num1) {
            axios.post("http://localhost/confirm", {
                num1: num1,
            })
                .then((response) => {
                    if (response.data === "success") {
                        alert("인증 성공");
                    } else {
                        alert("인증 실패");
                        number.focus();
                        number.value = "";
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }


    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                회원가입
                            </Typography>

                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth={false}
                                        style={{ flex: 9 }}
                                        id="mail"
                                        label="Email Address"
                                        name="mail"
                                        autoComplete="mail"
                                        autoFocus
                                        placeholder="이메일 입력"
                                    />

                                    <Button
                                        variant="contained"
                                        style={{ flex: 1 , backgroundColor : '#1D2B64'}}
                                        onClick={sendNum}
                                        name="sendBtn"
                                        id="sendBtn"
                                    >
                                        인증
                                    </Button>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth={false}
                                        style={{ flex: 8 }}
                                        id="number"
                                        label="Key Number"
                                        name="number"
                                        placeholder="인증번호 입력"
                                    />

                                    <Button
                                        variant="contained"
                                        style={{ flex: 2, backgroundColor: '#1D2B64' }}
                                        onClick={confirmNum}
                                        id="confirmBtn"
                                        name="confirmBtn"

                                    >
                                        인증 확인
                                    </Button>
                                </div>

                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    placeholder="영문 + 숫자 + 특수문자 조합으로 8~15글자"
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="name"
                                    autoComplete="name"
                                    placeholder="이름 입력"
                                />

                                <FormControl component="fieldset" sx={{ mt: 2, mb: 2 }}>
                                    <FormLabel component="legend">Gender</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-label="gender"
                                        name="gender"
                                        defaultValue={1}
                                    >
                                        <FormControlLabel value={1} control={<Radio/>} label="man"/>
                                        <FormControlLabel value={0} control={<Radio/>} label="woman"/>
                                    </RadioGroup>
                                </FormControl>



                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        mt: 3,
                                        mb: 2,
                                        padding: '6px 12px',
                                        backgroundColor: '#1D2B64',
                                        '&:hover': {
                                            backgroundColor: 'black'
                                        },
                                        width: '100%'
                                    }}
                                >
                                    회원가입
                                </Button>


                                <Grid container>
                                    <Grid item xs/>
                                    <Grid item>
                                        <Link to="/login" variant="body2" style={{ textDecoration: 'none' }}>
                                            {"이미 계정이 있나요? 로그인하러 가기"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </>
    );
}