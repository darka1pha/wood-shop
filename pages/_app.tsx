import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";

import { theme } from "../theme/index";
import { Navbar, Menu } from "../components";

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

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
