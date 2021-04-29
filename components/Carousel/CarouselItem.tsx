import { Box } from "@chakra-ui/layout";

interface CarouselItem {
	bgColor?: string
}

const CarouselItem = ({ bgColor }) => {
	return (
		<Box
			bgColor={bgColor}
			h="400px"
			w="280px"
			m="1rem 1rem"
			// backgroundImage={`url(${bgImg})`}
			// backgroundSize="cover"
			borderRadius=".5rem"
			cursor="pointer"
		>
		</Box>
	);
}

export default CarouselItem;