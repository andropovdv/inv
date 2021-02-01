/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import s from "./TypeOfGraphSlot.module.css";

const TypeOfGraphSlotItem = (props) => {
  const setCurrent = () => {
    const current = {
      idTypeOfGraphSlot: props.id,
      typeOfGraphSlot: props.typeOfGraph,
    };
    props.setCurrentTypeOfGraph(current);
  };

  return (
    <tr
      onClick={setCurrent}
      className={
        props.currentType.idTypeOfGraphSlot === props.id
          ? s.selectedType
          : undefined
      }
    >
      <td>{props.typeOfGraph}</td>
      <td className={s.but}>
        <button
          type="button"
          onClick={() => props.clickEdit()}
          disabled={props.currentType.idTypeOfGraphSlot !== props.id}
        >
          Редактировать
        </button>
        <button
          type="button"
          onClick={() => props.delete()}
          disabled={props.currentType.idTypeOfGraphSlot !== props.id}
        >
          Удалить
        </button>
      </td>
    </tr>
  );
};

export default TypeOfGraphSlotItem;
