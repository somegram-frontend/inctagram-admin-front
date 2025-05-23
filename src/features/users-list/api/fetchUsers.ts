import { client } from "@/shared/api/instanse";
import { GetUsersQueryVariables } from "@/shared/configs/gql/graphql";
import { graphql } from "@/shared/configs/gql";

const getUsersQuery = graphql(`
  query getUsers(
    $pageNumber: Int!
    $pageSize: Int!
    $sortBy: String!
    $sortDirection: SortDirection!
    $search: String
    $statusFilter: UserBlockStatus!
  ) {
    getUsers(
      queryString: {
        pageNumber: $pageNumber
        pageSize: $pageSize
        sortBy: $sortBy
        sortDirection: $sortDirection
        search: $search
        statusFilter: $statusFilter
      }
    ) {
      totalCount
      pageNumber
      pagesCount
      pageSize
      items {
        id
        createdAt
        email
        username
        about
        dateOfBirth
        firstName
        lastName
        city
        country
        accountType
        profileLink
        isDeleted
        banInfo {
          banReason
          banDate
        }
      }
    }
  }
`);

export const fetchUsers = async (variables: GetUsersQueryVariables) => {
  const data = await client.request(getUsersQuery, variables);
  return data.getUsers;
};
