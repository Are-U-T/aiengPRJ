import React, {useEffect, useState} from 'react';
import Navigation from "../Navigation";
import Modal from "./Modal";
import { useNavigate } from 'react-router-dom';
import './Speech.css';
import us from './images/us.png';
import uk from './images/uk.png';
import usno from './images/usno.jpg';
import ukno from './images/ukno.jpg'
// import check from './images/check.png';


function Speech() {
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedAirole, setSelectedAirole] = useState(null);
    const [selectedMyrole, setSelectedMyrole] = useState(null);

    const [selectedCountry, setSelectedCountry] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [availableRoles, setAvailableRoles] = useState([]);

    const navigate = useNavigate();
    const handlePageChange = () => {
        navigate('/speaking');
    };

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

    const handleMyroleClick = (role) => {
        setSelectedMyrole(role);
    };

    const handleButtonClick = () => {
        console.log(`Button clicked for item: ${selectedItem}, ME : ${selectedMyrole}, AI : ${selectedAirole}, Country: ${selectedCountry}`);
        setIsModalOpen(true);

    };


    return (
        <>
            <Navigation />
            <h2 className="hi">Speech</h2>

            <div style={{ marginTop: '30px' }}></div>

            <div className="container">
                <div className="column">
                    <h3 className="styledpodo">STEP 1 상황 선택</h3>
                    <div className="scroll-container">
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
                    <div className="scroll-container">
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


                {/*<div className="column">*/}
                {/*    <h3 className="styledpodo">STEP 3 발음 선택</h3>*/}
                {/*    <div className="scroll-container">*/}
                {/*        <div className={`item ${selectedCountry === '미국' ? 'coselected' : ''}`} onClick={() => handleCountryClick('미국')}>*/}
                {/*            <div className="flag-container">*/}
                {/*                <img src={us} alt="미국 flag" style={{}}/>*/}
                {/*                {selectedCountry === '미국' && <img src={check} alt="미국" className="check-mark"/>}*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <div className={`item ${selectedCountry === '영국' ? 'coselected' : ''}`} onClick={() => handleCountryClick('영국')}>*/}
                {/*            <div className="flag-container">*/}
                {/*                <img src={uk} alt="영국 flag"  />*/}
                {/*                {selectedCountry === '영국' && <img src={check} alt="영국" className="check-mark"/>}*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}


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
                        <button className="speachbutton" onClick={handleButtonClick} value={`Si: ${selectedItem}, AI: ${selectedAirole}, ME: ${selectedMyrole}, Country: ${selectedCountry}`}>
                            시작
                        </button>
                    )}
                </div>




                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <div style={{ textAlign: 'center', maxWidth: '500px', margin: 'auto' }}>
                        <h3 style={{ color: 'darkblue', fontWeight: 'bold', fontSize: '30px', margin: '40px 0' }}>선택 결과</h3>

                        <div style={{ margin: '20px 0', padding: '10px', border: '1px solid #ccc', borderRadius: '10px' }}>
                            <strong>선택한 상황</strong> <p style={{ fontSize: '18px', margin: '10px 0' }}>{selectedItem}</p>
                            <strong>AI의 역할</strong>  <p style={{ fontSize: '18px', margin: '10px 0' }}>{selectedAirole}</p>
                            <strong>나의 역할</strong> <p style={{ fontSize: '18px', margin: '10px 0' }}>{selectedMyrole}</p>
                            <strong>선택한 발음</strong> <p style={{ fontSize: '18px', margin: '10px 0' }}> {selectedCountry === '미국' ? '미국식' : '영국식'}</p>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                            <button
                                onClick={() => {
                                    setIsModalOpen(false);
                                    handlePageChange();
                                }}
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



            </div>
        </>
    );
}

export default Speech;
