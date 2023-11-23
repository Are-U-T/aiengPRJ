// Modal.js
import React from 'react';

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

export default Modal;
