import { type ComponentPropsWithoutRef, forwardRef } from "react";

import clsx from "clsx";

import s from "./ButtonArrow.module.scss";

type Props = ComponentPropsWithoutRef<"button">;

export const ButtonArrow = forwardRef<HTMLButtonElement, Props>(
  ({ className, ...rest }, ref) => {
    return (
      <button
        className={clsx(s.arrow, className)}
        type={"button"}
        {...rest}
        ref={ref}
      />
    );
  },
);

ButtonArrow.displayName = "ButtonArrow";
