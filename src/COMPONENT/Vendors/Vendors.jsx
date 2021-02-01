/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import AddEditTwo from "../Common/ModalWindows/AddEditTwo/AddEditTwo";
import s from "./Vendors.module.css";

const Vendors = (props) => {
  let errorMessage;
  if (parseInt(props.errorCode, 10) === 10) {
    errorMessage = (
      <AddEditTwo onClose={props.closeModal} isOpen header="Информация:">
        <div className={s.errorMessage}>Already have</div>
      </AddEditTwo>
    );
  }
  return (
    <div className={s.vendorWrapper}>
      <div className={s.vendorLabel}>Производители:</div>
      <div className={s.vendorContent}>
        <div className={s.buttonArea}>
          <button type="button" onClick={() => props.openModalNew()}>
            Добавить производителя
          </button>
          <button
            type="button"
            onClick={() => props.prevPage()}
            disabled={typeof props.pagination.prev === "undefined"}
          >
            Предыдущая
          </button>
          {props.pagination.current + 1}
          из
          {props.pagination.numPages}
          <button
            type="button"
            onClick={() => props.nextPage()}
            disabled={typeof props.pagination.next === "undefined"}
          >
            Следующая
          </button>
        </div>
        <div>{errorMessage}</div>
        <div disabled={props.isLoading}>
          <table className={s.table2}>
            <tbody>
              <tr>
                <th>Наименование</th>
                <th>Полное наименование</th>
                <th />
                <th />
              </tr>
              {/* {props.vendors.map((v) => (
                <VendorItem
                  key={v.id_vendor}
                  {...props}
                  id_vendor={v.id_vendor}
                  name={v.name}
                  full_name={v.full_name}
                  url={v.url}
                />
              ))} */}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        {/* <VendorModal isOpen={props.isVisable} onClose={props.closeModal}>
          <VendorReduxForm
            {...props}
            onSubmit={props.typeModal ? props.updateVendor : props.addVendor}
          />
        </VendorModal> */}
      </div>
    </div>
  );
};

export default Vendors;
