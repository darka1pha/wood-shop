import {
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel
} from "@chakra-ui/accordion";
import { Box } from "@chakra-ui/layout";
import PanelItem from "./PanelItem";

interface CategoryItem {
	title?: string;
	items?: Array<string>;
	background?: string;
	color?: string;
	margin?: string;
	border?: string;
}

const CategoryItem = ({
	items,
	title,
	background = "itemsBg",
	margin = "0",
	color = "black",
	border = "auto"
}: CategoryItem) => {
	return (
		<AccordionItem
			bgColor={background}
			fontFamily="iranSans"
			fontSize="12px"
			m={margin}
			color={color}
			border={border}
		>
			<h2>
				<AccordionButton
					dir="rtl"
					_focus={{
						border: "none"
					}}
				>
					<AccordionIcon ml=".5rem" />
					<Box
						flex="1"
						textAlign="right"
						color={color}
					>
						{title}
					</Box>
				</AccordionButton>
			</h2>
			<AccordionPanel dir="rtl" pb={4}>
				{
					items.map((item, key) => (
						<PanelItem color={color} key={key} name={item} />
					))
				}
			</AccordionPanel>
		</AccordionItem>
	);
}

export default CategoryItem;