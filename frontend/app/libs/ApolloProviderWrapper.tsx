"use client";
import React, { ReactNode } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Cookies from "js-cookie";

type Props = {
  children: ReactNode;
};

// 1. Create the HTTP link
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  credentials: "include", // Important!
});

// 2. Add the authLink to inject the token
const authLink = setContext((_, { headers }) => {
  const token = Cookies.get("token"); // Read token from cookie

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// 3. Create Apollo Client with authLink + httpLink
export const client = new ApolloClient({
  link: authLink.concat(httpLink), // 🔥 Combined link with auth
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "network-only",
    },
    query: {
      fetchPolicy: "network-only",
    },
    mutate: {
      fetchPolicy: "no-cache",
    },
  },
});

// 4. Wrap with ApolloProvider
export const ApolloProviderWrapper = ({ children }: Props) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
