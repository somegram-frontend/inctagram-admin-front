import { ComponentRef, forwardRef } from "react";
import { Dots } from "@/shared/components/pagination/dots";
import { PageButton } from "@/shared/components/pagination/pageButton";
import { PaginationRange } from "@/shared/hooks/usePagination";

type Props = {
  currentPage: number;
  onCurrentPageChange: (page: number) => void;
  paginationRange: PaginationRange;
};

export const MainPaginationButtons = forwardRef<
  ComponentRef<"button"> & ComponentRef<"span">,
  Props
>((props, ref) => {
  const { currentPage, onCurrentPageChange, paginationRange } = props;
  const paginationButtons = paginationRange?.map((page, index) => {
    if (typeof page === "string") {
      return <Dots key={index} ref={ref} />;
    }

    return (
      <PageButton
        isSelected={currentPage === page}
        key={index}
        onClick={() => onCurrentPageChange(page)}
        page={page}
        ref={ref}
      />
    );
  });

  return <>{paginationButtons}</>;
});

MainPaginationButtons.displayName = "MainPaginationButtons";
