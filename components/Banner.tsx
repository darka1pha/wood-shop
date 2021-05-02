import { Box, Flex } from "@chakra-ui/layout";
import Image from 'next/image'

const Banner = () => {
	return (
		<Flex
			w="100%"
			h={{base:"320px",md:"450px"}}
			p="2rem"
			justifyContent="center"
			alignItems="center"
		>
			<Flex
				bgColor="#FCC87A"
				h="100%"
				w="1280px"
				borderRadius=".5rem"
				transition="all 200ms ease-in-out"
				_hover={{
					transform:"scale(1.01)"
				}}
			>
				<Flex
					h="100%"
					w="100%"
					cursor="pointer"
					bgImage={`url('/assets/banner.png')`}
					bgRepeat="no-repeat"
					bgSize="contain"
					bgPos="center"
				/>
			</Flex>
		</Flex >
	);
}

export default Banner;