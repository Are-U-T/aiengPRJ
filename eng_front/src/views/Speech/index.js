import React, {useEffect, useState} from 'react';
import Modal from "./Modal";
import ModalStart from './ModalStart';
import { useNavigate } from 'react-router-dom';
import './Speech.css';
import Navigation from "../Navigation";
import us from './images/us.png';
import uk from './images/uk.png';
import usno from './images/usno.jpg';
import ukno from './images/ukno.jpg';
import '../../App.css';
import left from './images/left.png';
import right from './images/right.png';
import LoadingPage from './LoadingPage';
import './Modal.css';
import  './ModalStart.css';
import mic from "../Speaking/images/mic.png";
import micno from "../Speaking/images/micno.png";
import subtitle from "../Speaking/images/subtitle.png";
import subtitleno from "../Speaking/images/subtitleno.png";
import time_finish from "../Speaking/images/time_finish.png";
import ModalStart2 from "../Speaking/ModalStart2";


function Speech() {
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedAirole, setSelectedAirole] = useState(null);
    const [selectedMyrole, setSelectedMyrole] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedLv, setselectedLv] = useState("중학교");
    const [availableRoles, setAvailableRoles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [loading, setLoading] = useState(false);

    const [startModalOpen, setStartModalOpen] = useState(false);

    const navigate = useNavigate();


    const [level, setLevel] = useState(1);

    const userNum = sessionStorage.getItem('userNum');


    const [startModalOpen2, setStartModalOpen2] = useState(false);
    useEffect(() => {
        setStartModalOpen2(true);
    }, []);

    const Close2 = () => {
        setStartModalOpen2(false);
    };



    useEffect(() => {
        setStartModalOpen(true);
    }, []);

    const Close = () => {
        setStartModalOpen(false);
    };



    const decreaseLevel = () => {
        setLevel(prevLevel => prevLevel > 1 ? prevLevel - 1 : 1);
    };

    const increaseLevel = () => {
        setLevel(prevLevel => prevLevel < 6 ? prevLevel + 1 : 6);
    };



    const handlePageChange = async(event) => {
        event.preventDefault();

        const data = {
            selectedItem,
            selectedAirole,
            selectedMyrole,
            selectedCountry,
            selectedLv,
            userNum
        };

        try {
            setLoading(true);
            const response = await fetch('http://localhost/talking/newTalkingRoom', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const responseData = await response.text();
                console.log('방 생성 successful:', responseData);

                // 생성된 방의 crid를 상태로 저장
                const crid = responseData;

                // Speaking 컴포넌트로 이동하면서 crid를 전달
                navigate('/speaking', {state: {crid}});
            } else {
                const errorMessage = await response.text();
                console.error('방 생성 failed:', errorMessage);
            }
        } catch (error) {
            console.error('방 생성 중 Error:', error);
        } finally {
            setLoading(false);
        }
    }

    const handleButtonClick =  () => {
        setIsModalOpen(true); // 모달 열기
    }

    const items = [
        "주말 데이트 계획 세우기",
        "일본 여행 2박 3일 일정 정하기",
        "서로 좋아하는 영화 추천 하기",
    ];

    useEffect(() => {
        switch (selectedItem) {
            case "주말 데이트 계획 세우기":
                setAvailableRoles(["여자친구", "남자친구"]);
                break;
            case "일본 여행 2박 3일 일정 정하기":
                setAvailableRoles(["엄마", "딸"]);
                break;
            case "서로 좋아하는 영화 추천 하기":
                setAvailableRoles(["남자", "여자"]);
                break;
            default:
                setAvailableRoles([]);
        }
    }, [selectedItem]);

    useEffect(() => {
        if (selectedMyrole) {
            const aiRole = availableRoles.find(role => role !== selectedMyrole);
            setSelectedAirole(aiRole);
        }
    }, [selectedMyrole, availableRoles]);

    const handleCountryClick = (country) => {
        setSelectedCountry(country);
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const handleAiroleClick = (role) => {
        setSelectedAirole(role);
    };

    const handleMyroleClick = (role) => {
        setSelectedMyrole(role);
    };

    return (
        <div className='App'>
            <Navigation />

            <ModalStart isOpen={startModalOpen} onClose={Close}>
                <div style={{ textAlign: 'center', maxWidth: '600px', margin: 'auto' }}>
                    <h3 className='gh'>사용방법 안내</h3>

                    <div className="modal-instructions">
                        <p><strong>Step 1:</strong> 주어진 3가지 상황 중 주제를 선택하세요.</p>
                        <p><strong>Step 2:</strong> 두 가지 선택지 중 하나를 선택해 역할을 정합니다.</p>
                        <p><strong>Step 3:</strong> 발음할 국가를 선택하세요 - 미국(US) 또는 영국(UK)</p>
                    </div>

                    <div className="foo">
                        <button onClick={() => setStartModalOpen(false)} className="qwe">확인</button>
                    </div>
                </div>
            </ModalStart>

            <h2 className="hi">Speech</h2>

            <div style={{ marginTop: '30px' }}></div>

            <div className="container">
                <div className="column">
                    <h3 className="styledpodo">STEP 1 상황 선택</h3>
                    <div className="scroll-container tx">
                        {items.map((item, index) => (
                            <div
                                key={index}
                                className={`item ${selectedItem === item ? 'selected' : ''}`}
                                onClick={() => handleItemClick(item)}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="column">
                    <h3 className="styledpodo">STEP 2 나의 역할</h3>
                    <div className="scroll-container tx">
                        {availableRoles.map((role, index) => (
                            <div
                                key={index}
                                className={`item ${selectedMyrole === role ? 'selected' : ''}`}
                                onClick={() => handleMyroleClick(role)}
                            >
                                {role}
                            </div>
                        ))}
                    </div>
                </div>


                <div className="column">
                    <h3 className="styledpodo">STEP 3 발음 선택</h3>
                    <div className="scroll-container">
                        <div className={`item ${selectedCountry === '미국' ? 'coselected' : ''}`} onClick={() => handleCountryClick('미국')}>
                            <div className="flag-container">
                                <img src={selectedCountry === '미국' ? us : usno} alt="미국 flag"/>
                            </div>
                        </div>
                        <div className={`item ${selectedCountry === '영국' ? 'coselected' : ''}`} onClick={() => handleCountryClick('영국')}>
                            <div className="flag-container">
                                <img src={selectedCountry === '영국' ? uk : ukno} alt="영국 flag"/>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="speachbutton-container">
                    {selectedItem && selectedAirole && selectedMyrole && selectedCountry && (
                        <button className="speachbutton" onClick={handleButtonClick}>
                            시작
                        </button>
                    )}
                </div>




                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <div style={{ textAlign: 'center', maxWidth: '500px', margin: 'auto' }}>
                        <h3 style={{ color: 'darkblue', fontWeight: 'bold', fontSize: '30px', margin: '20px 0' }}>선택 결과</h3>

                        <div style={{ margin: '20px 0', padding: '10px', border: '1px solid #ccc', borderRadius: '10px' }}>
                            <strong>선택한 상황</strong> <p style={{ fontSize: '18px', margin: '10px 0' }}>{selectedItem}</p>
                            <strong>AI의 역할</strong>  <p style={{ fontSize: '18px', margin: '10px 0' }}>{selectedAirole}</p>
                            <strong>나의 역할</strong> <p style={{ fontSize: '18px', margin: '10px 0' }}>{selectedMyrole}</p>
                            <strong>선택한 발음</strong> <p style={{ fontSize: '18px', margin: '10px 0' }}> {selectedCountry === '미국' ? '미국식' : '영국식'}</p>
                        </div>



                        <div className="difficulty-selector">
                            <h5>난이도 조절 선택하기</h5>
                            <div className="controls">
                                <img src={left} alt='레벨 다운' onClick={decreaseLevel} />
                                <span>레벨 {level}</span>
                                <img src={right} alt='레벨 업' onClick={increaseLevel} />
                            </div>
                        </div>



                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                            <button
                                onClick={(event) => {
                                    setIsModalOpen(false);
                                    handlePageChange(event);
                                }}
                                value={`Si: ${selectedItem}, AI: ${selectedAirole}, ME: ${selectedMyrole}, Country: ${selectedCountry}`}
                                className="custom-button"
                                style={{ marginRight: '10px' }}
                            >
                                확인
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="custom-button"
                            >
                                닫기
                            </button>
                        </div>
                    </div>
                </Modal>


                {loading && (
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 9000,
                        }}
                    >
                        <LoadingPage />
                    </div>
                )}



            </div>
        </div>
    );
}

export default Speech;