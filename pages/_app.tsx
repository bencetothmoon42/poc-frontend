import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider, gql } from "@apollo/client";
import client from "../apollo-client";
import MainLayout from "../components/layouts/main";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ApolloProvider>
  );
}

export default MyApp;
