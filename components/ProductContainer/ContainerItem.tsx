import { Flex } from "@chakra-ui/layout";
import { Text } from "..";

interface IContainerItem {
	image_url?: string;
	title?: string;
}

const ContainerItem = ({ image_url, title }: IContainerItem) => {
	return (
		<Flex
			pos="relative"
			h="280px"
			m=".5rem"
			borderRadius=".5rem"
			flex="1 1 340px"
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
		>
			<Flex
				h="100%"
				w="100%"
				bgImage={`url(${image_url ? image_url : "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjB8fGNoYWlyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"})`}
				bgSize="cover"
				bgRepeat="no-repeat"
				bgPos="center"
			/>
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