import { client } from "@/shared/api/instanse";
import { graphql } from "@/shared/configs/gql";
import { UnbanUserMutationVariables } from "@/shared/configs/gql/graphql";

const unbanUserMutation = graphql(`
  mutation unbanUser($userId: String!) {
    unbanUser(userId: $userId)
  }
`);

export const unbanUser = async (variables: UnbanUserMutationVariables) => {
  const data = await client.request(unbanUserMutation, variables);

  return data.unbanUser;
};
