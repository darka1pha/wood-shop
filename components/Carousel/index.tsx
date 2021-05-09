import { Box, Flex } from "@chakra-ui/layout";
import Slider from "react-slick";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";
import ProductCard from "../ProductCard";

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

const Carousel = ({ data, title, tempUrl }: ICarousel) => {
	var settings = {
		dots: true,
		variableWidth: true,
		centerMode: true,
		initialSlide: 0,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
		className: "slider variable-width",
		infinite: true,
	};

	return (
		<Flex
			w="100%"
			justifyContent="center"
			overflow="hidden"
			p={{ md: "2rem" }}
			flexDir="column"
		>
			<Flex
				className="wrap"
				justifyContent="center"
				position="relative"
			>
				<Box
					p=".5rem 2rem"
					boxShadow="sm"
					bgColor="white"
					position="absolute"
					right="15%"
					top="0"
					borderRadius="2rem"
					fontFamily="iranSans"
				>
					{title}
				</Box>
			</Flex>
			<Flex
				w="100%"
				h="100%"
				alignItems="center"
				justifyContent="center"
			>
				<Box
					w="100%"
					maxW="1280px"
				>
					<Slider {...settings} lazyLoad="ondemand">
						<ProductCard margin=".5rem" background_image={tempUrl} />
						<ProductCard margin=".5rem" background_image={tempUrl} />
						<ProductCard margin=".5rem" background_image={tempUrl} />
						<ProductCard margin=".5rem" background_image={tempUrl} />
						<ProductCard margin=".5rem" background_image={tempUrl} />
						<ProductCard margin=".5rem" background_image={tempUrl} />
						<ProductCard margin=".5rem" background_image={tempUrl} />
					</Slider>
				</Box>
			</Flex>
		</Flex>
	);
}

export default Carousel;