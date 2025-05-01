"use client";

import { Page } from "@/shared/components/page";
import {
  Button,
  Checkbox,
  Input,
  Typography,
} from "@honor-ui/inctagram-ui-kit";
import s from "./payments-page.module.scss";
import {
  TableBody,
  TableHead,
  TableRoot,
  TableTd,
  TableTh,
  TableTr,
} from "@/shared/components/table";
import clsx from "clsx";
import { SortDirection } from "@/shared/configs/gql/graphql";
import Polygon from "@/shared/components/icons/Polygon";
import { format } from "date-fns";
import Pagination from "@/shared/components/pagination/Pagination";
import { usePaymentsPage, PaymentsSortBy } from "@/features/payments-page/lib";
import useDebounce from "@/features/userList/ui/hook/useDebounce";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getInitials, parseGraphQLError } from "@/shared/utils";
import { Loader } from "@/shared/components/loader";
import { usePaginationParams } from "@/shared/hooks/usePaginationParams";
import { Avatar } from "radix-ui";
import { calculateRemainingTime } from "@/shared/utils";

const HEADER_PAYMENTS = [
  "Username",
  "Date added",
  "Amount,$",
  "Subscription",
  "Payments Method",
] as const;

const HEAD_SORT: Record<string, PaymentsSortBy> = {
  Username: "username",
  "Date added": "dateOfPayment",
  "Amount,$": "price",
  "Payments Method": "paymentSystem",
};

export const PaymentsListPage = () => {
  const [sortBy, setSortBy] = useState<PaymentsSortBy>("dateOfPayment");
  const [enableAutoRefetch, setEnableAutoRefetch] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce(search, 1500);
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    SortDirection.Desc,
  );

  const { pageNumber, pageSize, setNewParams } = usePaginationParams({
    initialPageSize: 6,
  });

  const { data, error, isLoading, isFetching } = usePaymentsPage({
    pageSize,
    pageNumber,
    sortBy,
    sortDirection,
    search: debouncedValue,
    enableAutoRefetch,
  });

  const loading = isLoading || isFetching;

  const toggleSort = (field: PaymentsSortBy) => {
    if (sortBy !== field) {
      setSortBy(field);
      setSortDirection(SortDirection.Asc);
    } else {
      setSortDirection(
        sortDirection === SortDirection.Asc
          ? SortDirection.Desc
          : SortDirection.Asc,
      );
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setEnableAutoRefetch(localStorage.getItem("autoupdate") === "true");
    }
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(parseGraphQLError(error));
    }
  }, [error]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };

  const handleAutoRefetchChange = (checked: boolean) => {
    setEnableAutoRefetch(checked);
    localStorage.setItem("autoupdate", checked.toString());
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Page>
      <div className={s.checkboxContainer}>
        <Checkbox
          checked={enableAutoRefetch}
          onCheckedChange={handleAutoRefetchChange}
          label="Autoupdate"
        />
      </div>
      <Input
        search
        value={search}
        onChange={handleInputChange}
        className={s.searchInput}
      />
      <TableRoot>
        <TableHead>
          <TableTr>
            {HEADER_PAYMENTS.map((head) => {
              const sortField = HEAD_SORT[head];
              const notSort = head !== "Subscription";
              return (
                <TableTh key={head}>
                  <Button
                    className={clsx(s.sortBtn, {
                      [s.asc]:
                        sortBy === sortField &&
                        sortDirection === SortDirection.Asc,
                      [s.desc]:
                        sortBy === sortField &&
                        sortDirection === SortDirection.Desc,
                      [s.notSortable]: !notSort,
                    })}
                    variant="borderless"
                    disabled={!notSort || loading}
                    onClick={() => toggleSort(sortField)}
                  >
                    {head}
                    {notSort && <Polygon className={s.arrow} />}
                  </Button>
                </TableTh>
              );
            })}
          </TableTr>
        </TableHead>
        <TableBody>
          {data?.items.map((row, index) => (
            <TableTr key={index}>
              <TableTd className={s.idSection}>
                <Avatar.Root className={s.avatar}>
                  <Avatar.Image
                    src={row.getUser?.getAvatar?.url || undefined}
                    className={s.avatarImage}
                  />
                  <Avatar.AvatarFallback className={s.avatarFallback}>
                    {getInitials(row.username)}
                  </Avatar.AvatarFallback>
                </Avatar.Root>
                {row.username}
              </TableTd>
              <TableTd>
                <Typography variant="regular_text14">
                  {format(new Date(row.dateOfPayment), "dd.MM.yyyy")}
                </Typography>
              </TableTd>
              <TableTd>
                <Typography variant="regular_text14">
                  {row.price}
                  <Typography variant="regular_text16">$</Typography>
                </Typography>
              </TableTd>
              <TableTd>
                {calculateRemainingTime(row.endDateOfSubscription)}
              </TableTd>
              <TableTd>{row.paymentSystem}</TableTd>
            </TableTr>
          ))}
        </TableBody>
      </TableRoot>
      <Pagination
        className={s.pagination}
        totalCount={data?.totalCount ?? 0}
        searchParams={{ pageSize, pageNumber }}
        setNewParams={setNewParams}
        selectBlock={false}
      />
    </Page>
  );
};
