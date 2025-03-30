import { client } from "@/shared/api/instanse";
import { gql } from "graphql-request";

const AUTHORIZE_SUPER_ADMIN = gql`
  mutation AuthorizeSuperAdmin($loginInput: LoginInput!) {
    authorizeSuperAdmin(loginInput: $loginInput)
  }
`;

export interface SignInInput {
  email: string;
  password: string;
}

export interface AuthorizeSuperAdminResponse {
  authorizeSuperAdmin: string;
}

export const authorizeSuperAdmin = async (
  loginInput: SignInInput,
): Promise<string> => {
  const variables = { loginInput };

  try {
    const data: AuthorizeSuperAdminResponse = await client.request(
      AUTHORIZE_SUPER_ADMIN,
      variables,
    );

    return data.authorizeSuperAdmin;
  } catch (e) {
    return Promise.reject(e);
  }
};

const LOGIN_SA = gql`
  query LoginSa {
    loginSa
  }
`;

export interface FetchLoginSa {
  data: {
    loginSa: string;
  } | null;
}

export const fetchLoginSa = async (token: string) => {
  client.setHeader("Authorization", token);
  const res: FetchLoginSa = await client.request(LOGIN_SA);

  return res.data;
};
