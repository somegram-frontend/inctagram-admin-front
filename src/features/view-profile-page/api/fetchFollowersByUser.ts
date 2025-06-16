import { graphql } from "@/shared/configs/gql";
import { client } from "@/shared/api/instanse";
import { GetFollowersByUserQueryVariables } from "@/shared/configs/gql/graphql";

export const getFollowersByUser = graphql(`
  query getFollowersByUser(
    $userId: String!
    $pageSize: Int!
    $pageNumber: Int!
    $sortBy: String!
    $sortDirection: SortDirection!
  ) {
    getFollowers(
      userId: $userId
      queryString: {
        pageNumber: $pageNumber
        pageSize: $pageSize
        sortDirection: $sortDirection
        sortBy: $sortBy
      }
    ) {
      pageNumber
      pageSize
      pagesCount
      totalCount
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
        subscriptionDate
      }
    }
  }
`);

export const fetchFollowingByUser = async (
  variables: GetFollowersByUserQueryVariables,
) => {
  const data = await client.request(getFollowersByUser, variables);

  return data.getFollowers;
};
