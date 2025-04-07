import { graphql } from "@/shared/configs/gql";
import { client } from "@/shared/api/instanse";
import { GetPaymentsByUserQueryVariables } from "@/shared/configs/gql/graphql";

const getPaymentsByUser = graphql(`
  query getPaymentsByUser(
    $pageNumber: Int!
    $pageSize: Int!
    $userId: String!
  ) {
    getPaymentsByUser(
      queryString: {
        pageNumber: $pageNumber
        pageSize: $pageSize
        sortDirection: DESC
      }
      userId: $userId
    ) {
      pageNumber
      pageSize
      pagesCount
      totalCount
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
      }
    }
  }
`);

export const fetchPaymentsByUser = async (
  variables: GetPaymentsByUserQueryVariables,
) => {
  const data = await client.request(getPaymentsByUser, variables);
  return data?.getPaymentsByUser;
};
