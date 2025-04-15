/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  "\n  mutation AuthorizeSuperAdmin($loginInput: LoginInput!) {\n    authorizeSuperAdmin(loginInput: $loginInput)\n  }\n": typeof types.AuthorizeSuperAdminDocument;
  "\n  query LoginSa {\n    loginSa\n  }\n": typeof types.LoginSaDocument;
  "\n  mutation banUser($banUserInput: BanUserInput!) {\n    banUser(banUserInput: $banUserInput)\n  }\n": typeof types.BanUserDocument;
  "\n  mutation deleteUser($userId: String!) {\n    deleteUser(userId: $userId)\n  }\n": typeof types.DeleteUserDocument;
  '\n  query getUsers($pageNumber: Int!, $pageSize: Int!) {\n    getUsers(\n      queryString: {\n        pageNumber: $pageNumber\n        pageSize: $pageSize\n        sortBy: "createdAt"\n        sortDirection: DESC\n      }\n    ) {\n      totalCount\n      pageNumber\n      pagesCount\n      pageSize\n      items {\n        id\n        createdAt\n        email\n        username\n        about\n        dateOfBirth\n        firstName\n        lastName\n        city\n        country\n        accountType\n        profileLink\n        isDeleted\n        banInfo {\n          banReason\n          banDate\n        }\n      }\n    }\n  }\n': typeof types.GetUsersDocument;
  "\n  mutation unbanUser($userId: String!) {\n    unbanUser(userId: $userId)\n  }\n": typeof types.UnbanUserDocument;
  "\n  query getPaymentsByUser(\n    $pageNumber: Int!\n    $pageSize: Int!\n    $userId: String!\n  ) {\n    getPaymentsByUser(\n      queryString: {\n        pageNumber: $pageNumber\n        pageSize: $pageSize\n        sortDirection: DESC\n      }\n      userId: $userId\n    ) {\n      pageNumber\n      pageSize\n      pagesCount\n      totalCount\n      items {\n        subscriptionId\n        subscriptionType\n        price\n        paymentSystem\n        status\n        dateOfPayment\n        endDateOfSubscription\n        userId\n        username\n      }\n    }\n  }\n": typeof types.GetPaymentsByUserDocument;
  "\n  query getUser($id: String!) {\n    getUser(id: $id) {\n      id\n      createdAt\n      email\n      username\n      about\n      dateOfBirth\n      firstName\n      lastName\n      city\n      country\n      accountType\n      profileLink\n      isDeleted\n      banInfo {\n        banReason\n        banDate\n      }\n      getAvatar {\n        ownerId\n        createdAt\n        originalname\n        size\n        url\n        key\n        postId\n      }\n      getPostsPhotos {\n        ownerId\n        createdAt\n        originalname\n        size\n        url\n        key\n        postId\n      }\n    }\n  }\n": typeof types.GetUserDocument;
};
const documents: Documents = {
  "\n  mutation AuthorizeSuperAdmin($loginInput: LoginInput!) {\n    authorizeSuperAdmin(loginInput: $loginInput)\n  }\n":
    types.AuthorizeSuperAdminDocument,
  "\n  query LoginSa {\n    loginSa\n  }\n": types.LoginSaDocument,
  "\n  mutation banUser($banUserInput: BanUserInput!) {\n    banUser(banUserInput: $banUserInput)\n  }\n":
    types.BanUserDocument,
  "\n  mutation deleteUser($userId: String!) {\n    deleteUser(userId: $userId)\n  }\n":
    types.DeleteUserDocument,
  '\n  query getUsers($pageNumber: Int!, $pageSize: Int!) {\n    getUsers(\n      queryString: {\n        pageNumber: $pageNumber\n        pageSize: $pageSize\n        sortBy: "createdAt"\n        sortDirection: DESC\n      }\n    ) {\n      totalCount\n      pageNumber\n      pagesCount\n      pageSize\n      items {\n        id\n        createdAt\n        email\n        username\n        about\n        dateOfBirth\n        firstName\n        lastName\n        city\n        country\n        accountType\n        profileLink\n        isDeleted\n        banInfo {\n          banReason\n          banDate\n        }\n      }\n    }\n  }\n':
    types.GetUsersDocument,
  "\n  mutation unbanUser($userId: String!) {\n    unbanUser(userId: $userId)\n  }\n":
    types.UnbanUserDocument,
  "\n  query getPaymentsByUser(\n    $pageNumber: Int!\n    $pageSize: Int!\n    $userId: String!\n  ) {\n    getPaymentsByUser(\n      queryString: {\n        pageNumber: $pageNumber\n        pageSize: $pageSize\n        sortDirection: DESC\n      }\n      userId: $userId\n    ) {\n      pageNumber\n      pageSize\n      pagesCount\n      totalCount\n      items {\n        subscriptionId\n        subscriptionType\n        price\n        paymentSystem\n        status\n        dateOfPayment\n        endDateOfSubscription\n        userId\n        username\n      }\n    }\n  }\n":
    types.GetPaymentsByUserDocument,
  "\n  query getUser($id: String!) {\n    getUser(id: $id) {\n      id\n      createdAt\n      email\n      username\n      about\n      dateOfBirth\n      firstName\n      lastName\n      city\n      country\n      accountType\n      profileLink\n      isDeleted\n      banInfo {\n        banReason\n        banDate\n      }\n      getAvatar {\n        ownerId\n        createdAt\n        originalname\n        size\n        url\n        key\n        postId\n      }\n      getPostsPhotos {\n        ownerId\n        createdAt\n        originalname\n        size\n        url\n        key\n        postId\n      }\n    }\n  }\n":
    types.GetUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation AuthorizeSuperAdmin($loginInput: LoginInput!) {\n    authorizeSuperAdmin(loginInput: $loginInput)\n  }\n",
): (typeof documents)["\n  mutation AuthorizeSuperAdmin($loginInput: LoginInput!) {\n    authorizeSuperAdmin(loginInput: $loginInput)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query LoginSa {\n    loginSa\n  }\n",
): (typeof documents)["\n  query LoginSa {\n    loginSa\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation banUser($banUserInput: BanUserInput!) {\n    banUser(banUserInput: $banUserInput)\n  }\n",
): (typeof documents)["\n  mutation banUser($banUserInput: BanUserInput!) {\n    banUser(banUserInput: $banUserInput)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation deleteUser($userId: String!) {\n    deleteUser(userId: $userId)\n  }\n",
): (typeof documents)["\n  mutation deleteUser($userId: String!) {\n    deleteUser(userId: $userId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query getUsers($pageNumber: Int!, $pageSize: Int!) {\n    getUsers(\n      queryString: {\n        pageNumber: $pageNumber\n        pageSize: $pageSize\n        sortBy: "createdAt"\n        sortDirection: DESC\n      }\n    ) {\n      totalCount\n      pageNumber\n      pagesCount\n      pageSize\n      items {\n        id\n        createdAt\n        email\n        username\n        about\n        dateOfBirth\n        firstName\n        lastName\n        city\n        country\n        accountType\n        profileLink\n        isDeleted\n        banInfo {\n          banReason\n          banDate\n        }\n      }\n    }\n  }\n',
): (typeof documents)['\n  query getUsers($pageNumber: Int!, $pageSize: Int!) {\n    getUsers(\n      queryString: {\n        pageNumber: $pageNumber\n        pageSize: $pageSize\n        sortBy: "createdAt"\n        sortDirection: DESC\n      }\n    ) {\n      totalCount\n      pageNumber\n      pagesCount\n      pageSize\n      items {\n        id\n        createdAt\n        email\n        username\n        about\n        dateOfBirth\n        firstName\n        lastName\n        city\n        country\n        accountType\n        profileLink\n        isDeleted\n        banInfo {\n          banReason\n          banDate\n        }\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation unbanUser($userId: String!) {\n    unbanUser(userId: $userId)\n  }\n",
): (typeof documents)["\n  mutation unbanUser($userId: String!) {\n    unbanUser(userId: $userId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getPaymentsByUser(\n    $pageNumber: Int!\n    $pageSize: Int!\n    $userId: String!\n  ) {\n    getPaymentsByUser(\n      queryString: {\n        pageNumber: $pageNumber\n        pageSize: $pageSize\n        sortDirection: DESC\n      }\n      userId: $userId\n    ) {\n      pageNumber\n      pageSize\n      pagesCount\n      totalCount\n      items {\n        subscriptionId\n        subscriptionType\n        price\n        paymentSystem\n        status\n        dateOfPayment\n        endDateOfSubscription\n        userId\n        username\n      }\n    }\n  }\n",
): (typeof documents)["\n  query getPaymentsByUser(\n    $pageNumber: Int!\n    $pageSize: Int!\n    $userId: String!\n  ) {\n    getPaymentsByUser(\n      queryString: {\n        pageNumber: $pageNumber\n        pageSize: $pageSize\n        sortDirection: DESC\n      }\n      userId: $userId\n    ) {\n      pageNumber\n      pageSize\n      pagesCount\n      totalCount\n      items {\n        subscriptionId\n        subscriptionType\n        price\n        paymentSystem\n        status\n        dateOfPayment\n        endDateOfSubscription\n        userId\n        username\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getUser($id: String!) {\n    getUser(id: $id) {\n      id\n      createdAt\n      email\n      username\n      about\n      dateOfBirth\n      firstName\n      lastName\n      city\n      country\n      accountType\n      profileLink\n      isDeleted\n      banInfo {\n        banReason\n        banDate\n      }\n      getAvatar {\n        ownerId\n        createdAt\n        originalname\n        size\n        url\n        key\n        postId\n      }\n      getPostsPhotos {\n        ownerId\n        createdAt\n        originalname\n        size\n        url\n        key\n        postId\n      }\n    }\n  }\n",
): (typeof documents)["\n  query getUser($id: String!) {\n    getUser(id: $id) {\n      id\n      createdAt\n      email\n      username\n      about\n      dateOfBirth\n      firstName\n      lastName\n      city\n      country\n      accountType\n      profileLink\n      isDeleted\n      banInfo {\n        banReason\n        banDate\n      }\n      getAvatar {\n        ownerId\n        createdAt\n        originalname\n        size\n        url\n        key\n        postId\n      }\n      getPostsPhotos {\n        ownerId\n        createdAt\n        originalname\n        size\n        url\n        key\n        postId\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
