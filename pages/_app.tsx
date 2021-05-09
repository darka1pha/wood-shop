import "../styles/globals.css";
// import "../styles/slick.css";
// import "../styles/slick-theme.css";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";

import { theme } from "../theme/index";
import { Navbar, Menu } from "../components";


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      <ChakraProvider theme={theme}>
        <Navbar />
        <Menu />
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
