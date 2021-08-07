import { Flex } from "@chakra-ui/layout";
import { Image, Link } from "@chakra-ui/react";
import router from "next/router";
import { Text } from "..";

interface IContainerItem {
	image_url: string;
	title: string;
	id: number;
}

const ContainerItem = ({ image_url, title, id }: IContainerItem) => {
	return (
		<Flex
			pos="relative"
			h="280px"
			m=".5rem"
			borderRadius=".5rem"
			flex="1 1 360px"
			cursor="pointer"
			flexDir="column"
			overflow="hidden"
			justifyContent="center"
			alignItems="center"
			transition="all 200ms ease-in-out"
			boxShadow="md"
			_hover={{
				transform: "scale(1.02)"
			}}
			onClick={() => router.push({
				pathname: "/[category]",
				query: {
					category: title,
					id,
					order: "default"
				}
			})}
		>
			<Flex
				h="100%"
				w="100%"
				bgImage={`url(${image_url ? image_url : "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjB8fGNoYWlyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"})`}
				bgSize="cover"
				bgRepeat="no-repeat"
				bgPos="center"
			/>
			{/* <Image
				h="100%"
				w="100%"
				alt={title}
				objectFit="cover"
			/> */}
			<Flex
				h="20%"
				alignItems="center"
				justifyContent="center"
				className="glass2"
				w="100%"
				pos="absolute"
				bottom="0"
			>
				<Text
					color="white"
					variant="heading5">
					{
						title ? title : "میز"
					}
				</Text>
			</Flex>
		</Flex>
	);
}

export default ContainerItem;