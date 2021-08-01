import { Box, Flex } from "@chakra-ui/layout";
import ProductCard from "../ProductCard";


import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
	Pagination, Navigation, Thumbs
} from 'swiper/core';

import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"

SwiperCore.use([Pagination, Navigation, Thumbs]);


interface IProductCard {
	name?: string;
	id: number,
	image: string;
	price: number;
	bookmarked: boolean;
	form: Object;
}

interface ICarousel {
	title?: string;
	data?: Array<IProductCard>;
	tempUrl?: string;
}

const Carousel = ({ data, title }: ICarousel) => {

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
					fontFamily="Vazir"
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
					maxW="1920px"
				>
					<Swiper
						navigation={true}
						slidesPerView={'auto'}
						spaceBetween={30}
						className="mainSwiper"
						pagination={true}
					>
						{
							data?.map(({
								name,
								id,
								image,
								price,
								bookmarked
							}, key: number) => (
								<>
									<SwiperSlide>
										<ProductCard
											bookmarked={bookmarked}
											key={key}
											price={price}
											name={name}
											id={id}
											margin=".8rem"
											background_image={image}
										/>
									</SwiperSlide>
								</>
							))
						}
					</Swiper>
				</Box>
			</Flex>
		</Flex>
	);
}

export default Carousel;