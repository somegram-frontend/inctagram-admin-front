import { graphql } from "@/shared/configs/gql";
import { client } from "@/shared/api/instanse";
import { GetFollowingByUserQueryVariables } from "@/shared/configs/gql/graphql";

const getFollowingByUser = graphql(`
  query getFollowingByUser(
    $userId: String!
    $pageSize: Int!
    $pageNumber: Int!
    $sortBy: String!
    $sortDirection: SortDirection!
  ) {
    getFollowing(
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
  variables: GetFollowingByUserQueryVariables,
) => {
  const data = await client.request(getFollowingByUser, variables);

  return data.getFollowing;
};
