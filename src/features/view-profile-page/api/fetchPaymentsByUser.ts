import { graphql } from "@/shared/configs/gql";
import { GetPaymentsByUserVariables } from "@/shared/configs/gql/graphql";
import { client } from "@/shared/api/instanse";

const getPaymentsByUser = graphql(`
  query GetPaymentsByUser {
    getPaymentsByUser(
       queryString: {
        pageNumber: $pageNumber
        pageSize: $pageSize
        sortBy: "createdAt"
        sortDirection: DESC
      }
      userId: $userId: String!
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
  variables: GetPaymentsByUserVariables,
) => {
  const data = await client.request(getPaymentsByUser, variables);
  return data?.getPaymentsByUser;
};
