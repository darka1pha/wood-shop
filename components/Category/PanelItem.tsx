import { Box } from "@chakra-ui/layout";
import { useState } from "react";

interface PanelItem {
	name?: string;
}

const PanelItem = ({ name }: PanelItem) => {

	const [isActive, setIsActive] = useState(false)

	return (
		<Box
			m=".5rem"
			cursor="pointer"
			color={isActive ? "primary" : "black"}
			onClick={() => setIsActive(!isActive)}
			fontWeight={isActive ? "semibold" : "normal"}
		>
			{name}
		</Box>
	);
}

export default PanelItem;