import { useLocation } from 'react-router-dom';
import LV1 from './images/LV1.png';
import LV2 from './images/LV2.png';
import LV3 from './images/LV3.png';
import LV4 from './images/LV4.png';
import LV5 from './images/LV5.png';
import LV6 from './images/LV6.png';
import {useEffect} from "react";


const ResultPage = () => {
    const location = useLocation();
    const score = location.state ? location.state.score : null;


    useEffect(() => {
        if (score !== null) {
            console.log('score: ', score);
            saveLevelToDatabase(score);
        }
    }, [score]); // 這個 useEffect 依賴於 score

    const saveLevelToDatabase = async (score) => {
        try {
            let userLv;
            if (score >= 90) {
                userLv = 6;
            } else if (score >= 80) {
                userLv = 5;
            } else if (score >= 60) {
                userLv = 4;
            } else if (score >= 40) {
                userLv = 3;
            } else if (score >= 20) {
                userLv = 2;
            } else {
                userLv = 1;
            }
            const userNum = sessionStorage.getItem('userNum');
            const response = await fetch('http://localhost/user/saveLevel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    lv: userLv,
                    num: userNum,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                // 成功處理的邏輯
                console.log('Level saved to database:', data);
            } else {
                // 失敗處理的邏輯
                const errorMessage = await response.text();
                console.error('Error saving level to database:', errorMessage);
            }
        } catch (error) {
            // 失敗處理的邏輯
            console.error('Error saving level to database:', error);
        }
    };


    return (
        <div style={{ backgroundColor: 'white', height: '100vh',  width: '1024px',margin: 'auto', flexDirection: 'column', justifyContent: 'center'}}>
            {/*<h2>Your Score: {score} / 100</h2>*/}
            {score >= 90 ? (
                <img src={LV6} style={{ maxWidth: '100%',  width: 'auto', height: 'auto' }}/>
            ) : score >= 80 ? (
                <img src={LV5} style={{ maxWidth: '100%',  width: 'auto', height: 'auto' }}/>
            ) : score >= 60 ? (
                <img src={LV4} style={{ maxWidth: '100%',  width: 'auto', height: 'auto' }}/>
            ) : score >= 40 ? (
                <img src={LV3} style={{ maxWidth: '100%',  width: 'auto', height: 'auto' }}/>
            ) : score >= 20 ? (
                <img src={LV2} style={{ maxWidth: '100%',  width: 'auto', height: 'auto' }}/>
            ) : (
                <img src={LV1} style={{ maxWidth: '100%',  width: 'auto', height: 'auto' }}/>
            )}
        </div>


    );
};

export default ResultPage;

