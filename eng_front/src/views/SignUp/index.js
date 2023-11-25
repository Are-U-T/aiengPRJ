import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
//import Link from '@mui/material/Link';
import {Link} from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Navigation from "../Navigation";
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import $ from "jquery";


const defaultTheme = createTheme();

export default function SignInSide() {
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const userData = {
            email: data.get('mail'),
            pw: data.get('password'),
            name: data.get('name'),
            gender: data.get('gender'),
        };

        try {
            const response = await fetch('http://localhost/user/save', {
                method: 'Put',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                console.log('User registered successfully.');
                navigate('/login');
            } else {
                console.error('Failed to register user.');
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    // 이메일 인증
    const $ = require("jquery");

    async function sendNum() {
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
        const num1 = $("#number").val();
        // const num2 = $("#Confirm").val();

        axios.post("confirm", {
            num1: num1,
            // num2: num2
        })
            .then((response) => {
                if (response.data === "success") {
                    alert("인증 성공");
                } else {
                    alert("인증 실패");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }


    return (
        <>
            <Navigation/>
            <ThemeProvider theme={defaultTheme}>
                <Grid container component="main" sx={{height: '100vh'}}>
                    <CssBaseline/>
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
                            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                                <LockOutlinedIcon/>
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign up
                            </Typography>

                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
                                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                    <TextField // 이메일 입력
                                        margin="normal"
                                        required
                                        fullWidth={false}
                                        style={{flex: 9}}
                                        id="mail"
                                        label="Email Address"
                                        name="mail"
                                        autoComplete="mail"
                                        autoFocus
                                        value="kyeonghee_@naver.com"
                                    />

                                    <Button // 인증 버튼 (인증번호 메일 요청)
                                        variant="contained"
                                        style={{flex: 1, backgroundColor: 'black'}}
                                        onClick={sendNum}
                                        name="sendBtn"
                                        id="sendBtn"
                                    >
                                        인증
                                    </Button>
                                </div>

                                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                    <TextField // 인증번호 입력
                                        margin="normal"
                                        required
                                        fullWidth={false}
                                        style={{flex: 8}}
                                        id="number"
                                        label="인증번호 입력"
                                        name="number"
                                    />

                                    <Button // 인증확인 버튼 (인증번호 정확하게 입력했는지 확인)
                                        variant="contained"
                                        style={{flex: 2, backgroundColor: 'black'}}
                                        onClick={confirmNum}
                                        id="confirmBtn"
                                        name="confirmBtn"
                                    >
                                        인증확인
                                    </Button>

                                    {/*<script>*/}
                                    {/*    const input = document.createElement("input");*/}
                                    {/*    input.type = "text";*/}
                                    {/*    input.id = "Confirm";*/}
                                    {/*    input.name = "Confirm";*/}
                                    {/*    input.style.display = "none";*/}
                                    {/*    input.value = "";*/}

                                    {/*    const container = document.getElementById("container");*/}
                                    {/*    container.appendChild(input);*/}
                                    {/*</script>*/}
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
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="name"
                                    autoComplete="name"
                                    autoFocus
                                />

                                <FormControl component="fieldset" sx={{mt: 2, mb: 2}}>
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
                                        backgroundColor: 'black',
                                        '&:hover': {
                                            backgroundColor: 'black'
                                        }
                                    }}
                                >
                                    Sign Up
                                </Button>


                                <Grid container>
                                    <Grid item xs/>
                                    <Grid item>
                                        <Link to="/login" variant="body2" style={{textDecoration: 'none'}}>
                                            {"Already have an account? Sign in"}
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