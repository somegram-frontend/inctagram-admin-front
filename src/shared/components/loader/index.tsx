import s from "./loader.module.scss";
import {HashLoader} from "react-spinners";
import React from "react";
import {LoaderSizeProps} from "react-spinners/helpers/props";


export const Loader  = ({size, color, ...rest}: LoaderSizeProps) => {
  return <div className={s.loader}><HashLoader size={size || 200} color={color || 'white'} {...rest}/></div>
}