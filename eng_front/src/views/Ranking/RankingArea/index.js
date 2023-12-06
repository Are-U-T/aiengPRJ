import React, {useState, useEffect} from 'react';
import './RankingArea.css';
import '../../../App.css'
import king from './images/kingImg.webp';
import axios from "axios";
import Footer from './Footer/index';
export default function RankingArea() {

    const [rankList, setRankList] = useState([]);
    const [rankList2, setRankList2] = useState([]);
    const [isMonthly, setIsMonthly] = useState(true);
    const [showFriendsOnly, setShowFriendsOnly] = useState(true);
    const userNum = sessionStorage.getItem('userNum');

    useEffect(() => {
        if (showFriendsOnly) {
            fetchFriendRankListMonth();
        } else {
            fetchRankListMonth();
        }
    }, [showFriendsOnly]);

    const fetchRankListMonth = async () => {
        try {
            const response = await axios.get('http://localhost/ranking/monthly-rank');
            console.log('월별 답:', response.data); // 응답 로깅
            // setRankList(response.data.slice(0, 20));
            setRankList(response.data);
            setRankList2(response.data);
            setIsMonthly(true); // 추가
        } catch (error) {
            console.error('랭킹 리스트 불러오는 중 오류 발생:', error);
        }
    };

    const fetchRankListDay = async () => {
        try {
            const response = await axios.get('http://localhost/ranking/day-rank');
            console.log('일별 답:', response.data); // 응답 로깅
            // setRankList(response.data.slice(0, 20));
            setRankList(response.data);
            setIsMonthly(false); // 추가
        } catch (error) {
            console.error('랭킹 리스트 불러오는 중 오류 발생:', error);
        }
    };

    const fetchFriendRankListMonth = async () => {
        try {
            const response = await axios.get('http://localhost/ranking/friend-rank-month', {
                params: {
                    userId: userNum,
                }
            });
            console.log('친구 월별 답:', response.data); // 응답 로깅
            // setRankList(response.data.slice(0, 20));
            setRankList(response.data);
            setRankList2(response.data);
            setIsMonthly(true); // 추가
        } catch (error) {
            console.error('랭킹 리스트 불러오는 중 오류 발생:', error);
        }
    };

    const fetchFriendRankListDay = async () => {
        try {
            const response = await axios.get('http://localhost/ranking/friend-rank-month', {
                params: {
                    userId: userNum,
                }
            });
            console.log('친구 일별 답:', response.data); // 응답 로깅
            // setRankList(response.data.slice(0, 20));
            setRankList(response.data);
            setIsMonthly(false); // 추가
        } catch (error) {
            console.error('랭킹 리스트 불러오는 중 오류 발생:', error);
        }
    };

    const toggleShowFriendsOnly = () => {
        setShowFriendsOnly(!showFriendsOnly);
        console.log(showFriendsOnly);
    };

    return (
        <div className='App'>
            <div style={{marginTop: '150px'}}/>
            <div className='rankingCenter'>

                <h4>이번 달 명예의 전당</h4>
                <div className="ranking-flex-container">
                    <img className="ranking-king" src={king} alt="..."/>
                    {rankList2.length > 0 && (
                        <>
                            <h2>{rankList2[0].user_name} 님</h2>
                            {/*<h4>{rankList[0].total_score} 점</h4>*/}
                        </>
                    )}
                    <img className="ranking-king" src={king} alt="..."/>
                </div>


                {/* 월별 / 일별 선택 */}
                <div className="ranking-flex-container">
                    <div
                        className={`rankMonthC ${isMonthly ? '' : 'rankMonthN'}`}
                        onClick={showFriendsOnly ? fetchFriendRankListMonth :fetchRankListMonth }
                    >
                        <p>월별</p>
                    </div>
                    <div
                        className={`rankDayC ${!isMonthly ? '' : 'rankDayN'}`}
                        onClick={showFriendsOnly ?  fetchFriendRankListDay : fetchRankListDay}
                    >
                        <p>일별</p>
                    </div>
                    <div
                        className={`rankFriendsC ${showFriendsOnly ? '' : 'rankFriendsN'}`}
                        onClick={toggleShowFriendsOnly}
                    >
                        <p>친구만</p>
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