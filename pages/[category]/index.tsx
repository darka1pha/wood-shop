import { Flex } from "@chakra-ui/layout";
import Head from 'next/head'
import CategoryMenu from "../../components/Category/CategoryMenu";
import Filter from "../../components/Filter/Filter";
import FilterTitle from "../../components/Filter/FilterTitle";
import ProductContainer from "../../components/ProductContainer";

const index = () => {
	return (
		<Flex
			as="div"
			lang="fa"
			minH="100vh"
			overflowX="hidden"
			p={{ base: "80px .5rem 2rem .5rem", md: "160px 2rem 2rem 2rem" }}
			justifyContent="flex-end"
			bgColor="bgColor"
		>
			<Head>
				<title>Wood Shop</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Flex
				dir="rtl"
				flexDir="column"
				mr={{ base: 0, md: "2rem" }}
				w="100%"
				justifyContent="flex-start"
			>
				<FilterTitle title="صندلی"/>
				<Filter />
				<ProductContainer />
			</Flex>
			<Flex
				w="25%"
				h="auto"
				display={{ base: "none", md: "block" }}
			>
				<CategoryMenu />
			</Flex>
		</Flex>
	);
}

export default index;