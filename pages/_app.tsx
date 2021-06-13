import "../styles/globals.css";
import store from "../redux/store";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";

import { theme } from "../theme/index";
import { Navbar, Menu, AlertBox } from "../components";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { createWrapper } from "next-redux-wrapper";

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Menu />
          <AlertBox />
          <Component {...pageProps} />
        </QueryClientProvider>
      </ChakraProvider>
    </>
  );
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
