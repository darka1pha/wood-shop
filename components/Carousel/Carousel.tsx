import { Box, Flex } from "@chakra-ui/layout";
import Slider from "react-slick";
import CarouselArrow from "./CarouselArrow";
import CarouselItem from "./CarouselItem";

interface ICarouselItem {
	image_url?: string;
	price?: string;
	name?: string;
}

interface ICarousel {
	data?: Array<ICarouselItem>
}

const Carousel = ({ data }: ICarousel) => {
	var settings = {
		infinite: true,
		variableWidth:true,
		nextArrow: <CarouselArrow rotate="180" type="right" />,
		prevArrow: <CarouselArrow />,
		className: "slider",
	};

	return (
			<Flex
				w="100%"
				maxW="1920px"
				justifyContent="space-evenly"
				overflow="hidden"
				p={{ base: "1.5rem", md: "2rem" }}
				display="flex"
				flexDir="column"
			>
				<Slider {...settings} lazyLoad="ondemand">
					<CarouselItem bgColor="red" />
					<CarouselItem bgColor="violet" />
					<CarouselItem bgColor="yellow" />
					<CarouselItem bgColor="green" />
					<CarouselItem bgColor="black" />
					{/* {
					data.map(({ image_url, price, name }, key: number) => (
						<CarouselItem name={name} price={price} image_url={image_url} key={key} />
					))
				} */}
				</Slider>
			</Flex>
	);
}

export default Carousel;