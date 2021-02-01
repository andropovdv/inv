/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import ModalTypeOfGraphSlotContainet from "../Common/ModalWindows/ModalTypeOfGraphSlot/ModalTypeOfGraphSlotContainet";
import s from "./TypeOfGraphSlot.module.css";
import TypeOfGraphSlotItem from "./TypeOfGraphSlotItem";

const TypeOfGraphSlot = (props) => {
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

  return (
    <div className={s.typeGraphWrapper}>
      <div className={s.typeGraphLabel}>Тип графического разъема:</div>
      <div className={s.typeGraphContent}>
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
              {props.typeOfGraphSlot.map((tg) => (
                <TypeOfGraphSlotItem
                  {...props}
                  key={tg.typeOfGraphSlot}
                  id={tg.idTypeOfGraphSlot}
                  typeOfGraph={tg.typeOfGraphSlot}
                  clickEdit={clickEdit}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Разное */}
      <div>
        {props.typeOfGraphSlotVisibility ? (
          <ModalTypeOfGraphSlotContainet type={typeSubmit} header={header} />
        ) : null}
      </div>
    </div>
  );
};

export default TypeOfGraphSlot;
