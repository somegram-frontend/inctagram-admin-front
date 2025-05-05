import { graphql } from "@/shared/configs/gql";
import { client } from "@/shared/api/instanse";
import { DeleteUserMutationVariables } from "@/shared/configs/gql/graphql";

const deleteUserMutation = graphql(`
  mutation deleteUser($userId: String!) {
    deleteUser(userId: $userId)
  }
`);

export const deleteUser = async (variables: DeleteUserMutationVariables) => {
  const data = await client.request(deleteUserMutation, variables);
  return data.deleteUser;
};
