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
			<ProductCard margin=".5rem auto" />
			<ProductCard margin=".5rem auto" />
			<ProductCard margin=".5rem auto" />
			<ProductCard margin=".5rem auto" />
			<ProductCard margin=".5rem auto" />
			<ProductCard margin=".5rem auto" />
			<ProductCard margin=".5rem auto" />
		</Flex>
	);
}

export default ProductContainer;