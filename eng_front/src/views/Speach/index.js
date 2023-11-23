import React, { useState } from 'react';
import Navigation from "../Navigation";
import Modal from "./Modal";
import { useNavigate } from 'react-router-dom';
import './Speach.css';
import Navigation2 from "../Navigation2";
import Speaking from "../Speaking";


function Speach() {
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedAirole, setSelectedAirole] = useState(null);
    const [selectedMyrole, setSelectedMyrole] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가

    const navigate = useNavigate();
    const handlePageChange = () => {
        navigate('/speaking'); // 여기에 이동하고자 하는 경로를 입력
    };

    const items = [
        "아들의 진로고민을 들어주는 엄마 ",
        "남자친구와 여자친구가 크리스마스 계획 세우는 상황",
        "채무자가 사채업자에게 돈을 빌렸으며 이자가 원금의 5배인 상황 ",
        "병원에서 의사와 환자가 대화하는 상황",
        "선생님이 아이들에게 수업하는 상황",
        "오빠랑 싸우는 상황",
        "어머니와 쇼핑하는 상황",
        "아버지의 환갑 장치가 벌어지는 상황",
        "형과 싸우는 상황",
        "아들과 여행가는 상황"
    ];

    const airole = [
        "아버지",
        "아들",
        "남자친구",
        "여자친구",
        "사채업자",
        "채무자",
        "마트 직원",
        "경찰",
        "의사",
        "선생님",
        "어머니",
        "딸",
        "형",
        "오빠",
        "남동생",
        "여동생"
    ];


    const myrole = [
        "아버지",
        "아들",
        "남자친구",
        "여자친구",
        "사채업자",
        "마트 직원",
        "경찰",
        "의사",
        "선생님",
        "어머니",
        "딸",
        "형",
        "오빠",
        "남동생",
        "여동생"
    ];


    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const handleAiroleClick = (role) => {
        setSelectedAirole(role);
    };

    const handleMyroleClick = (role) => {
        setSelectedMyrole(role);
    };

    const handleButtonClick = () => {
        console.log(`Button clicked for item: ${selectedItem}, AI: ${selectedAirole} , ME : ${selectedMyrole}`);
        setIsModalOpen(true); // 모달 열기
    };


    return (
        <>
            <Navigation2 />
            <h2 className="hi" style={{ textAlign: 'center', margin: '30px 0' }}>Speach</h2>

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
                    <h3 className="styledpodo">STEP 2 AI 역할</h3>
                    <div className="scroll-container">
                        {airole.map((role, index) => (
                            <div
                                key={index}
                                className={`item ${selectedAirole === role ? 'selected' : ''}`}
                                onClick={() => handleAiroleClick(role)}
                            >
                                {role}
                            </div>
                        ))}
                    </div>
                </div>


                <div className="column">
                    <h3 className="styledpodo">STEP 3 나의 역할</h3>
                    <div className="scroll-container">
                        {myrole.map((role, index) => (
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
            </div>

            <div className="speachbutton-container">
                {selectedItem && selectedAirole && selectedMyrole && (
                    <button className="speachbutton" onClick={handleButtonClick}>
                        {selectedItem}
                        <br/>
                        AI: {selectedAirole}, ME: {selectedMyrole}
                        <br/>
                        START
                    </button>
                )}
                {/*<Speaking*/}
                {/*    selectedItem={selectedItem}*/}
                {/*    selectedAiRole={selectedAirole}*/}
                {/*    selectedMyRole={selectedMyrole}*/}
                {/*/>*/}
            </div>


            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div style={{ textAlign: 'center', maxWidth: '500px', margin: 'auto' }}>
                    <h3 style={{ color: 'red', fontWeight: 'bold', fontSize: '30px', margin: '40px 0' }}>유의사항</h3>

                    <ul style={{ listStyle: 'none', marginLeft: '100',marginTop : '20', textAlign: 'left'}}>
                        <li style={{ fontWeight: 'bold', fontSize: '20px', margin: '10px 0' }}>1. 공부에 열심히 임할 것을 약속합니다.</li>
                        <li style={{ fontWeight: 'bold', fontSize: '20px', margin: '10px 0' }}>2. 어려움에도 포기하지 않습니다.</li>
                        <li style={{ fontWeight: 'bold', fontSize: '20px', margin: '10px 0' }}>3. 매일 꾸준히 학습합니다.</li>
                        <li style={{ fontWeight: 'bold', fontSize: '20px', margin: '10px 0' }}>4. 긍정적인 태도를 유지합니다.</li>
                        <li style={{ fontWeight: 'bold', fontSize: '20px', margin: '10px 0' }}>5. 시간 관리에 신경 씁니다.</li>
                        <li style={{ fontWeight: 'bold', fontSize: '20px', margin: '10px 0' }}>6. 수업에 적극적으로 참여합니다.</li>
                        <li style={{ fontWeight: 'bold', fontSize: '20px', margin: '10px 0' }}>7. 궁금한 점은 적극적으로 질문합니다.</li>
                        <li style={{ fontWeight: 'bold', fontSize: '20px', margin: '10px 0' }}>8. 동료 학습자를 존중합니다.</li>
                        <li style={{ fontWeight: 'bold', fontSize: '20px', margin: '10px 0' }}>9. 건강한 생활 습관을 유지합니다.</li>
                        <li style={{ fontWeight: 'bold', fontSize: '20px', margin: '10px 0' }}>10. 목표를 세우고 이를 따릅니다.</li>
                    </ul>

                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                        <button
                            onClick={() => {
                                setIsModalOpen(false);
                                handlePageChange();
                            }}
                            style={{
                                padding: '12px 24px',
                                marginRight: '80px',
                                backgroundColor: 'lightblue',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '16px',
                            }}
                        >
                            확인
                        </button>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            style={{
                                padding: '12px 24px',
                                backgroundColor: 'lightcoral',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '16px'
                            }}
                        >
                            닫기
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default Speach;
