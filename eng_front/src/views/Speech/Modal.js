// Modal.js
import React from 'react';
import './Modal.css'; // 추가된 CSS 파일 임포트

function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-style">
                {children}
            </div>
        </div>
    );
}

export default Modal;
