/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import s from "../Common/Css/sp.module.css";
import ModalFormFactorContainer from "../Common/ModalWindows/ModalFormFactor/ModalFormFactorContainer";
import FormFactorItem from "./FormFactorItem";

const FormFactor = (props) => {
  const [typeSubmit, setTypeSubmit] = useState(false);
  const [header, setHeader] = useState("");

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
    <div className={s.SpWrapper}>
      <div className={s.spLabel}>Форм факторы корпусов и материнских плат</div>
      <div className={s.spContent}>
        <div className={s.buttonArea}>
          <button type="button" onClick={clickAdd}>
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
        <div disabled={props.isLoading}>
          <table className={s.table2}>
            <tbody>
              <tr>
                <th>Наименование</th>
                <th>Действия</th>
              </tr>
              {props.formFactor.map((ff) => (
                <FormFactorItem
                  {...props}
                  key={ff.idFormFactor}
                  id={ff.idFormFactor}
                  formFactor={ff.formFactor}
                  clickEdit={clickEdit}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* разное */}
      <div>
        {/* {errorMessage} */}
        {props.formFactorVisibility ? (
          <ModalFormFactorContainer type={typeSubmit} header={header} />
        ) : null}
      </div>
    </div>
  );
};

export default FormFactor;
