import React from 'react';
import s from './Vendors.module.css'


class VendorModal extends React.Component {
    render() {
        if (this.props.isOpen === false) return null;

        return (
            <div>
                <div className={s.modal}>{this.props.children}</div>
                <div className={s.bg} onClick={(e) => this.close(e)} />
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