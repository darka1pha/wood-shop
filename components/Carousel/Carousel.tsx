import { Box, Flex } from "@chakra-ui/layout";
import Slider from "react-slick";
import CarouselArrow from "./CarouselArrow";
import CarouselItem from "./CarouselItem";

import { Swiper, SwiperSlide } from 'swiper/react';

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
		centerMode: "true",
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		nextArrow: <CarouselArrow rotate="180" type="right" />,
		prevArrow: <CarouselArrow />,
		className: "slider"
	};

	return (
		<Box
			p={{ base: "1.5rem 0", md: "2rem 0" }}
			m="1rem"
		>
			{/* <Slider {...settings} lazyLoad="ondemand">
				<CarouselItem bgColor="red" />
				<CarouselItem bgColor="violet" />
				<CarouselItem bgColor="yellow" />
				<CarouselItem bgColor="green" />
				<CarouselItem bgColor="black" />
				{
          data.map(({ image_url, price, name }, key: number) => (
            <CarouselItem name={name} price={price} image_url={image_url} key={key} />
          ))
        }
			</Slider> */}
			<Swiper
				spaceBetween={30}
				slidesPerView={4}
				onSlideChange={() => console.log('slide change')}
				onSwiper={(swiper) => console.log(swiper)}
			>	
				<SwiperSlide>
					<CarouselItem bgColor="violet" />
				</SwiperSlide>
				<SwiperSlide>
					<CarouselItem bgColor="yellow" />
				</SwiperSlide>
				<SwiperSlide>
					<CarouselItem bgColor="blue" />
				</SwiperSlide>
				<SwiperSlide>
					<CarouselItem bgColor="black" />
				</SwiperSlide>
				<SwiperSlide>
					<CarouselItem bgColor="brown" />
				</SwiperSlide>
				<SwiperSlide>
					<CarouselItem bgColor="pink" />
				</SwiperSlide>
				<SwiperSlide>
					<CarouselItem bgColor="yellow" />
				</SwiperSlide>
			</Swiper>
		</Box>
	);
}

export default Carousel;