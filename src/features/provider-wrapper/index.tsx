"use client";

import { queryClient } from "@/shared/api/instanse";
import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Slide, ToastContainer } from "react-toastify";
import { SetupAuthHeader } from "@/shared/api/SetupAuthHeader";
import { Provider } from "react-redux";
import { store } from "@/app/store";

export const ProviderWrapper = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <Provider store={store}>
      <SessionProvider>
        <SetupAuthHeader />

        <QueryClientProvider client={queryClient}>
          {children}
          <ToastContainer
            autoClose={3000}
            closeOnClick
            draggable
            hideProgressBar={false}
            pauseOnFocusLoss
            pauseOnHover
            position={"bottom-left"}
            rtl={false}
            stacked
            style={{ marginLeft: "10px" }}
            theme={"dark"}
            transition={Slide}
          />
          {process.env.NODE_ENV === "development" && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </QueryClientProvider>
      </SessionProvider>
    </Provider>
  );
};
