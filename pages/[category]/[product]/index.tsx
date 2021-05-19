import { Flex } from "@chakra-ui/layout";
import { ColorPalette, Comment, DeliveryTime, NewComment, ProductDiscription, Text } from "../../../components";
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
			justifyContent="center"
			alignItems="center"
		>
			<Flex
				w="100%"
				maxW="1280px"
				alignItems="center"
				flexDir={{ base: "column", md: "row-reverse" }}
				justifyContent="center"
				mb="2rem"
			>
				<Flex w={{ base: "100%", md: "50%" }}>
					<ProductCarousel />
				</Flex>
				<Flex
					w={{ base: "100%", md: "auto" }}
					flexGrow={1}
					flexDir="column"
					alignItems="center"
					justifyContent="center"
				>
					<Flex
						pt={{ base: "2rem", md: "2.5rem" }}
						w="100%"
						dir="rtl"
						pr={{ base: "1rem", md: "2rem" }}
					>
						<Text fontSize={{ base: "18px", md: "32px" }} color="black" variant="heading3">
							صندلی کد 264
						</Text>
					</Flex>
					<Flex
						dir="rtl"
						alignItems="center"
						w="100%"
						pr="2rem"
						pt={{ base: ".5rem", md: 0 }}
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
							m={{ base: "1rem 0", md: "2rem 0" }}
							w={{ base: "100%", md: "60%" }}
							justifyContent="space-between"
							alignItems="center"
							p={{ base: "1rem", md: 0 }}
							mr="-1rem"
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
									outline: 0,
									bgColor: "#FF4D4D",
									opacity: 0.8
								}}
								_focus={{
									outline: 0
								}}
							>
								<Text
									variant="normal"
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
				<NewComment />
				<Comment />
			</Flex>
		</Flex>
	);
}

export default index;