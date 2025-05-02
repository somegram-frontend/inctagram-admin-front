import { client } from "@/shared/api/instanse";
import { graphql } from "@/shared/configs/gql";
import { GetPostsQueryVariables } from "@/shared/configs/gql/graphql";

const getPostsQuery = graphql(`
  query getPosts(
    $pageNumber: Int!
    $pageSize: Int!
    $searchByUsername: String
    $sortBy: String!
    $sortDirection: SortDirection!
  ) {
    getPosts(
      queryString: {
        pageNumber: $pageNumber
        pageSize: $pageSize
        sortDirection: $sortDirection
        searchByUsername: $searchByUsername
        sortBy: $sortBy
      }
    ) {
      totalCount
      pageNumber
      pagesCount
      pageSize
      items {
        id
        description
        createdAt
        updatedAt
        getPostsPhotos {
          ownerId
          createdAt
          originalname
          size
          url
          key
          postId
        }
        postOwnerInfo {
          userId
          username
          profileUrl
          getAvatar {
            ownerId
            createdAt
            originalname
            size
            url
            key
            postId
          }
        }
      }
    }
  }
`);

export const fetchPayments = async (variables: GetPostsQueryVariables) => {
  const data = await client.request(getPostsQuery, variables);
  return data.getPosts;
};
