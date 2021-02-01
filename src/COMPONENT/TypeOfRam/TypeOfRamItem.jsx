/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from "react";
import s from "./TypeOfRam.module.css";

const TypeOfRamItem = (props) => {
  const setCurrent = () => {
    const current = {
      id_typeRam: props.id,
      typeOfRam: props.typeOfRam,
    };
    props.setCurrentTypeOfRam(current);
  };
  return (
    <tr
      onClick={setCurrent}
      className={
        props.currentType.id_typeRam === props.id ? s.selectedType : undefined
      }
    >
      <td>{props.typeOfRam}</td>
      <td className={s.but}>
        <button
          type="button"
          onClick={() => props.clickEdit()}
          disabled={props.currentType.id_typeRam === props.id}
        >
          Редактировать
        </button>
        <button
          type="button"
          onClick={() => props.delete()}
          disabled={props.currentType.id_typeRam === props.id}
        >
          Удалить
        </button>
      </td>
    </tr>
  );
};

export default TypeOfRamItem;
