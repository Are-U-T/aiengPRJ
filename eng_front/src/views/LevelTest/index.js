import React, { useState } from 'react';
import Navigation from "../Navigation";

// 모달 컴포넌트
function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }}>
            <div style={{
                background: '#fff',
                padding: 20,
                borderRadius: 10,
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                width: '60%', // 모달창의 가로 너비를 화면의 60%로 설정
                height: '90%', // 모달창의 세로 높이를 화면의 90%로 설정
                maxWidth: '800px', // 최대 가로 너비 제한
                maxHeight: '95vh', // 최대 세로 높이를 뷰포트 높이의 95%로 설정
                overflow: 'auto', // 내용이 넘칠 경우 스크롤 가능하도록 설정
                position: 'relative' // 상대적 위치 설정
            }}>
                {children}
                <button onClick={onClose} style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 10
                }}>닫기</button>
            </div>
        </div>

    );
}

function LevelInfo({ level }) {
    switch (level) {
        case 1:
            return <p>레벨 1에 대한 설명과 정보입니다.</p>;
        case 2:
            return <p>레벨 2에 대한 설명과 정보입니다.</p>;
        case 3:
            return <p>레벨 3에 대한 설명과 정보입니다.</p>;
        default:
            return null;
    }
}

// 레벨 테스트 페이지 컴포넌트
function LevelTest() {
    const [selectedLevel, setSelectedLevel] = useState(null);

    return (
        <>
            <Navigation/>
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
            </Modal>
        </>
    );
}

export default LevelTest;
