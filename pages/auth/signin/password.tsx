import { Button } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/input";
import { Flex } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Text } from "../../../components";

const password = () => {
	const [show, setShow] = useState(false)
	const router = useRouter()
	return (
		<Flex
			minH="100vh"
			w="100%"
			alignItems="center"
			justifyContent="center"
			p={{ base: "80px .5rem 2rem .5rem", md: "180px 2rem 2rem 2rem" }}
			pos="relative"
		>
			<Flex
				w="100%"
				h="100%"
				pos="absolute"
				top="0"
				left="0"
				zIndex="-1"
				bgRepeat="no-repeat"
				bgSize="cover"
				className="blur"
				bgImage="url('/assets/authbg.webp')"
			/>
			<Flex
				w="100%"
				maxW="1920px"
				h="100%"
				alignItems="center"
				justifyContent="center"
			>
				<Flex
					bgColor="white"
					borderRadius=".5rem"
					h="420px"
					w="420px"
					alignItems="center"
					flexDir="column"
				>
					<Flex
						p="2rem 4rem 1.5rem 4rem"
						borderBottom="1px solid #ededed"
					>
						<Text variant="heading5">
							ورود به حساب کاربری
						</Text>
					</Flex>
					<Flex w="240px" alignItems="center" flexDir="column" m="1rem" as="form">
						<Flex w="100%" dir="rtl" flexDir="column" mb="1rem" mt="1rem">
							<Text mb=".2rem" mr=".5rem" color="black" variant="normal">
								شماره تلفن
							</Text>
							<Input
								type="number"
								h="35px" />
						</Flex>
						<Flex w="100%" dir="rtl" flexDir="column">
							<Text mb=".2rem" mr=".5rem" color="black" variant="normal">
								رمز عبور
							</Text>
							<InputGroup dir="ltr">
								<InputLeftAddon
									cursor="pointer"
									onClick={() => setShow(!show)}
									children={
										<Icon
											as={!show ? AiOutlineEyeInvisible : AiOutlineEye}
										/>}
									h="35px" />
								<Input
									type={show ? "text" : "password"}
									dir="rtl"
									h="35px"
								/>
							</InputGroup>
							<Text
								color="#383838"
								variant="heading8"
								cursor="pointer"
								mt=".5rem"
							>
								رمز عبور خود را فراموش کرده اید؟
							</Text>
							<Text
								color="#348541"
								variant="heading8"
								cursor="pointer"
								mt=".5rem"
								onClick={() => router.push("/auth/signin")}
							>
								ورود با کد پیامکی
							</Text>
						</Flex>
						<Flex
							w="100%"
							dir="rtl"
							flexDir="column"
							m="1rem 0 0 0"
						>
							<Button
								fontFamily="iranSans"
								fontSize="16px"
								mb=".5rem"
								bgColor="#348541"
								color="white"
								_hover={{
									bgColor: "#2f783a"
								}}
								_focus={{
									outline: 0,
									bgColor: "#348541"
								}}
								_active={{
									bgColor: "#286632"
								}}

							>
								ورود
							</Button>
							<Button
								fontFamily="iranSans"
								fontSize="16px"
								_focus={{
									outline: 0,
								}}
							>
								ثبت نام
							</Button>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
}

export default password;