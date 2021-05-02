import { Flex } from "@chakra-ui/layout";
import Text from "./Text";

const Description = () => {
	return (
		<Flex
			w="100%"
			h={{base:"100vh",md:"480px"}}
			padding="2rem"
			justifyContent="space-evenly"
			bgImage="
			linear-gradient(to left, rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0.3) ),
			url('/assets/description.webp')"
			bgSize="cover"
			bgAttachment="fixed"
			bgRepeat="no-repeat"
			flexDir={{ base: "column-reverse", md: "row" }}
			className="blur"
		>
			<Flex
				w={{base:"100%",md:"65%"}}
				h="100%"
				borderRadius=".5rem"
				className="glass"
			/>
			<Flex
				w={{base:"100%",md:"30%"}}
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
	);
}

export default Description;