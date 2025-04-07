import s from "./Page.module.scss";
import { ReactNode } from "react";
import clsx from "clsx";

type Props = {
  className?: string;
  children?: ReactNode;
};
export const Page = ({ children, className = "" }: Props) => {
  return (
    <section className={clsx(s.containerPage, className)}>{children}</section>
  );
};
