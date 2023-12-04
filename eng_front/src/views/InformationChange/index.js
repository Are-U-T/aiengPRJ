import * as React from 'react';
import Navigation from "../Navigation";
import '../../App.css'
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import {styled} from '@mui/system';
import $ from "jquery";
import axios from "axios";
import userValidation from './Validation';

const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#eceff1',
});

const StyledForm = styled(Box)({
    width: '100%',
    maxWidth: '600px', // 수정된 폼 크기
    padding: '40px', // 수정된 패딩
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
});

const StyledRadioGroup = styled(RadioGroup)({
    flexDirection: 'row',
});

export default function MyProfile() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState('');
    const [userProfile, setUserProfile] = useState();
    const [email, setEmail] = useState('');
    const userNum = sessionStorage.getItem('userNum');


    async function handleSubmit(event) {
        event.preventDefault();
        if (userValidation(name, password, email)) {
            let sex = (gender === "female") ? 0 : 1;

            const userData = {
                email: email,
                pw: password,
                name: name,
                gender: sex,
                num: userNum
            };

            try {
                const saveResponse = await fetch('http://localhost/user/editById', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });

                if (saveResponse.ok) {
                    console.log('User registered successfully.');
                    sessionStorage.setItem('userName', name);
                    navigate('/mypage');


                } else {
                    console.error('Failed to register user.');
                }
            } catch (error) {
                console.error('Error during registration:', error);
            }
        }
    }


    return (
        <Container>
            <Navigation/>
            <StyledForm>
                <Typography variant="h5" sx={{mb: 4, color: '#0d47a1'}}>개인정보 수정</Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{mb: 2}}
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    placeholder="이름 입력"
                />
                <TextField
                    fullWidth
                    label="비밀번호"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{mb: 3}}
                    name="password"
                    id="password"
                    placeholder="영문 + 숫자 + 특수문자 조합으로 8~15글자"
                />

                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 3, textAlign: 'left'}}>
                    <FormLabel sx={{mr: 1, color: '#0d47a1'}}>성별:</FormLabel>
                    <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} aria-label="gender"
                         name="gender">
                        <Radio checked={gender === 'male'} onChange={(e) => setGender(e.target.value)} value="male"/>
                        <Typography>남성</Typography>
                        <Radio checked={gender === 'female'} onChange={(e) => setGender(e.target.value)}
                               value="female"/>
                        <Typography>여성</Typography>
                    </Box>
                </Box>

                <Box sx={{display: 'flex', justifyContent: 'center', gap: 2, mt: 2}}>
                    <Button variant="contained" color="primary" onClick={handleSubmit} sx={{width: '150px'}}>저장</Button>
                    <Button variant="outlined" color="primary" onClick={() => navigate('/mypage')}
                            sx={{width: '150px'}}>닫기</Button>
                </Box>
            </StyledForm>
        </Container>
    );
}
