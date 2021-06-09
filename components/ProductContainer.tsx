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
			<ProductCard margin="1rem auto" />
			<ProductCard margin="1rem auto" />
			<ProductCard margin="1rem auto" />
			<ProductCard margin="1rem auto" />
			<ProductCard margin="1rem auto" />
			<ProductCard margin="1rem auto" />
			<ProductCard margin="1rem auto" />
		</Flex>
	);
}

export default ProductContainer;