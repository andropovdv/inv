import React from 'react';
import s from './ModalCpuSocket/ModalCpuSocket.module.css'

const Modal = (props) => {

    const close = (e) => {
        e.preventDefault();
        if (props.closeModal) {
            props.closeModal();
        }
    }

    return (
        <div>
            <div className={s.modal}>
                <div className={s.modalDialog}>
                    <div className={s.modalContent}>
                        <div className={s.modalHeader}>
                            <h3 className={s.modalTitke}>{props.header}</h3>
                            <p className={s.close} onClick={(e) => close(e)}>X</p>
                        </div>
                        <div className={s.modalBody}>
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
            <div className={s.bg} onClick={(e) => close(e)} />
        </div>
    )
}

export default Modal;

