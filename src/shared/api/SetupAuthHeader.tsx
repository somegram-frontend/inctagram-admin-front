"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { client } from "@/shared/api/instanse";

export const SetupAuthHeader = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.token) {
      client.setHeader("Authorization", session.token);
    }
  }, [session]);

  return null;
};
