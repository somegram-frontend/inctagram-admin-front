"use client";

import s from "./following-page.module.scss";
import { Button, Typography } from "@honor-ui/inctagram-ui-kit";
import {
  SortByParam,
  useFollowingPage,
} from "@/features/view-profile-page/ui/pages/following-page/useFollowingPage";
import { Loader } from "@/shared/components/loader";
import {
  TableBody,
  TableHead,
  TableRoot,
  TableTd,
  TableTh,
  TableTr,
} from "@/shared/components/table";
import { format } from "date-fns";
import Pagination from "@/shared/components/pagination/Pagination";
import clsx from "clsx";
import { SortDirection } from "@/shared/configs/gql/graphql";
import Polygon from "@/shared/components/icons/Polygon";
import { SortBy } from "@/features/users-list/lib";

export const FollowingPage = () => {
  const {
    setNewParams,
    pageNumber,
    pageSize,
    isLoading,
    data,
    sortDirection,
    toggleSort,
    sortBy,
  } = useFollowingPage();

  if (isLoading) {
    return <Loader />;
  }

  const HEADER_LIST = [
    "User ID",
    "Username",
    "Profile link",
    "Subscription Date",
  ] as const;

  const HEAD_SORT: Record<string, SortBy> = {
    Username: "username",
    "Subscription Date": "createdAt",
  };

  return (
    <div className={s.page}>
      {data?.items.length !== 0 ? (
        <div className={s.content}>
          <TableRoot>
            <TableHead>
              <TableTr>
                {HEADER_LIST.map((head) => {
                  const sortField = HEAD_SORT[head];
                  const notSort =
                    head === "Username" || head === "Subscription Date";
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
                        disabled={!notSort || isLoading}
                        onClick={() => toggleSort(sortField as SortByParam)}
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
                  <TableTd>{row.id}</TableTd>
                  <TableTd>{row.username}</TableTd>
                  <TableTd>
                    <Typography
                      href={!!row.profileLink ? row.profileLink : ""}
                      as={"a"}
                      variant={"regular_text16"}
                      className={s.profileLink}
                    >
                      {row.profileLink}
                    </Typography>
                  </TableTd>

                  <TableTd>
                    {format(new Date(row.subscriptionDate), "dd.MM.yyyy")}
                  </TableTd>
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
        </div>
      ) : (
        <div className={s.notPaymentsTitle}>
          <Typography variant={"large"}>Not Following Users</Typography>
        </div>
      )}
    </div>
  );
};
