import { Flex } from "@chakra-ui/layout";
import ProductCard from "./ProductCard";


const ProductContainer = ({ }) => {
	return (
		<Flex
			flexWrap="wrap"
			w="100%"
			justifyItems="center"
			alignItems="center"
		>
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
		</Flex>
	);
}

export default ProductContainer;