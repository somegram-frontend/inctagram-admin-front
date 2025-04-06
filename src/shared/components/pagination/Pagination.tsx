import { ComponentRef, forwardRef } from "react";
import { Select, Typography } from "@honor-ui/inctagram-ui-kit";
import { ButtonArrow } from "@/shared/components/pagination/buttonArrow";
import { MainPaginationButtons } from "@/shared/components/pagination/mainPaginationButtons";
import Arrow from "../icons/Arrow";
import { usePagination } from "@/shared/hooks/usePagination";
import s from "./Pagination.module.scss";
import clsx from "clsx";

export type SearchParams = {
  pageSize: number;
  pageNumber: number;
};
export type PaginationOption = {
  label: string;
  value: string;
};
export type PaginationProps = {
  siblingCount?: number;
  totalCount: number;
  searchParams: SearchParams;
  setNewParams: (newParams: SearchParams) => void;
  selectBlock?: boolean;
  className?: string;
};

const Pagination = forwardRef<ComponentRef<"div">, PaginationProps>(
  (
    {
      siblingCount,
      totalCount,
      searchParams,
      setNewParams,
      selectBlock = true,
      className = "",
    },
    ref,
  ) => {
    const {
      currentPage,
      isFirstPage,
      isLastPage,
      itemsPerPage,
      itemsPerPageChangeHandler,
      onCurrentPageChange,
      onNextPage,
      onPreviousPage,
      options,
      paginationRange,
    } = usePagination({ siblingCount, totalCount, searchParams, setNewParams });

    return (
      <div className={clsx(s.container, className)} ref={ref}>
        <ButtonArrow disabled={isFirstPage} onClick={onPreviousPage}>
          <Arrow style={{ transform: "rotate(180deg)" }} />
        </ButtonArrow>
        <MainPaginationButtons
          currentPage={currentPage}
          onCurrentPageChange={onCurrentPageChange}
          paginationRange={paginationRange}
        />
        <ButtonArrow disabled={isLastPage} onClick={onNextPage}>
          <Arrow />
        </ButtonArrow>
        {selectBlock && (
          <div className={s.selectBlock}>
            <Typography variant={"regular_text14"}>{"show"}&nbsp;</Typography>
            <Select
              onValueChange={itemsPerPageChangeHandler}
              options={options}
              small
              value={String(itemsPerPage)}
            />
            <Typography variant={"regular_text14"}>{"onPage"}</Typography>
          </div>
        )}
      </div>
    );
  },
);

Pagination.displayName = "Pagination";

export default Pagination;
