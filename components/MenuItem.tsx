import {
	Button,
	Flex,
	Icon,
} from "@chakra-ui/react";
import { BiChair } from "react-icons/bi";
import Text from "./Text";

interface MenuItem {
	text: string;
}

const MenuItem = ({ text }: MenuItem) => {
	return (
		<Button
			p="0 1rem"
			color="white"
			dir="rtl"
			border="none"
			display="flex"
			borderRadius="0"
			alignItems="center"
			borderLeft="0.5px solid #FFFFFF"
			justifyContent="flex-start"
			_hover={{
				bg: "transparent",
			}}
			_active={{
				bg: "transparent",
			}}
			_focus={{
				outline: "none"
			}}
			variant="ghost"
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
		</Button>
	);
}

export default MenuItem;