import React from 'react';
import './ModalStart2.css'; // 추가된 CSS 파일 임포트
import '../../App.css';

function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="mbs App">
            <div className="mty">
                {children}
            </div>
        </div>
    );
}

export default Modal;
