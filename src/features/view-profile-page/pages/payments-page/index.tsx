"use client";

import {
  TableBody,
  TableHead,
  TableRoot,
  TableTd,
  TableTh,
  TableTr,
} from "@/shared/components/table";
import { format } from "date-fns";
import s from "./payments.module.scss";
import Pagination from "@/shared/components/pagination/Pagination";
import { usePaymentsPage } from "@/features/view-profile-page/pages/payments-page/usePaymentsPage";
import { Loader } from "@/shared/components/loader";
import { Typography } from "@honor-ui/inctagram-ui-kit";

const HEADER_LIST = [
  "Date of payment",
  "End date of subscription",
  "Amount, $",
  "Subscription Type",
  "Payment Type",
];

export const PaymentsPage = () => {
  const { data, isLoading, setSearchParams, searchParams } = usePaymentsPage();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={s.page}>
      {data?.items !== 0 || data !== null ? (
        <>
          <TableRoot>
            <TableHead>
              <TableTr>
                {HEADER_LIST.map((head) => (
                  <TableTh key={head}>{head}</TableTh>
                ))}
              </TableTr>
            </TableHead>
            <TableBody>
              {data?.items.map((row) => (
                <TableTr key={row.id}>
                  <TableTd>
                    {format(new Date(row.dateOfPayment), "dd.MM.yyyy")}
                  </TableTd>
                  <TableTd>
                    {format(new Date(row.endDateOfSubscription), "dd.MM.yyyy")}
                  </TableTd>
                  <TableTd>{row.price}</TableTd>
                  <TableTd>{row.subscriptionType}</TableTd>
                  <TableTd>{row.paymentSystem}</TableTd>
                </TableTr>
              ))}
            </TableBody>
          </TableRoot>
          <Pagination
            className={s.pagination}
            totalCount={data?.totalCount ?? 0}
            searchParams={searchParams}
            setNewParams={setSearchParams}
            selectBlock={false}
          />
        </>
      ) : (
        <div className={s.notPhotosTitle}>
          <Typography variant={"large"}>Not uploaded Photos</Typography>
        </div>
      )}
    </div>
  );
};
