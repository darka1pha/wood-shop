import { Box, Flex } from "@chakra-ui/layout";
import router from "next/router";
import { IBanners } from "../API/interfaces";

const Banner = ({ id, image, title }: IBanners) => {
	return (
		<Flex
			cursor="pointer"
			w="100%"
			h={{ base: "320px", md: "450px" }}
			p={{ base: "1rem", md: "2rem" }}
			justifyContent="center"
			alignItems="center"
			onClick={() => router.push({
				pathname: "/banners",
				query: {
					id
				}
			})}
		>
			<Flex
				h="100%"
				w="1280px"
				transition="all 200ms ease-in-out"
				_hover={{
					transform: "scale(1.01)"
				}}
				justifyContent="center"
			>
				<img
					style={{
						borderRadius: ".5rem",
						width: "auto",
						maxHeight: "480px",
					}}
					src={image}
					alt={title} />
			</Flex>
		</Flex >
	);
}

export default Banner;