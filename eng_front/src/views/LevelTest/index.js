import React, { useState } from 'react';
import Navigation from "../Navigation";
import Modal from "./Modal";
import LevelInfo from "./LevelInfo";
import SecondModal from "./SecondModal";
import Navigation2 from "../Navigation2";



function LevelTest() {
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [modalStage, setModalStage] = useState(1);
    const [showSecondModal, setShowSecondModal] = useState(false);

    // 첫 번째 모달창에서 확인 버튼 클릭 처리
    const handleFirstModalConfirm = () => {
        setShowSecondModal(true); // 두 번째 모달창 표시
        // 필요한 경우 다른 로직 추가
    };

    return (
        <>
            <Navigation2/>
            <h2 style={{ textAlign: 'center', margin: '20px 0' }}>영어회화 레벨 테스트</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                {[1, 2, 3].map(level => (
                    <button
                        key={level}
                        style={{
                            padding: '10px 20px',
                            fontSize: '18px',
                            cursor: 'pointer',
                            border: 'none',
                            borderRadius: '5px',
                            backgroundColor: '#4A90E2',
                            color: 'white'
                        }}
                        onClick={() => setSelectedLevel(level)}
                    >
                        레벨 {level}
                    </button>
                ))}
            </div>

            <Modal isOpen={selectedLevel != null} onClose={() => setSelectedLevel(null)}>
                <h3>레벨 {selectedLevel} 정보</h3>
                <LevelInfo level={selectedLevel} />
                <button onClick={handleFirstModalConfirm}>확인</button>
            </Modal>

            <SecondModal isOpen={showSecondModal} onClose={() => setShowSecondModal(false)} />
        </>
    );
}

export default LevelTest;
