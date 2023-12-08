import React, {useState, useEffect} from 'react';
import './RankingArea.css';
import '../../../App.css'
import king from './images/kingImg.webp';
import axios from "axios";
import Footer from './Footer/index';
import Modal from "../../Speech/Modal";
import loginImg from "../../Speech/images/loginImg.png";
import {useNavigate} from "react-router-dom";
export default function RankingArea() {

    const [rankList, setRankList] = useState([]);
    const [rankList2, setRankList2] = useState([]);
    const [isMonthly, setIsMonthly] = useState(false);
    const [isDaily, setIsDaily] = useState(false);
    const [isOverall, setIsOverall] = useState(false);
    const [showFriendsOnly, setShowFriendsOnly] = useState(false);
    const navigate = useNavigate();
    const userNum = sessionStorage.getItem('userNum');

    const [loginModalOpen, setLoginModalOpen] = useState(false);

    useEffect(() => {
        if (userNum == null) {
            // 모달 창 띄워서 로그인 하세요 하고 확인 누르면 로그인 창으로 보내기
            setLoginModalOpen(true);
        }
    }, [userNum]);

    const closeModalAndNavigate = () => {
        setLoginModalOpen(false);
        navigate('/login');
    };

    useEffect(() => {
        setIsOverall(true);
        fetchRankList();
    }, []);

    const fetchRankList = async () => {
        try {
            const response = await axios.get('http://localhost/ranking/all-rank');
            console.log('전체 답:', response.data); // 응답 로깅
            // setRankList(response.data.slice(0, 20));
            setRankList(response.data);
        } catch (error) {
            console.error('랭킹 리스트 불러오는 중 오류 발생:', error);
        }
    };

    const fetchRankListMonth = async () => {
        try {
            const response = await axios.get('http://localhost/ranking/monthly-rank');
            console.log('월별 답:', response.data); // 응답 로깅
            // setRankList(response.data.slice(0, 20));
            setRankList(response.data);
            setRankList2(response.data);
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
        } catch (error) {
            console.error('랭킹 리스트 불러오는 중 오류 발생:', error);
        }
    };

    const fetchFriendRankList = async () => {
        try {
            const response = await axios.get('http://localhost/ranking/friend-rank-all', {
                params: {
                    userId: userNum,
                }
            });
            console.log('친구 전체 답:', response.data); // 응답 로깅
            // setRankList(response.data.slice(0, 20));
            setRankList(response.data);
            setRankList2(response.data);
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
        } catch (error) {
            console.error('랭킹 리스트 불러오는 중 오류 발생:', error);
        }
    };

    const fetchFriendRankListDay = async () => {
        try {
            const response = await axios.get('http://localhost/ranking/friend-rank-day', {
                params: {
                    userId: userNum,
                }
            });
            console.log('친구 일별 답:', response.data); // 응답 로깅
            // setRankList(response.data.slice(0, 20));
            setRankList(response.data);
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


                {/* 전체 / 월별 / 일별 선택 */}
                <div className="ranking-flex-container">
                    <div
                        className={`rankMonthC ${isOverall ? '' : 'rankMonthN'}`}
                        onClick={() => {
                            (showFriendsOnly ? fetchRankList : fetchFriendRankList)();
                            setIsMonthly(false);
                            setIsDaily(false);
                            setIsOverall(true);
                        }}
                    >
                        <p>전체</p>
                    </div>
                    <div
                        className={`rankMonthC ${isMonthly ? '' : 'rankMonthN'}`}
                        onClick={() => {
                            (showFriendsOnly ? fetchRankListMonth : fetchFriendRankListMonth)();
                            setIsMonthly(true);
                            setIsDaily(false);
                            setIsOverall(false);
                        }}
                    >
                        <p>월별</p>
                    </div>
                    <div
                        className={`rankMonthC ${isDaily ? '' : 'rankMonthN'}`}
                        onClick={() => {
                            (showFriendsOnly ? fetchRankListDay : fetchFriendRankListDay)();
                            setIsMonthly(false);
                            setIsDaily(true);
                            setIsOverall(false);
                        }}
                    >
                        <p>일별</p>
                    </div>
                    <div
                        className='rankFriendsC'
                        // className={`rankFriendsC ${showFriendsOnly ? '' : 'rankFriendsN'}`}
                        onClick={toggleShowFriendsOnly}
                    >
                        <p>{showFriendsOnly ? '전체 유저' : '친구만'}</p>
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

            <Modal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)}>

                <div className="speechModalCenter">
                    <img src={loginImg} alt='로그인 이미지' className="speechLoginImg"/>
                    <h4>로그인 후 이용해 주세요</h4>
                    <button onClick={closeModalAndNavigate} className="modal-custom-button">
                        닫기
                    </button>
                </div>
            </Modal>

        </div>
    )
}