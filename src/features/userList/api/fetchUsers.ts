import { client } from "@/shared/api/instanse";
import { GetUsersQueryVariables } from "@/shared/configs/gql/graphql";
import { graphql } from "@/shared/configs/gql";
import { gql } from "graphql-request";

const getUsersQuery = graphql(`
  query getUsers($pageNumber: Int!, $pageSize: Int!) {
    getUsers(
      queryString: {
        pageNumber: $pageNumber
        pageSize: $pageSize
        sortBy: "createdAt"
        sortDirection: DESC
      }
    ) {
      totalCount
      pageNumber
      pagesCount
      pageSize
      items {
        id
        username
        profileLink
        createdAt
      }
    }
  }
`);

const deleteUserMutation = gql`
  mutation deleteUser($userId: String!) {
    deleteUser(userId: $userId)
  }
`;

export type DeleteUserResponse = {
  deleteUser: string;
};

export const fetchUsers = async (variables: GetUsersQueryVariables) => {
  const data = await client.request(getUsersQuery, variables);
  return data.getUsers;
};

export const deleteUser = async (userId: string) => {
  const variables = { userId };
  try {
    const data: DeleteUserResponse = await client.request(
      deleteUserMutation,
      variables,
    );
    return data.deleteUser;
  } catch (error) {
    return Promise.reject(error);
  }
};
