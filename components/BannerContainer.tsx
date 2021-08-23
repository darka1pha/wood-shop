import {Flex} from "@chakra-ui/react"
import Banner from "./Banner"

import {Swiper, SwiperSlide} from "swiper/react"
import SwiperCore, {Pagination, Navigation, Lazy, Autoplay} from "swiper/core"

SwiperCore.use([Lazy, Pagination, Navigation, Autoplay])

const BannerContainer = ({data}) => {
	console.log("BANNERS: ", data)
	return (
		<Flex w='100%' h='450px'>
			<Swiper
				className='mainSwiper'
				style={{
					height: "100%",
				}}
				slidesPerView={1}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false,
				}}
				loop={true}
				navigation={true}
				lazy={true}
				pagination={true}>
				{data.map(({id, image, title, url}, key: number) => (
					<SwiperSlide key={key}>
						<Banner url={url} id={id} image={image} title={title} />
					</SwiperSlide>
				))}
			</Swiper>
		</Flex>
	)
}

export default BannerContainer
