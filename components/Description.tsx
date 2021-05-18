import { Flex } from "@chakra-ui/layout";
import Text from "./Text";

const Description = () => {
	return (
		<Flex
			w="100%"
			h={{ base: "100vh", md: "480px" }}
			padding="2rem"
			bgImage="
			linear-gradient(to left, rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0.3) ),
			url('/assets/description.webp')"
			bgSize="cover"
			bgAttachment={{ base: "unset", md: "fixed" }}
			bgRepeat="no-repeat"
			justifyContent="center"
			className="blur"
		>
			<Flex
				justifyContent="space-evenly"
				flexDir={{ base: "column-reverse", md: "row" }}
				w="100%"
				maxW="1280px"
			>
				<Flex
					w={{ base: "100%", md: "65%" }}
					h="100%"
					borderRadius=".5rem"
					className="glass"
				/>
				<Flex
					w={{ base: "100%", md: "30%" }}
					h="100%"
					ml=".5rem"
					justifyContent="center"
					alignItems="center"
				>
					<Text
						textAlign="center"
						variant="heading3"
						color="white"
						dir="rtl"
					>
						تولیدی چوب و دکوراسیون داخلی فرحبخش
				</Text>
				</Flex>
			</Flex>
		</Flex>
	);
}

export default Description;