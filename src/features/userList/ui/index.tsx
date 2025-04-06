"use client";
import { Page } from "@/shared/components/page";
import {
  TableBody,
  TableHead,
  TableRoot,
  TableTd,
  TableTh,
  TableTr,
} from "@/shared/components/table";
import { useUsers } from "@/features/userList/model";
import Pagination from "@/shared/components/pagination/Pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/dropDown";
import s from "./userList.module.scss";
import { parseGraphQLError } from "@/shared/utills";

const HEADER_USERS_LIST = [
  "User ID",
  "Username",
  "Profile link",
  "Date added",
  "",
];
export const UserList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageSize = Number(searchParams.get("pageSize")) || 8;
  const pageNumber = Number(searchParams.get("pageNumber")) || 1;

  const { data, error, isLoading } = useUsers({ pageSize, pageNumber });

  const setNewParams = (params: { pageSize: number; pageNumber: number }) => {
    const newParams = new URLSearchParams(searchParams.toString());

    newParams.set("pageSize", String(params.pageSize));
    newParams.set("pageNumber", String(params.pageNumber));

    if (params.pageSize === 8) newParams.delete("pageSize");
    if (params.pageNumber === 1) newParams.delete("pageNumber");

    router.push(`?${newParams.toString()}`);
  };
  useEffect(() => {
    if (error) {
      toast.error(parseGraphQLError(error));
    }
  }, [error]);

  if (isLoading) {
    return <div>...Loading</div>;
  }

  return (
    <Page>
      <TableRoot>
        <TableHead>
          <TableTr>
            {HEADER_USERS_LIST.map((head) => (
              <TableTh key={head}>{head}</TableTh>
            ))}
          </TableTr>
        </TableHead>
        <TableBody>
          {data?.items.map((row) => (
            <TableTr key={row.id}>
              <TableTd>{row.id}</TableTd>
              <TableTd>{row.username}</TableTd>
              <TableTd>{row.profileLink}</TableTd>
              <TableTd>{format(new Date(row.createdAt), "dd.MM.yyyy")}</TableTd>
              <TableTd>
                <DropdownMenu>
                  <DropdownMenuTrigger className={s.trigger}>
                    ...
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Элемент</DropdownMenuItem>
                    <DropdownMenuItem>Элемент</DropdownMenuItem>
                    <DropdownMenuItem>Элемент</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
    </Page>
  );
};
