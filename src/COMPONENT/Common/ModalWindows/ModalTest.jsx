import React from 'react';
import s from './Modal.module.css'

const ModalTest = (props) => {

    const close = (e) => {
        e.preventDefault();
        if (props.closeModal) {
            props.closeModal();
        }
    }

    return (
        <div>
            <div className={s.modal}>
                <div className={s.modalContent}>
                    <div className={s.modalHeader}>
                        {props.header}
                        <span className={s.close} onClick={(e) => close(e)}>X</span>
                    </div>
                    <div className={s.modalBody}>
                        {props.children}
                    </div>
                    <div className={s.modalFooter}>
                        Error
                    </div>
                </div>
            </div>
            <div className={s.bg} onClick={(e) => close(e)} />
        </div>
    )
}

export default ModalTest;

