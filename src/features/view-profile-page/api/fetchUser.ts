import {graphql} from "@/shared/configs/gql";
import {  QueryGetUserArgs } from "@/shared/configs/gql/graphql";
import {client} from "@/shared/api/instanse";

const getUserQuery = graphql(`
  query getUser($id: String!) {
    getUser(id: $id) {
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
      getAvatar {
        ownerId
        createdAt
        originalname
        size
        url
        key
        postId
      }
      getPostsPhotos {
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
`);

export const fetchUser = async (variables: QueryGetUserArgs) => {
  const data = await client.request(getUserQuery, variables);
  return data?.getUser;
};

