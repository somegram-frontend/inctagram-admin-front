import { QueryClient } from '@tanstack/react-query';
import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_GRAPH_API_URL ?? 'https://somegram.online/api/v1/graphql';

export const client = new GraphQLClient(endpoint);
export const queryClient = new QueryClient();