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
import { usePathname, useRouter } from "next/navigation";
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
import {
  Block,
  MoreHorizontalOutline,
  PersonRemoveOutline,
} from "@honor-ui/inctagram-ui-kit";
import { Path } from "@/shared/const/path";
import { Loader } from "@/shared/components/loader";
import { usePaginationParams } from "@/shared/hooks/usePaginationParams";

const HEADER_USERS_LIST = [
  "User ID",
  "Username",
  "Profile link",
  "Date added",
  "",
];
export const UserList = () => {
  const router = useRouter();
  const { pageNumber, pageSize, setNewParams } = usePaginationParams({});
  const pathname = usePathname();

  const { data, error, isLoading } = useUsers({ pageSize, pageNumber });

  useEffect(() => {
    if (error) {
      toast.error(parseGraphQLError(error));
    }
  }, [error]);

  if (isLoading) {
    return <Loader />;
  }

  const navigateToUserInfo = (userId: string) => {
    router.push(pathname + "/" + userId + Path.User.UploadedPhotos);
  };

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
                  <DropdownMenuContent align={"end"}>
                    <DropdownMenuItem className={s.item}>
                      <PersonRemoveOutline /> Delete User
                    </DropdownMenuItem>
                    <DropdownMenuItem className={s.item}>
                      <Block /> Ban in the system
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className={s.item}
                      onClick={() => navigateToUserInfo(row.id)}
                    >
                      <MoreHorizontalOutline /> More information
                    </DropdownMenuItem>
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
