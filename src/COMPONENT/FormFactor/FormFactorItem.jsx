/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from "react";
import s from "../Common/Css/sp.module.css";

const FormFactorItem = (props) => {
  const setCurrent = () => {
    const current = {
      idFormFactor: props.id,
      formFactor: props.formFactor,
    };
    props.setCurrentFormFactor(current);
  };

  return (
    <tr
      onClick={setCurrent}
      className={
        props.currentType.idFormFactor === props.id ? s.selectedRow : undefined
      }
    >
      <td>{props.formFactor}</td>
      <td className={s.but}>
        <button
          type="button"
          onClick={() => props.clickEdit()}
          disabled={props.currentType.idFormFactor !== props.id}
        >
          Редактировать
        </button>
        <button
          type="button"
          onClick={() => props.delete()}
          disabled={props.currentType.idFormFactor === props.id}
        >
          Удалить
        </button>
      </td>
    </tr>
  );
};

export default FormFactorItem;
