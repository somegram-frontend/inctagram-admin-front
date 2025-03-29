"use client"

import FormSignIn from "@/features/sign-in/formSignIn";
import {SignInInput} from "@/features/sign-in/api";
import {signInAdmin} from "@/features/sign-in/useAuth";
import {useRouter} from "next/navigation";
import {Path} from "@/shared/const/path";
import {toast} from "react-toastify";


export const SignIn = () => {
  const router = useRouter();

  const submit = async (value: SignInInput) => {
    await  signInAdmin(value, () => router.push(Path.Admin.UserList)).then(() => {
      toast.success('You are logged in');
    }).catch(error => {
      console.log(error)
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessage = error.response.data.errors[0].message;
        toast.error(errorMessage);
      } else {
        toast.error('Incorrect email or password');
      }
    });
  };

  return <FormSignIn onSubmit={submit} errorMessage={''} />
};