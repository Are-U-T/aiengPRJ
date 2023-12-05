import React, {useState, useEffect} from 'react';
import './RankingArea.css';
import '../../../App.css'
import king from './images/kingImg.webp';
import axios from "axios";

export default function RankingArea() {

    const [rankList, setRankList] = useState([]);
    const [isMonthly, setIsMonthly] = useState(true);
    const userNum = sessionStorage.getItem('userNum');

    useEffect(() => {
        fetchRankListMonth();
    }, []);

    const fetchRankListMonth = async () => {
        try {
            const response = await axios.get('http://localhost/ranking/monthly-rank');
            console.log('답:', response.data); // 응답 로깅
            // setRankList(response.data.slice(0, 20));
            setRankList(response.data);
            setIsMonthly(true); // 추가
        } catch (error) {
            console.error('랭킹 리스트 불러오는 중 오류 발생:', error);
        }
    };

    const fetchRankListDay = async () => {
        try {
            const response = await axios.get('http://localhost/ranking/day-rank');
            console.log('답:', response.data); // 응답 로깅
            // setRankList(response.data.slice(0, 20));
            setRankList(response.data);
            setIsMonthly(false); // 추가
        } catch (error) {
            console.error('랭킹 리스트 불러오는 중 오류 발생:', error);
        }
    };

    return (
        <div className='App'>
            <div style={{marginTop: '150px'}}/>
            <div className='rankingCenter'>

                <h4>지난 달 명예의 전당</h4>
                <div className="ranking-flex-container">
                    <img className="ranking-king" src={king} alt="..."/>
                    {rankList.length > 0 && (
                        <>
                            <h2>{rankList[0].user_name} 님</h2>
                            {/*<h4>{rankList[0].total_score} 점</h4>*/}
                        </>
                    )}
                    <img className="ranking-king" src={king} alt="..."/>
                </div>


                {/* 월별 / 일별 선택 */}
                <div className="ranking-flex-container">
                    <div
                        className={`rankMonthC ${isMonthly ? '' : 'rankMonthN'}`}
                        onClick={fetchRankListMonth}
                    >
                        <p>월별</p>
                    </div>
                    <div
                        className={`rankDayC ${!isMonthly ? '' : 'rankDayN'}`}
                        onClick={fetchRankListDay}
                    >
                        <p>일별</p>
                    </div>
                </div>
                {/*선택에 따라 전송 받은 데이터로 랭킹 리스트 띄우기*/}
                {rankList.length > 0 && (
                    <div className='rankingContainer'>
                        <div className='ranking-scroll-container'>
                            {rankList.map((rank, index) => (
                                <div key={index}>
                                    <div className='ranking-flex-container2'>
                                        <div className='ranking-30L'>
                                            <h4 className={`ranking-aa ${index === 0 ? 'ranking1' : (index === 1 ? 'ranking2' : '')}`}>
                                                {index + 1} 등
                                            </h4>
                                        </div>
                                        <h4 className='ranking-40'>{rank.user_name} 님</h4>
                                        <h4 className='ranking-30R'>{rank.total_score} 점</h4>
                                    </div>
                                    {index < rankList.length - 1 && <div className="ranking-grayline"/>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}