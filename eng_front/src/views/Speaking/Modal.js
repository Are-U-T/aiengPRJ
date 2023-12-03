import React from 'react';
import './Modal.css';
import '../../App.css';
function Modal({ isOpen, children }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay App">
            <div className="modal-content">
                {children}
            </div>
        </div>
    );
}
export default Modal;
