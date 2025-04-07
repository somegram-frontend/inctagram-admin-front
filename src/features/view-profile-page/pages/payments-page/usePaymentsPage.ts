"use client"

import {useParams, useRouter} from "next/navigation";
import {Path} from "@/shared/const/path";
import {useQuery} from "@tanstack/react-query";
import {fetchPaymentsByUser} from "@/features/view-profile-page/api";
import {useState} from "react";

export const usePaymentsPage = () => {
  const [searchParams, setSearchParams] = useState({pageNumber: 1, pageSize: 8});
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const router = useRouter()

  if (!id) {
    router.push(Path.Admin.UserList);
  }

  const { data, isLoading} = useQuery({
    queryKey: ["viewProfile", id, "Payments"],
    queryFn: async () => await fetchPaymentsByUser({queryString: {
        pageNumber: searchParams.pageNumber,
        pageSize: searchParams.pageSize,
      }, userId: id  || ''}),
  })

  return {
    data,
    isLoading,
    searchParams,
    setSearchParams
  }
}