type ConstraintBlock = {
  property?: string;
  constraints?: Record<string, string>;
};

type GraphQLErrorExtensions = {
  message?: {
    message?: ConstraintBlock[];
  };
};

type GraphQLError = {
  message?: string;
  extensions?: GraphQLErrorExtensions;
};

type GraphQLErrorResponse = {
  response?: {
    errors?: GraphQLError[];
  };
};

const isGraphQLErrorResponse = (
  error: unknown,
): error is GraphQLErrorResponse => {
  if (typeof error === "object" && error !== null && "response" in error) {
    const response = (error as GraphQLErrorResponse).response;
    return response !== undefined && Array.isArray(response.errors);
  }
  return false;
};

export const parseGraphQLError = (error: unknown): string => {
  if (!isGraphQLErrorResponse(error)) {
    return "Неизвестная ошибка.";
  }

  const firstError = error.response?.errors?.[0];
  const constraintBlock = firstError?.extensions?.message?.message?.[0];
  const constraints = constraintBlock?.constraints;

  if (constraints) {
    return Object.values(constraints).join(", ");
  }

  return firstError?.message || "Неизвестная ошибка.";
};
