/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { PropTypes } from "prop-types";
import s from "./ModalCpuSocket/ModalCpuSocket.module.css";

const Modal = (props) => {
  const { closeModal, header, children } = props;
  const close = (e) => {
    e.preventDefault();
    if (closeModal) {
      closeModal();
    }
  };

  return (
    <div>
      <div className={s.modal}>
        <div className={s.modalDialog}>
          <div className={s.modalContent}>
            <div className={s.modalHeader}>
              <h3 className={s.modalTitke}>{header}</h3>
              <p className={s.close} onClick={(e) => close(e)}>
                X
              </p>
            </div>
            <div className={s.modalBody}>{children}</div>
          </div>
        </div>
      </div>
      <div className={s.bg} onClick={(e) => close(e)} />
    </div>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
