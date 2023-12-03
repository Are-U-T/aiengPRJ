import React from 'react';
import './ModalChange.css'; // 추가된 CSS 파일 임포트
import '../../../App.css';

function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="modal-backdropllxn App">
            <div className="modal-stylellxn">
                {children}
            </div>
        </div>
    );
}

export default Modal;
