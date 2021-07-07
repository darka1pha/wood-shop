import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/accordion";
import { Box } from "@chakra-ui/layout";
import PanelItem from "./PanelItem";

interface ICategories {
  title?: string;
  id?: number;
}

interface CategoryItem {
  title?: string;
  items?: Array<ICategories>;
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
  border = "auto",
}: CategoryItem) => {
  if (!items) return <h1>chizi ni</h1>;
  return (
    <AccordionItem
      bgColor={background}
      fontFamily="iranSans"
      fontSize="12px"
      m={margin}
      color={color}
      border={border}>
      <h2>
        <AccordionButton
          dir="rtl"
          _focus={{
            border: "none",
          }}>
          <AccordionIcon ml=".5rem" />
          <Box flex="1" textAlign="right" color={color}>
            {title}
          </Box>
        </AccordionButton>
      </h2>
      <AccordionPanel dir="rtl" pb={4}>
        {items.map(({ id, title }, key) => (
          <PanelItem color={color} id={id} key={key} name={title} />
        ))}
      </AccordionPanel>
    </AccordionItem>
  );
};

export default CategoryItem;
