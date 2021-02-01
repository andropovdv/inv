/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from "react";
import s from "./Cpus.module.css";

const CpuItem = (props) => {
  const selectCpu = () => {
    const currentCpu = {
      id_cpu: props.id_cpu,
      vendor: props.vendor,
      model: props.model,
      name_typeSocketCpu: props.socketCpu,
    };
    props.setCurrentCpu(currentCpu);
  };

  return (
    <tr
      onClick={selectCpu}
      className={
        props.currentCpu.id_cpu === props.id_cpu ? s.selectedCpu : undefined
      }
    >
      <td>{props.vendor}</td>
      <td>{props.model}</td>
      <td>
        <button
          type="button"
          onClick={() => {
            props.openModal();
          }}
          disabled={props.currentCpu.id_cpu !== props.id_cpu}
        >
          Редактировать
        </button>
      </td>
      <td>
        <button
          type="button"
          onClick={() => {
            props.deleteCpu(props.currentCpu.id_cpu);
          }}
          disabled={props.currentCpu.id_cpu !== props.id_cpu}
        >
          Удалить
        </button>
      </td>
    </tr>
  );
};

export default CpuItem;
