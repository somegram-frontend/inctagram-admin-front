import { PaymentsListPage } from "@/features/payments-page/ui";
import { Suspense } from "react";

export default function PaymentsList() {
  return (
    <Suspense>
      <PaymentsListPage />
    </Suspense>
  );
}
