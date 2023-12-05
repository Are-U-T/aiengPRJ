import './VocaTest.css'
import axios from "axios";
import React, {useEffect, useState} from "react";

export default function VocaTestPage() {

    const userNum = sessionStorage.getItem('userNum');

    const [voca, setVoca] = useState([]);

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

    // voca test box
    const vocaTestBox1 = () => {
        const vocaTestBoxes = [];

        // 좌
        for (let j = 0; j < 15; j++) {
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
    }

    const vocaTestBox2 = () => {
        const vocaTestBoxes2 = [];

        // 우
        for (let j = 15; j < 30; j++) {
            const vocaBoxes2 = [];

            for (let i = 0; i < 2; i++) {
                if (i % 2 === 1) {
                    vocaBoxes2.push(<input key={i} type="text" className="vocaBoxName"/>);
                } else {
                    const wordIndex = j
                    vocaBoxes2.push(
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
            vocaTestBoxes2.push(
                <div key={j} className="vocaBoxNameContainer">
                    {vocaBoxes2}
                </div>
            );
        }

        return vocaTestBoxes2;
    }

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
                    <div className="vocaTestBox1">{vocaTestBox1()}</div>
                    <div className="vocaTestBox2">{vocaTestBox2()}</div>
                </div>
            </div>
        </>
    )
}