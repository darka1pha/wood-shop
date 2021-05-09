import { EventHandler } from "react";
import { Text } from "..";

interface FilterItem {
	type: string;
	isActive?: boolean;
	onClick?: (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => void;
}

const FilterItem = ({ type, isActive, onClick }: FilterItem) => {
	return (
		<Text
			m="0 1rem 0 1rem"
			variant="normal"
			color={isActive ? "primary" : "black"}
			cursor="pointer"
			fontWeight={isActive ? "semibold" : "normal"}
			onClick={onClick}
		>
			{type}
		</Text>
	);
}

export default FilterItem;