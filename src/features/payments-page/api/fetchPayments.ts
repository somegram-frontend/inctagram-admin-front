import { graphql } from "@/shared/configs/gql";
import { client } from "@/shared/api/instanse";
import { GetAllPaymentsQueryVariables } from "@/shared/configs/gql/graphql";

const getAllPaymentsQuery = graphql(`
  query getAllPayments(
    $pageNumber: Int!
    $pageSize: Int!
    $sortBy: String!
    $sortDirection: SortDirection!
    $search: String
  ) {
    getAllPayments(
      queryString: {
        pageNumber: $pageNumber
        pageSize: $pageSize
        sortBy: $sortBy
        sortDirection: $sortDirection
        search: $search
      }
    ) {
      totalCount
      pageNumber
      pagesCount
      pageSize
      items {
        subscriptionId
        subscriptionType
        price
        paymentSystem
        status
        dateOfPayment
        endDateOfSubscription
        userId
        username
        getUser {
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

export const fetchPayments = async (
  variables: GetAllPaymentsQueryVariables,
) => {
  const data = await client.request(getAllPaymentsQuery, variables);
  return data.getAllPayments;
};
