import {
	Accordion
} from "@chakra-ui/react"
import CategoryItem from "./CategoryItem"

interface ICatItem {
	title?: string;
	items?: Array<string>;
	background?: string;
	color?: string;
	itemsMargin?: string;
	containerMargin?: string;
	defaultIndex?: boolean;
	itemsBorder?: string;
}
const CategoryMenu = ({
	background,
	color,
	itemsMargin,
	items,
	containerMargin = "0",
	defaultIndex = true,
	itemsBorder
}: ICatItem) => {
	const testItems = ["ایتم 1", "ایتم 2"]
	return (
		<Accordion
			borderRadius=".5rem"
			overflow="hidden"
			w="100%"
			defaultIndex={defaultIndex ? [0] : null}
			m={containerMargin}
			allowToggle
		>
			<CategoryItem
				items={testItems}
				title="صندلی"
				background={background}
				color={color}
				margin={itemsMargin}
				border={itemsBorder}
			/>
			<CategoryItem
				items={testItems}
				title="میز"
				background={background}
				color={color}
				margin={itemsMargin}
				border={itemsBorder}
			/>
			<CategoryItem
				items={testItems}
				title="قفسه"
				background={background}
				color={color}
				margin={itemsMargin}
				border={itemsBorder}
			/>
		</Accordion>
	);
}

export default CategoryMenu;