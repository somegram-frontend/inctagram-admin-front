"use client";

import { useId } from "react";
import { useForm } from "react-hook-form";
import { Button, Cards, Typography } from "@honor-ui/inctagram-ui-kit";
import "@honor-ui/inctagram-ui-kit/css";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signInSchema } from "@/shared/const/validationSchemas";
import s from "./formSignIn.module.scss";
import { ControlledInput } from "@/shared/components/controlled/ControlledInput";

type Props = {
  onSubmit: (data: SignInForm) => void;
  errorMessage?: string;
};

export type SignInForm = z.infer<typeof signInSchema>;

const FormSignIn = ({ onSubmit, errorMessage }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
    trigger,
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const formId = useId();

  return (
    <Cards className={s.card}>
      <Typography as={"h1"} className={s.title}>
        Sign In
      </Typography>
      <form className={s.form} id={formId} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.containerInput}>
          <ControlledInput
            control={control}
            label={"Email"}
            name={"email"}
            trigger={trigger}
            className={s.input}
          />
          <ControlledInput
            control={control}
            label={"Password"}
            name={"password"}
            trigger={trigger}
            className={s.input}
            errorMessage={errorMessage}
          />
        </div>
        <Button
          form={formId}
          fullWidth
          disabled={!isValid}
          className={s.disabledButton}
        >
          Sign In
        </Button>
      </form>
    </Cards>
  );
};

FormSignIn.displayName = "FormSignIn";

export default FormSignIn;
