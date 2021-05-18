import { Flex } from "@chakra-ui/layout";

const ProductCarouselItem = ({bgColor}) => {
	return (
		<Flex
			h="400px"
			w="100%"
			m="auto"
			bg={bgColor}
			borderRadius=".5rem"
		>

		</Flex>
	);
}

export default ProductCarouselItem;