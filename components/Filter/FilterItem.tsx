import { Text } from "..";

interface FilterItem {
	type: string;
	isActive?: boolean;
	onClick?: (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>, ordering: string, type: string) => void;
	ordering?: string;
}

const FilterItem = ({ type, isActive, onClick, ordering }: FilterItem) => {
	return (
		<Text
			m="0 1rem 0 1rem"
			variant="normal"
			color={isActive ? "active" : "black"}
			cursor="pointer"
			fontWeight={isActive ? "semibold" : "normal"}
			onClick={(e) => onClick(e, ordering, type)}
		>
			{type}
		</Text>
	);
}

export default FilterItem;