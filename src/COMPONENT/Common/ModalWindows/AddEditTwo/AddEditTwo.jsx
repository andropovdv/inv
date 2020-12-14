import React from 'react';
import ss from './AddEditTwo.module.css';

const AddEditTwo = (props) => {

    const close = (e) => {
        e.preventDefault();
        if (props.onClose) {
            props.onClose();
        }
    }

    if (props.isOpen === false) return null;

    return (
        <div>
            <div className={ss.bg} onClick={(e) => close(e)} />
            <div className={ss.modal}>
                <div className={ss.modalDialog}>
                    <div className={ss.modalContent}>
                        <div className={ss.modalHeader}>
                            <h3 className={ss.modalTitke}>{props.header}</h3>
                            <p className={ss.close} onClick={(e) => close(e)}>X</p>
                        </div>
                        <div className={ss.modalBody}>
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
            <div className={ss.bg} onClick={(e) => close(e)} />
        </div>
    )
}

export default AddEditTwo;
