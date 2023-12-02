import React from 'react';
import './ModalStart.css'; // 추가된 CSS 파일 임포트
import '../../App.css';

function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="modal-backdropll App">
            <div className="modal-stylell">
                {children}
            </div>
        </div>
    );
}

export default Modal;
