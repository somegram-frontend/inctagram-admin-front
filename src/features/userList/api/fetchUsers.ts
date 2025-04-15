import { client } from "@/shared/api/instanse";
import { GetUsersQueryVariables } from "@/shared/configs/gql/graphql";
import { graphql } from "@/shared/configs/gql";

const getUsersQuery = graphql(`
  query getUsers(
    $pageNumber: Int!
    $pageSize: Int!
    $sortDirection: SortDirection!
    $sortBy: String!
  ) {
    getUsers(
      queryString: {
        pageNumber: $pageNumber
        pageSize: $pageSize
        sortBy: $sortBy
        sortDirection: $sortDirection
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

export const fetchUsers = async (variables: GetUsersQueryVariables) => {
  const data = await client.request(getUsersQuery, variables);
  return data.getUsers;
};
