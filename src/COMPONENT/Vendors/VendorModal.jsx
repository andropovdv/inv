import React from 'react';
// import s from './Vendors.module.css'
import ss from './Modal.module.css'


class VendorModal extends React.Component {
    render() {
        if (this.props.isOpen === false) return null;

        return (
            // <div>
            //     <div className={s.modal}>{this.props.children}</div>
            //     <div className={s.bg} onClick={(e) => this.close(e)} />
            // </div>
            <div>
                <div className={ss.bg} onClick={(e) => this.close(e)} />
                <div className={ss.modal}>
                    <div className={ss.modalDialog}>
                        <div className={ss.modalContent}>
                            <div className={ss.modalHeader}>
                                <h3 className={ss.modalTitke}>Название</h3>
                                <p className={ss.close} onClick={(e) => this.close(e)}>X</p>
                            </div>
                            <div className={ss.modalBody}>
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={ss.bg} onClick={(e) => this.close(e)} />
            </div>

        );
    }

    close(e) {
        e.preventDefault();
        if (this.props.onClose) {
            this.props.onClose();
        }
    }
}

export default VendorModal;