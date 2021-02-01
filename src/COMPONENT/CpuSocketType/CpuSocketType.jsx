/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from "react";
import s from "./CpuSocketType.module.css";
import CpuSoketItem from "./CpuSocketItem";
import AddEditTwo from "../Common/ModalWindows/AddEditTwo/AddEditTwo";
import CpuSocketReduxForm from "./CpuSocketForm";
import ModalCpuSocketContainer from "../Common/ModalWindows/ModalCpuSocket/ModalCpuSocketContainer";

const CpuSocketType = (props) => {
  let errorMessage;
  if (parseInt(props.errorCode, 10) === 10) {
    errorMessage = (
      <AddEditTwo onClose={props.onClose} isOpen header="Информация:">
        <div className={s.errorMessage}>already have</div>
      </AddEditTwo>
    );
  }
  return (
    <div className={s.socketWrapper}>
      <div className={s.socketLabel}>Разъемы процессоров:</div>
      <div className={s.socketContent}>
        <div className={s.buttonArea}>
          <button type="button" onClick={() => props.openModalNew()}>
            Добавить
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
                <th> </th>
                <th> </th>
              </tr>
              {props.cpuSockets.map((ts) => (
                <CpuSoketItem
                  key={ts.id_typeSocketCpu}
                  {...props}
                  id={ts.id_typeSocketCpu}
                  name={ts.name_typeSocketCpu}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <AddEditTwo
            isOpen={props.isVisable}
            onClose={props.onClose}
            header={props.header}
          >
            <button type="button" onClick={() => props.openModalTest()}>
              Добавить
            </button>
            <div>
              <CpuSocketReduxForm
                onSubmit={
                  props.typeModal ? props.updateTypeSocket : props.addTypeSocket
                }
              />
            </div>
          </AddEditTwo>
          {props.cpuSocketVisibility ? <ModalCpuSocketContainer /> : null}
        </div>
      </div>
    </div>
  );
};

export default CpuSocketType;
