import { forwardRef } from "react";

import clsx from "clsx";

import s from "./PageButton.module.scss";

type Props = {
  isSelected: boolean;
  onClick: () => void;
  page: number;
};
export const PageButton = forwardRef<HTMLButtonElement, Props>(
  ({ isSelected, onClick, page }, ref) => {
    return (
      <button
        className={clsx(s.default, isSelected && s.selected)}
        onClick={onClick}
        ref={ref}
        type={"button"}
      >
        {page}
      </button>
    );
  },
);

PageButton.displayName = "PageButton";
