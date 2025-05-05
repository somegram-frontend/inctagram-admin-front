import { client } from "@/shared/api/instanse";
import { graphql } from "@/shared/configs/gql";
import { BanUserMutationVariables } from "@/shared/configs/gql/graphql";

const banUserMutation = graphql(`
  mutation banUser($banUserInput: BanUserInput!) {
    banUser(banUserInput: $banUserInput)
  }
`);

export const banUser = async (variables: BanUserMutationVariables) => {
  const data = await client.request(banUserMutation, variables);

  return data.banUser;
};
