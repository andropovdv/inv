import React from "react";
import s from "./Footer.module.css";
import TypeOfRamScroll from "../Common/Scroll/TypeOfRamScroll/TypeOfRamScrollContainer";
import TypeOfGraphSlotScroll from "../Common/Scroll/TypeOfGraphSlotScroll/TypeOfGraphSlotScrollContainer";
import FormFactorScroll from "../Common/Scroll/FormFactorScroll/FormFactorScrollContainer";

const Footer = () => {
  return (
    <div className={s.appWrapperFooter}>
      <h1>Footer</h1>
      <TypeOfRamScroll />
      <TypeOfGraphSlotScroll />
      <FormFactorScroll />
    </div>
  );
};

export default Footer;
