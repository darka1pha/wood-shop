import { Flex } from "@chakra-ui/layout";
import { ColorPalette, Comment, DeliveryTime, ProductDiscription, Text } from "../../../components";
import ProductCarousel from "../../../components/ProductCarousel";
import { AiFillStar } from "react-icons/ai"
import Icon from "@chakra-ui/icon";
import { Button } from "@chakra-ui/button";
import { FiShoppingCart } from "react-icons/fi";

const index = () => {
	return (
		<Flex
			as="div"
			lang="fa"
			minH="100vh"
			overflowX="hidden"
			p={{ base: "80px .5rem 2rem .5rem", md: "180px 2rem 2rem 2rem" }}
			bgColor="bgColor"
			flexDir="column"
		>
			<Flex
				w="100%"
				maxW="1280px"
				alignItems="center"
				flexDir="row-reverse"
				justifyContent="center"
				mb="2rem"
			>
				<Flex w="50%">
					<ProductCarousel />
				</Flex>
				<Flex
					h="400px"
					w="auto"
					flexGrow={1}
					flexDir="column"
					alignItems="center"
					justifyContent="center"
				>
					<Flex
						pt="2.5rem"
						w="100%"
						dir="rtl"
						pr="2rem"
					>
						<Text color="black" variant="heading3">
							صندلی کد 264
						</Text>
					</Flex>
					<Flex
						dir="rtl"
						alignItems="center"
						w="100%"
						pr="2rem"
					>
						<Icon
							as={AiFillStar}
							color="#FFD331"
							fontSize={22}
						/>
						<Text
							m="0 .3rem"
							color="black"
							variant="heading7"
							h="100%"
							display="flex"
							alignItems="center"
						>
							4.6
						</Text>
					</Flex>
					<Flex
						dir="rtl"
						w="100%"
						pr="2rem"
						pt=".5rem"
						flexDir="column"
						justifyContent="flex-end"
					>
						<ColorPalette />
						<DeliveryTime />
						<Flex
							m="2rem 0"
							w="60%"
							justifyContent="space-between"
							alignItems="center"
						>
							<Button
								w="200px"
								borderRadius="2rem"
								rightIcon={<Icon as={FiShoppingCart} fontSize={22} />}
								color="white"
								variant="outline"
								bgColor="#FF4D4D"
								transition="all 400ms ease-in-out"
								_hover={{
									outline: 0,
									bgColor: "#ff5959"
								}}
								_active={{
									outline: 0
								}}
								_focus={{
									outline: 0
								}}
							>
								<Text
									variant="normal"
									mr="2"
									color="white"
								>
									سبد خرید
              </Text>
							</Button>
							<Text color="black" variant="heading5">
								650 تومان
							</Text>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
			<Flex
				w="100%"
				maxW="1280px"
				alignItems="center"
				flexDir="column"
				justifyContent="center"
			>
				<ProductDiscription />
				<Comment />
			</Flex>
		</Flex>
	);
}

export default index;