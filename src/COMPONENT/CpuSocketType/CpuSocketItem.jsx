/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import s from "./CpuSocketType.module.css";

const CpuSoketItem = (props) => {
  const selectSocketCpu = () => {
    const currentType = {
      id_typeSocketCpu: props.id,
      name_typeSocketCpu: props.name,
    };
    props.setCurrentSocketCpu(currentType);
  };

  return (
    <tr
      onClick={selectSocketCpu}
      className={
        props.currentType.id_typeSocketCpu === props.id
          ? s.selectedType
          : undefined
      }
    >
      <td>{props.name}</td>
      <td>
        <button
          type="button"
          onClick={() => props.openModalEdit()}
          disabled={props.currentType.id_typeSocketCpu !== props.id}
        >
          Редактировать
        </button>
      </td>
      <td>
        <button
          type="button"
          onClick={() => props.deleteTypeSocket()}
          disabled={props.currentType.id_typeSocketCpu !== props.id}
        >
          Удалить
        </button>
      </td>
    </tr>
  );
};

export default CpuSoketItem;
