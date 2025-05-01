"use client";

import { useQuery } from "@tanstack/react-query";
import { SortDirection } from "@/shared/configs/gql/graphql";
import { fetchPayments } from "@/features/payments-page/api";

export type PaymentsSortBy =
  | "username"
  | "dateOfPayment"
  | "price"
  | "paymentSystem";

type Params = {
  pageNumber: number;
  pageSize: number;
  sortBy: PaymentsSortBy;
  sortDirection: SortDirection;
  search: string;
  enableAutoRefetch: boolean;
};

export const usePaymentsPage = (props: Params) => {
  const {
    pageNumber,
    pageSize,
    sortBy,
    sortDirection,
    search,
    enableAutoRefetch = false,
  } = props;

  return useQuery({
    queryKey: ["payments", pageNumber, pageSize, sortBy, sortDirection, search],
    queryFn: () =>
      fetchPayments({ pageNumber, pageSize, sortDirection, sortBy, search }),
    refetchInterval: enableAutoRefetch ? 15000 : false,
  });
};
