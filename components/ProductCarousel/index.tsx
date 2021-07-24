import { Box, Flex } from "@chakra-ui/layout";
import Slider from "react-slick";
import { IFullProducts } from "../../API/interfaces";
import ProductCarouselItem from "./ProductCarouselItem";
import CarouselThumb from "./CarouselThumb";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/thumbs/thumbs.min.css";
import SwiperCore, { Navigation, Thumbs } from "swiper/core";

SwiperCore.use([Navigation, Thumbs]);

interface ICarousel {
  product?: IFullProducts;
}

const ProductCarousel = ({ product }: ICarousel) => {
  const { image, images } = product;
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <Box className="swiper-container" w="100%" maxW="1920px" h="100%">
      <Swiper
        // style={{
        //   "--swiper-navigation-color": "#EF394E",
        //   "--swiper-pagination-color": "#EF394E",
        // }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        className="mySwiper2">
        <SwiperSlide>
          <ProductCarouselItem imageUrl={image} />
        </SwiperSlide>
        {images.map((imageUrl, key) => (
          <SwiperSlide>
            <ProductCarouselItem key={key} imageUrl={imageUrl} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesVisibility={true}
        watchSlidesProgress={true}
        className="mySwiper">
        <SwiperSlide>
          <CarouselThumb imageUrl={image} />
        </SwiperSlide>
        {images.map((imageUrl, key) => (
          <SwiperSlide>
            <CarouselThumb key={key} imageUrl={imageUrl} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default ProductCarousel;
