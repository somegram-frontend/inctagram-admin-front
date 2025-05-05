import { SignIn } from "@/features/sign-in/ui";

import s from "./page.module.scss";

export default function SignInPage() {
  return (
    <div className={s.page}>
      <SignIn />
    </div>
  );
}
