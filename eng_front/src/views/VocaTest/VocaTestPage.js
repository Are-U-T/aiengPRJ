import './VocaTest.css'
import axios from "axios";
import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import ModalChange from "../MyPage/MypageArea/ModalChange";


export default function VocaTestPage() {

    const userNum = sessionStorage.getItem('userNum');

    const [voca, setVoca] = useState([]);
    const [modal, setModal] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [wrongCount, setWrongCount] = useState(0);

    const navigate = useNavigate();

    const move = () => {
        setModal(false);
        navigate('/mypage');
    }
    // word, mean box
    const vocaBox = () => {
        const vocaBoxes = [
            {text: "word"},
            {text: "mean"},
            {text: "word"},
            {text: "mean"},
        ]

        return vocaBoxes.map((box, index) => (
            <div key={index} className="vocaBoxName">
                {box.text}
            </div>
        ));
    }

    const generateVocaTestBoxes = (startIndex, endIndex) => {
        const vocaTestBoxes = [];

        for (let j = startIndex; j < endIndex; j++) {
            const vocaBoxes = [];

            for (let i = 0; i < 2; i++) {
                if (i % 2 === 1) {
                    vocaBoxes.push(<input key={i} type="text" className="vocaBoxName"/>);
                } else {
                    const wordIndex = j;
                    vocaBoxes.push(
                        <div key={i} className="vocaBoxName">
                            {voca[wordIndex] && (
                                <div key={i}>
                                    {voca[wordIndex].WORD}
                                </div>
                            )}
                        </div>
                    );
                }
            }

            // vocaTestBoxes에 한 줄 추가
            vocaTestBoxes.push(
                <div key={j} className="vocaBoxNameContainer">
                    {vocaBoxes}
                </div>
            );
        }

        return vocaTestBoxes;
    };

    const vocaTestBox1 = generateVocaTestBoxes(0, 15);
    const vocaTestBox2 = generateVocaTestBoxes(15, 30);

    // get voca
    const getVoca = async () => {

        const data = {
            userNum
        };

        try {
            const response = await axios.post('http://localhost/voca/test', data);
            console.log('응답:', response.data);
            setVoca(response.data);
        } catch (error) {
            console.error('error: ', error);
        }
    };

    useEffect(() => {
        getVoca();
    }, [])

    const vocaSend = async () => {

        const inputElements = document.querySelectorAll("input");
        console.log("(inputElements): ", inputElements);

        const inputData = Array.from(inputElements).map((input) => input.value);

        console.log("(Input Data): ", inputData);

        const data = {
            userNum: userNum,
            vocaData: inputData,
        }

        try {
            const response = await axios.post('http://localhost/voca/send', data)
            console.log("(vocaTestSend Front response): ", response.data);

            const correctCount = response.data[0];
            const wrongCount = response.data[1];

            setCorrectCount(correctCount);
            setWrongCount(wrongCount);

            setModal(true);
        } catch (error) {
            console.log("(vocaTestSend Front error): ", error);
        }
    }

    return (
        <>
            <div className="start"></div>
            <div className="vocaTestContainer">
                <div className="vocaTestTitleContainer">
                    <div className="vocaLine"></div>
                    <p className="vocaTestTitle">VOCABULARY</p>
                    <div className="vocaLine"></div>
                </div>
                <div className="vocaBoxNameContainer">{vocaBox()}</div>
                <div className="vocaTestBoxFlex">
                    <div className="vocaTestBox1">{vocaTestBox1}</div>
                    <div className="vocaTestBox2">{vocaTestBox2}</div>
                </div>

                {modal && (
                    <ModalChange isOpen={modal} onClose={() => setModal(false)}>
                        <p>정답: {correctCount}</p>
                        <p>오답: {wrongCount}</p>
                        <button className="modal-buttona" onClick={() => {
                            setModal(false);
                            move();
                        }}>
                            닫기
                        </button>
                    </ModalChange>
                )}

            </div>
            <button type="submit" className="vocaSendBtn" onClick={() => vocaSend()}>제출</button>
        </>
    )
}