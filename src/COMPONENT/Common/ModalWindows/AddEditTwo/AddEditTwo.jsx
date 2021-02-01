/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { PropTypes } from "prop-types";
import ss from "./AddEditTwo.module.css";

const AddEditTwo = (props) => {
  const { onClose, isOpen, header, children } = props;

  const close = (e) => {
    e.preventDefault();
    if (onClose) {
      onClose();
    }
  };

  if (isOpen === false) return null;

  return (
    <div>
      <div className={ss.modal}>
        <div className={ss.modalDialog}>
          <div className={ss.modalContent}>
            <div className={ss.modalHeader}>
              <h3 className={ss.modalTitke}>{header}</h3>
              <p className={ss.close} onClick={(e) => close(e)}>
                X
              </p>
            </div>
            <div className={ss.modalBody}>{children}</div>
          </div>
        </div>
      </div>
      <div className={ss.bg} onClick={(e) => close(e)} />
    </div>
  );
};

AddEditTwo.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  header: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default AddEditTwo;
