/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any };
};

export enum AccountType {
  Business = "Business",
  Personal = "Personal",
}

export type BanUserInput = {
  banReason: Scalars["String"]["input"];
  userId: Scalars["String"]["input"];
};

export type FileModel = {
  __typename?: "FileModel";
  createdAt?: Maybe<Scalars["String"]["output"]>;
  key?: Maybe<Scalars["String"]["output"]>;
  originalname?: Maybe<Scalars["String"]["output"]>;
  ownerId?: Maybe<Scalars["String"]["output"]>;
  postId?: Maybe<Scalars["String"]["output"]>;
  size?: Maybe<Scalars["Float"]["output"]>;
  url?: Maybe<Scalars["String"]["output"]>;
};

export type LoginInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type Mutation = {
  __typename?: "Mutation";
  authorizeSuperAdmin: Scalars["String"]["output"];
  banUser: Scalars["Boolean"]["output"];
  deleteUser: Scalars["Boolean"]["output"];
  unbanUser: Scalars["Boolean"]["output"];
};

export type MutationAuthorizeSuperAdminArgs = {
  loginInput: LoginInput;
};

export type MutationBanUserArgs = {
  banUserInput: BanUserInput;
};

export type MutationDeleteUserArgs = {
  userId: Scalars["String"]["input"];
};

export type MutationUnbanUserArgs = {
  userId: Scalars["String"]["input"];
};

export type PaginatedPaymentsModel = {
  __typename?: "PaginatedPaymentsModel";
  items: Array<PaymentsModel>;
  pageNumber: Scalars["Int"]["output"];
  pageSize: Scalars["Int"]["output"];
  pagesCount: Scalars["Int"]["output"];
  totalCount: Scalars["Int"]["output"];
};

export type PaginatedPostsModel = {
  __typename?: "PaginatedPostsModel";
  items: Array<PostModel>;
  pageNumber: Scalars["Int"]["output"];
  pageSize: Scalars["Int"]["output"];
  pagesCount: Scalars["Int"]["output"];
  totalCount: Scalars["Int"]["output"];
};

export type PaginatedUserModel = {
  __typename?: "PaginatedUserModel";
  items: Array<UserModel>;
  pageNumber: Scalars["Int"]["output"];
  pageSize: Scalars["Int"]["output"];
  pagesCount: Scalars["Int"]["output"];
  totalCount: Scalars["Int"]["output"];
};

export type PaymentsModel = {
  __typename?: "PaymentsModel";
  dateOfPayment: Scalars["String"]["output"];
  endDateOfSubscription: Scalars["String"]["output"];
  getUser?: Maybe<UserModel>;
  paymentSystem: Scalars["String"]["output"];
  price: Scalars["Float"]["output"];
  status: Scalars["String"]["output"];
  subscriptionId: Scalars["String"]["output"];
  subscriptionType: Scalars["String"]["output"];
  userId: Scalars["String"]["output"];
  username: Scalars["String"]["output"];
};

export type PaymentsQueryStringInput = {
  pageNumber?: Scalars["Int"]["input"];
  pageSize?: Scalars["Int"]["input"];
  sortBy?: Scalars["String"]["input"];
  sortDirection?: SortDirection;
};

export type PaymentsQueryStringInputWithSearch = {
  pageNumber?: Scalars["Int"]["input"];
  pageSize?: Scalars["Int"]["input"];
  search?: InputMaybe<Scalars["String"]["input"]>;
  sortBy?: Scalars["String"]["input"];
  sortDirection?: SortDirection;
};

export type PostModel = {
  __typename?: "PostModel";
  createdAt: Scalars["DateTime"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  getPostsPhotos?: Maybe<Array<FileModel>>;
  id: Scalars["String"]["output"];
  postOwnerInfo: PostOwnerModel;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type PostOwnerModel = {
  __typename?: "PostOwnerModel";
  getAvatar?: Maybe<FileModel>;
  profileUrl?: Maybe<Scalars["String"]["output"]>;
  userId: Scalars["String"]["output"];
  username: Scalars["String"]["output"];
};

export type PostsQueryStringInput = {
  pageNumber?: Scalars["Int"]["input"];
  pageSize?: Scalars["Int"]["input"];
  searchByUsername?: InputMaybe<Scalars["String"]["input"]>;
  sortBy?: Scalars["String"]["input"];
  sortDirection?: SortDirection;
};

export type Query = {
  __typename?: "Query";
  getAllPayments: PaginatedPaymentsModel;
  getPaymentsByUser: PaginatedPaymentsModel;
  getPosts: PaginatedPostsModel;
  getUser?: Maybe<UserModel>;
  getUsers: PaginatedUserModel;
  loginSa: Scalars["String"]["output"];
};

export type QueryGetAllPaymentsArgs = {
  queryString?: InputMaybe<PaymentsQueryStringInputWithSearch>;
};

export type QueryGetPaymentsByUserArgs = {
  queryString: PaymentsQueryStringInput;
  userId: Scalars["String"]["input"];
};

export type GetPaymentsByUserVariables = {
  queryString: PaymentsQueryStringInput;
  userId: Scalars["String"]["input"];
};

export type QueryGetPostsArgs = {
  queryString?: InputMaybe<PostsQueryStringInput>;
};

export type QueryGetUserArgs = {
  id: Scalars["String"]["input"];
};

export type QueryGetUsersArgs = {
  queryString?: InputMaybe<UsersQueryStringInput>;
};

export enum SortDirection {
  Asc = "ASC",
  Desc = "DESC",
}

export type Subscription = {
  __typename?: "Subscription";
  newPost: PostModel;
};

export type UserBanInfo = {
  __typename?: "UserBanInfo";
  banDate: Scalars["DateTime"]["output"];
  banReason: Scalars["String"]["output"];
};

export enum UserBlockStatus {
  All = "ALL",
  Blocked = "BLOCKED",
  Unblocked = "UNBLOCKED",
}

export type UserModel = {
  __typename?: "UserModel";
  about?: Maybe<Scalars["String"]["output"]>;
  accountType: AccountType;
  banInfo?: Maybe<UserBanInfo>;
  city?: Maybe<Scalars["String"]["output"]>;
  country?: Maybe<Scalars["String"]["output"]>;
  createdAt: Scalars["DateTime"]["output"];
  dateOfBirth?: Maybe<Scalars["DateTime"]["output"]>;
  email: Scalars["String"]["output"];
  firstName?: Maybe<Scalars["String"]["output"]>;
  getAvatar?: Maybe<FileModel>;
  getPostsPhotos?: Maybe<Array<FileModel>>;
  id: Scalars["String"]["output"];
  isDeleted: Scalars["Boolean"]["output"];
  lastName?: Maybe<Scalars["String"]["output"]>;
  profileLink?: Maybe<Scalars["String"]["output"]>;
  username: Scalars["String"]["output"];
};

export type UsersQueryStringInput = {
  pageNumber?: Scalars["Int"]["input"];
  pageSize?: Scalars["Int"]["input"];
  search?: InputMaybe<Scalars["String"]["input"]>;
  sortBy?: Scalars["String"]["input"];
  sortDirection?: SortDirection;
  statusFilter?: UserBlockStatus;
};

export type AuthorizeSuperAdminMutationVariables = Exact<{
  loginInput: LoginInput;
}>;

export type AuthorizeSuperAdminMutation = {
  __typename?: "Mutation";
  authorizeSuperAdmin: string;
};

export type LoginSaQueryVariables = Exact<{ [key: string]: never }>;

export type LoginSaQuery = { __typename?: "Query"; loginSa: string };

export type GetUsersQueryVariables = Exact<{
  pageNumber: Scalars["Int"]["input"];
  pageSize: Scalars["Int"]["input"];
}>;

export type GetUsersQuery = {
  __typename?: "Query";
  getUsers: {
    __typename?: "PaginatedUserModel";
    totalCount: number;
    pageNumber: number;
    pagesCount: number;
    pageSize: number;
    items: Array<{
      __typename?: "UserModel";
      id: string;
      username: string;
      profileLink?: string | null;
      createdAt: any;
    }>;
  };
};

export type GetUserQueryVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type GetUserQuery = {
  __typename?: "Query";
  getUser?: {
    __typename?: "UserModel";
    id: string;
    createdAt: any;
    email: string;
    username: string;
    about?: string | null;
    dateOfBirth?: any | null;
    firstName?: string | null;
    lastName?: string | null;
    city?: string | null;
    country?: string | null;
    accountType: AccountType;
    profileLink?: string | null;
    isDeleted: boolean;
    banInfo?: {
      __typename?: "UserBanInfo";
      banReason: string;
      banDate: any;
    } | null;
    getAvatar?: {
      __typename?: "FileModel";
      ownerId?: string | null;
      createdAt?: string | null;
      originalname?: string | null;
      size?: number | null;
      url?: string | null;
      key?: string | null;
      postId?: string | null;
    } | null;
    getPostsPhotos?: Array<{
      __typename?: "FileModel";
      ownerId?: string | null;
      createdAt?: string | null;
      originalname?: string | null;
      size?: number | null;
      url?: string | null;
      key?: string | null;
      postId?: string | null;
    }> | null;
  } | null;
};

export const AuthorizeSuperAdminDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AuthorizeSuperAdmin" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "loginInput" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "LoginInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "authorizeSuperAdmin" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "loginInput" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "loginInput" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AuthorizeSuperAdminMutation,
  AuthorizeSuperAdminMutationVariables
>;
export const LoginSaDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "LoginSa" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "loginSa" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoginSaQuery, LoginSaQueryVariables>;
export const GetUsersDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getUsers" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "pageNumber" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "pageSize" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getUsers" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "queryString" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "pageNumber" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "pageNumber" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "pageSize" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "pageSize" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "sortBy" },
                      value: {
                        kind: "StringValue",
                        value: "createdAt",
                        block: false,
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "sortDirection" },
                      value: { kind: "EnumValue", value: "DESC" },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "totalCount" } },
                { kind: "Field", name: { kind: "Name", value: "pageNumber" } },
                { kind: "Field", name: { kind: "Name", value: "pagesCount" } },
                { kind: "Field", name: { kind: "Name", value: "pageSize" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "username" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "profileLink" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;
export const GetUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getUser" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "username" } },
                { kind: "Field", name: { kind: "Name", value: "about" } },
                { kind: "Field", name: { kind: "Name", value: "dateOfBirth" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
                { kind: "Field", name: { kind: "Name", value: "city" } },
                { kind: "Field", name: { kind: "Name", value: "country" } },
                { kind: "Field", name: { kind: "Name", value: "accountType" } },
                { kind: "Field", name: { kind: "Name", value: "profileLink" } },
                { kind: "Field", name: { kind: "Name", value: "isDeleted" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "banInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "banReason" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "banDate" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "getAvatar" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "ownerId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "originalname" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "size" } },
                      { kind: "Field", name: { kind: "Name", value: "url" } },
                      { kind: "Field", name: { kind: "Name", value: "key" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "postId" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "getPostsPhotos" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "ownerId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "originalname" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "size" } },
                      { kind: "Field", name: { kind: "Name", value: "url" } },
                      { kind: "Field", name: { kind: "Name", value: "key" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "postId" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
