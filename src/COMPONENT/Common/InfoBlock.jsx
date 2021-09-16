import React from "react";
import { PropTypes } from "prop-types";
import { Box } from "@material-ui/core";

const InfoBlock = (props) => {
  const mapsValue = new Map();

  mapsValue.set("vendor", "Производитель");
  mapsValue.set("full", "Полное наименование");
  mapsValue.set("url", "Сайт");
  mapsValue.set("model", "Модель");
  mapsValue.set("socketCpu", "Разъем процессора");
  mapsValue.set("intGraph", "Встроенное видео");
  mapsValue.set("socketRam", "Разъем RAM");
  mapsValue.set("quantitySocketRam", "Количество слотов RAM");
  mapsValue.set("socketGraph", "Разъем видео карты");
  mapsValue.set("quantityPCI", "Кол-во слотов PCI");
  mapsValue.set("quantityPCIE", "Кол-во слотов PCIE");
  mapsValue.set("quantityIDE", "Кол-во разъемов IDE");
  mapsValue.set("quantitySATA", "Кол-во разъемов SATA");
  mapsValue.set("formFactor", "Форм-фактор");
  mapsValue.set("intLAN", "Встроенный сетевой адаптер");
  mapsValue.set("intSound", "Встроенная звуковая карта");
  mapsValue.set("volume", "Объем");
  mapsValue.set("socket", "Разъем");
  mapsValue.set("formFactorSD", "Форм-фактор SD");
  mapsValue.set("create", "Создано");

  const { current } = props;

  const createDate = new Date(current.create);

  const curr = {
    ...current,
    create: `${createDate.getDate()}-${
      createDate.getMonth() + 1
    }-${createDate.getFullYear()} ${createDate.getHours()}:${createDate.getMinutes()}`,
  };
  delete curr.id;

  const convertBool = (data) => {
    if (data) return "Есть";
    return "Нет";
  };

  return (
    <>
      {Object.entries(curr)
        .map(([key, value]) => (
          <Box display="flex" key={mapsValue.get(key)}>
            <Box
              flexGrow={1}
              textOverflow="ellipsis"
              overflow="hidden"
              borderBottom={1}
            >
              {mapsValue.get(key)}
            </Box>
            <Box
              textOverflow="ellipsis"
              overflow="hidden"
              borderBottom={1}
              borderColor="grey"
            >
              {typeof value === "boolean" ? convertBool(value) : value}
            </Box>
          </Box>
        ))
        .sort()}
    </>
  );
};

InfoBlock.propTypes = {
  current: PropTypes.shape({
    id: PropTypes.number,
    vendor: PropTypes.string,
    model: PropTypes.string,
    socketCpu: PropTypes.string,
    intGraph: PropTypes.bool,
    socketRam: PropTypes.string,
    quantitySocketRam: PropTypes.number,
    socketGraph: PropTypes.string,
    quantityPCI: PropTypes.number,
    quantityPCIE: PropTypes.number,
    quantityIDE: PropTypes.number,
    quantitySATA: PropTypes.number,
    formFactor: PropTypes.string,
    intLAN: PropTypes.bool,
    intSound: PropTypes.bool,
    create: PropTypes.string,
  }).isRequired,
};

export default InfoBlock;
