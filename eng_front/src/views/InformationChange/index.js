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
import P1 from '../MyPage/MypageArea/images/1.png';
import P2 from '../MyPage/MypageArea/images/2.png';
import P3 from '../MyPage/MypageArea/images/3.png';
import P4 from '../MyPage/MypageArea/images/4.png';
import P5 from '../MyPage/MypageArea/images/5.png';
import P6 from '../MyPage/MypageArea/images/6.png';
import P7 from '../MyPage/MypageArea/images/7.png';
import P8 from '../MyPage/MypageArea/images/8.png';
import P9 from '../MyPage/MypageArea/images/9.png';
import ModalSeico from './ModalResult';
import './ModalResult.css';

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

const photos = [P1, P2, P3, P4, P5, P6, P7, P8, P9];

export default function MyProfile() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState('');
    const [profile, setProfile] = useState(null);
    const [email, setEmail] = useState('');
    const userNum = sessionStorage.getItem('userNum');
    const [modalKorean,setModalKorean] = useState(false);

    const userPhotoNumber = parseInt(sessionStorage.getItem('userPhoto')) || 1;
    let [PhotoNo,setPhotoNo] = useState();
    const [selectedPhoto,setSelectedPhoto] = useState();

    useEffect(() => {
        switch (userPhotoNumber) {
            case 1:
                setSelectedPhoto(P1);
                break;
            case 2:
                setSelectedPhoto(P2);
                break;
            case 3:
                setSelectedPhoto(P3);
                break;
            case 4:
                setSelectedPhoto(P4);
                break;
            case 5:
                setSelectedPhoto(P5);
                break;
            case 6:
                setSelectedPhoto(P6);
                break;
            case 7:
                setSelectedPhoto(P7);
                break;
            case 8:
                setSelectedPhoto(P8);
                break;
            case 9:
                setSelectedPhoto(P9);
                break;
            default:
                setSelectedPhoto(profile);
        }
    }, [userPhotoNumber, profile]);

    const handlePhotoSelect = (index) => {
        setSelectedPhoto(photos[index]);
        setPhotoNo(index+1);




        setModalKorean(false);
    };



    async function handleSubmit(event) {
        event.preventDefault();
        if (userValidation(name, password, email)) {
            let sex = (gender === "female") ? 0 : 1;

            const userData = {
                email: email,
                pw: password,
                name: name,
                gender: sex,
                num: userNum,
                photo: PhotoNo,
            };
            console.log(userData);
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
                    sessionStorage.setItem('userPhoto', PhotoNo);

                    navigate('/mypage');


                } else {
                    console.error('Failed to register user.');
                }
            } catch (error) {
                console.error('Error during registration:', error);
            }
        }
    }

    const korean = () =>{
        setModalKorean(true);
    }

    return (
        <div className='App'>
            <Navigation/>
            <Container>
                <StyledForm>
                    <Typography variant="h5" sx={{mb: 4, color: '#0d47a1'}}>개인정보 수정</Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', mb: 3 }}>
                        <img src={selectedPhoto} alt="Profile" style={{ width: '150px', height: '150px', borderRadius: '50%' }} onClick={() => setModalKorean(true)}/>
                    </Box>

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
                            <Radio checked={gender === 'male'} onChange={(e) => setGender(e.target.value)}
                                   value="male"/>
                            <Typography>남성</Typography>
                            <Radio checked={gender === 'female'} onChange={(e) => setGender(e.target.value)}
                                   value="female"/>
                            <Typography>여성</Typography>
                        </Box>
                    </Box>

                    <Box sx={{display: 'flex', justifyContent: 'center', gap: 2, mt: 2}}>
                        <Button variant="contained" color="primary" onClick={handleSubmit}
                                sx={{width: '150px'}}>저장</Button>
                        <Button variant="outlined" color="primary" onClick={() => navigate('/mypage')}
                                sx={{width: '150px'}}>닫기</Button>
                    </Box>
                </StyledForm>
            </Container>

            {modalKorean && (
                <ModalSeico isOpen={modalKorean} onClose={() => setModalKorean(false)}>
                    <div className="modal-text" style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>
                        프로필 변경
                    </div>
                    <div className="modal-photo">
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {photos.map((photo, index) => (
                                <img
                                    key={index}
                                    src={photo}
                                    alt={`Profile ${index}`}
                                    onClick={() => handlePhotoSelect(index)}
                                    style={{ margin: '10px', width: '150px', height: '150px', borderRadius: '50%' }}
                                />
                            ))}
                        </div>

                    </div>
                    <button className="modal-button" onClick={() => setModalKorean(false)}>닫기</button>
                </ModalSeico>
            )}

        </div>
    );
}