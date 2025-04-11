import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  initialPageNumber?: number;
  initialPageSize?: number;
};

export const usePaginationParams = ({
  initialPageNumber,
  initialPageSize,
}: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const pageSize = Number(searchParams.get("pageSize")) || initialPageSize || 8;
  const pageNumber =
    Number(searchParams.get("pageNumber")) || initialPageNumber || 1;

  const setNewParams = (params: { pageSize: number; pageNumber: number }) => {
    const newParams = new URLSearchParams(searchParams.toString());

    newParams.set("pageSize", String(params.pageSize));
    newParams.set("pageNumber", String(params.pageNumber));

    if (params.pageSize === 8) newParams.delete("pageSize");
    if (params.pageNumber === 1) newParams.delete("pageNumber");

    router.push(`?${newParams.toString()}`);
  };

  return {
    pageSize,
    pageNumber,
    setNewParams,
  };
};
