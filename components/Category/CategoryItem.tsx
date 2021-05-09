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
}

const CategoryItem = ({ items, title }: CategoryItem) => {
	return (
		<AccordionItem
			bgColor="itemsBg"
			fontFamily="iranSans"
			fontSize="12px"
		>
			<h2>
				<AccordionButton
					dir="rtl"
					_focus={{
						border: "none"
					}}
				>
					<Box
						flex="1"
						textAlign="right"
					>
						{title}
					</Box>
					<AccordionIcon />
				</AccordionButton>
			</h2>
			<AccordionPanel dir="rtl" pb={4}>
				{
					items.map((item, key) => (
						<PanelItem key={key} name={item} />
					))
				}
			</AccordionPanel>
		</AccordionItem>
	);
}

export default CategoryItem;