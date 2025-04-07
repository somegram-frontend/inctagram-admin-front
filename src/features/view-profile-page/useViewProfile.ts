"use client"

import {useQuery} from "@tanstack/react-query";
import {fetchUser} from "./api/fetchUser";
import {useParams, useRouter} from "next/navigation";
import {Path} from "@/shared/const/path";


export const useViewProfile = () => {
  const router = useRouter()
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  if (!id) {
    router.push(Path.Admin.UserList);
  }

  const { data, isLoading} = useQuery({
    queryKey: ["viewProfile", id],
    queryFn: async () => await fetchUser({id: id  || ''}),
  })

  return {
    user: data,
    isLoading,
  }
}