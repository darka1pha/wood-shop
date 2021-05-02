import { Flex } from "@chakra-ui/layout";
import Head from 'next/head'
import CategoryMenu from "../../components/Category/CategoryMenu";

const index = () => {
    return (
        <Flex
            flexDir="column"
            as="div"
            lang="fa"
            bgColor="bgColor"
            minH="100vh"
            overflowX="hidden"
        >
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <CategoryMenu />
        </Flex>
    );
}

export default index;