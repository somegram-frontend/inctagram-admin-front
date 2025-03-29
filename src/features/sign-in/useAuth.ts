import {SignInInput} from "./api";
import { signIn, signOut } from 'next-auth/react';

export const signInAdmin = async (payload: SignInInput, route: () => void): Promise<void> => {
  try {
    const result = await signIn('credentials', {
      email: payload.email,
      password: payload.password,
      redirect: false,
    });

    if (result?.ok) {
      route();
    }

    if (result?.error) {
      return Promise.reject(result.error);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const logout = async () => {
  try {
    await signOut();
  } catch (error) {
    console.error('Ошибка при выходе:', error);
    return Promise.reject(error);
  }
};