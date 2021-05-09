import Icon from "@chakra-ui/icon";
import { Flex } from "@chakra-ui/layout";
import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { BsHeart, BsHeartFill } from "react-icons/Bs"
import Text from "./Text";

interface CarouselItem {
	background_image?: string;
	price?: string;
	name?: string;
	margin?: string;
}

const ProductCard = ({ background_image, name, price, margin }: CarouselItem) => {
	const [isLiked, setIsLiked] = useState(false)
	const bgImage = background_image ? background_image : "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fHRhYmxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"

	return (

		<Flex
			borderRadius=".5rem"
			overflow="hidden"
			flexDir="column"
			h={{ base: "315px", md: "360px" }}
			w={{ base: "210px", md: "240px" }}
			m={margin}
			cursor="pointer"
			boxShadow="md"
			transition="all 200ms ease-in-out"
			_hover={{
				transform: "scale(1.02)"
			}}
		>
			<Flex
				h="75%"
				w="100%"
				cursor="pointer"
				bgImage={`url(${bgImage})`}
				bgRepeat="no-repeat"
				bgSize="cover"
				borderRadius=".5rem .5rem 0 0 / .5rem .5rem 0 0"
			/>
			<Flex
				flexDir="column"
				padding=".5rem"
				justifyContent="center"
				alignItems="center"
			>
				<Text
					m=".1rem"
					color="black"
					variant="normal"
					dir="rtl"
				>
					میز چهارپایه MDF
				</Text>
				<Text m=".1rem" color="black" variant="normalThin">
					750.000
				</Text>
				<Flex
					w="25%"
					m=".1rem"
					justifyContent="space-evenly"
				>
					<Icon
						as={FiShoppingCart}
						color="black"
					/>
					<Icon
						onClick={() => setIsLiked(!isLiked)}
						as={!isLiked ? BsHeart : BsHeartFill}
						color="red"
					/>
				</Flex>
			</Flex>
		</Flex>
	);
}

export default ProductCard;