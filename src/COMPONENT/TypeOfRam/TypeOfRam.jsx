/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-alert */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import s from "./TypeOfRam.module.css";
import TypeOfRamItem from "./TypeOfRamItem";
import ModalTypeOfRamContainer from "../Common/ModalWindows/ModalTypeOfRam/ModalTypeOfRamContainer";

const TypeOfRam = (props) => {
  const [typeSubmit, setTypeSubmit] = useState(false);
  const [header, setHeader] = useState("Добавляем:");

  const clickAdd = () => {
    setTypeSubmit(false);
    setHeader("Добавляем:");
    props.createModal(true);
  };

  const clickEdit = () => {
    setTypeSubmit(true);
    setHeader("Редактируем:");
    props.createModal(false);
  };

  let errorMessage;
  if (parseInt(props.errorCode, 10) === 10) {
    props.setErrorCode(0);
    errorMessage = alert("Уже есть !");
  }

  return (
    <div className={s.typeRamWrapper}>
      <div className={s.typeRamLabel}>Тип оперативной памяти</div>
      <div className={s.typeRamContent}>
        <div className={s.buttonArea}>
          <button type="button" onClick={clickAdd}>
            Добавить
          </button>
          <button
            type="button"
            onClick={() => props.prevPage()}
            disabled={typeof props.pagination.prev !== "undefined"}
          >
            Предыдущая
          </button>
          {props.pagination.current + 1}
          из
          {props.pagination.numPages}
          <button
            type="button"
            onClick={() => props.nextPage()}
            disabled={typeof props.pagination.next !== "undefined"}
          >
            Следующая
          </button>
        </div>
        <div disabled={props.isLoading}>
          <table className={s.table2}>
            <tbody>
              <tr>
                <th>Наименование</th>
                <th>Действия</th>
              </tr>
              {props.typeOfRam.map((tr) => (
                <TypeOfRamItem
                  {...props}
                  key={tr.id_typeRam}
                  clickEdit={clickEdit}
                  typeOfRam={tr.typeOfRam}
                  id={tr.id_typeRam}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        {errorMessage}
        {props.typeOfRamVisibility ? (
          <ModalTypeOfRamContainer type={typeSubmit} header={header} />
        ) : null}
      </div>
    </div>
  );
};

export default TypeOfRam;
