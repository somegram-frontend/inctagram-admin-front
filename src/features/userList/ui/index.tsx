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
import { SortBy, useUsers } from "@/features/userList/model";
import Pagination from "@/shared/components/pagination/Pagination";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/dropDown";
import { parseGraphQLError } from "@/shared/utils";
import {
  Block,
  Button,
  Input,
  MoreHorizontalOutline,
  PersonRemoveOutline,
} from "@honor-ui/inctagram-ui-kit";
import { Path } from "@/shared/const/path";
import { Loader } from "@/shared/components/loader";
import { usePaginationParams } from "@/shared/hooks/usePaginationParams";
import { SortDirection } from "@/shared/configs/gql/graphql";
import s from "./userList.module.scss";
import clsx from "clsx";
import Polygon from "@/shared/components/icons/Polygon";
import { useUserListModals } from "@/features/userList/model/useUserListModals";
import { UserListModals } from "@/features/userList/ui/user-list-modals";
import useDebounce from "./hook/useDebounce";

const HEADER_USERS = [
  "User ID",
  "Username",
  "Profile link",
  "Date added",
  "",
] as const;

const HEAD_SORT: Record<string, SortBy> = {
  Username: "username",
  "Date added": "createdAt",
};

export const UserList = () => {
  const router = useRouter();
  const [sortBy, setSortBy] = useState<SortBy>("username");
  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce(search, 1500);
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    SortDirection.Desc,
  );

  const { pageNumber, pageSize, setNewParams } = usePaginationParams({});

  const pathname = usePathname();
  const { openModal } = useUserListModals();

  const { data, error, isLoading, refetch, isFetching } = useUsers({
    pageSize,
    pageNumber,
    sortBy: sortBy,
    sortDirection: sortDirection,
    search: debouncedValue,
  });

  const loading = isLoading || isFetching;

  useEffect(() => {
    refetch();
  }, [debouncedValue, refetch]);

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

  const toggleSort = (field: SortBy) => {
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
    refetch();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };

  return (
    <Page>
      <Input
        search
        value={search}
        onChange={handleInputChange}
        className={s.searchInput}
      />
      <TableRoot>
        <TableHead>
          <TableTr>
            {HEADER_USERS.map((head) => {
              const sortField = HEAD_SORT[head];
              const notSort = head === "Username" || head === "Date added";
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
          {data?.items.map((row) => (
            <TableTr key={row.id}>
              <TableTd className={s.idSection}>
                <span className={s.blockContainer}>
                  {row.banInfo && <Block />}
                </span>
                {row.id}
              </TableTd>
              <TableTd>{row.username}</TableTd>
              <TableTd>{row.profileLink}</TableTd>
              <TableTd>{format(new Date(row.createdAt), "dd.MM.yyyy")}</TableTd>
              <TableTd>
                <DropdownMenu>
                  <DropdownMenuTrigger className={s.trigger}>
                    ...
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align={"end"}>
                    <DropdownMenuItem
                      className={s.item}
                      onClick={() =>
                        openModal(
                          { userName: row.username, userId: row.id },
                          "delete",
                        )
                      }
                    >
                      <PersonRemoveOutline /> Delete User
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className={s.item}
                      onClick={() =>
                        openModal(
                          { userName: row.username, userId: row.id },
                          row.banInfo !== null ? "unban" : "ban",
                        )
                      }
                    >
                      <Block /> {row.banInfo !== null ? "Unban" : "Ban"} in the
                      system
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
      <UserListModals />
    </Page>
  );
};
