import { Box, Flex } from "@chakra-ui/layout";
import Slider from "react-slick";
import ProductCarouselItem from "./ProductCarouselItem";

interface IProductCard {
	image_url?: string;
	price?: string;
	name?: string;
}

interface ICarousel {
	title?: string;
	data?: Array<IProductCard>;
	tempUrl?: string;
}

const ProductCarousel = ({ data, title, tempUrl }: ICarousel) => {
	var settings = {
		customPaging: function (i) {
			return (
				<Flex display={{ base: "none", md: "block" }} h="45px" w="45px" bg={`blue.${i + 1}00`} />
			);
		},
		dotsClass: "slider slick-dots slick-thumb",
		dots: true,
		initialSlide: 0,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true
	};

	return (
		<Box
			w="100%"
			maxW="1920px"
			h="100%"
		>
			<Slider {...settings} lazyLoad="ondemand">
				<ProductCarouselItem bgColor="blue.100" />
				<ProductCarouselItem bgColor="blue.200" />
				<ProductCarouselItem bgColor="blue.300" />
				<ProductCarouselItem bgColor="blue.400" />
				<ProductCarouselItem bgColor="blue.500" />
				<ProductCarouselItem bgColor="blue.600" />
			</Slider>
		</Box>
	);
}

export default ProductCarousel;