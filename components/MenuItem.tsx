import {
	Flex,
	Icon,
	IconButton,

} from "@chakra-ui/react";
import { BiChair } from "react-icons/bi";
import Text from "./Text";

interface MenuItem {
	text: string;
}

const MenuItem = ({ text }: MenuItem) => {
	return (
		<Flex
			p="0 1rem"
			color="white"
			direction="row-reverse"
			alignItems="center"
			borderLeft="0.5px solid #FFFFFF"
			justifyContent="flex-start"
			cursor="pointer"
		>

			<Icon
				as={BiChair}
				color="white"
				ml=".5rem"
			/>
			<Text
				variant="normal"
			>
				{text}
			</Text>
		</Flex>
	);
}

export default MenuItem;