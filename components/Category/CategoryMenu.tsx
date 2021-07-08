import { Accordion } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import CategoryItem from "./CategoryItem";

interface ICategories {
  title?: string;
  id?: number;
  category_set: Array<{
    title?: string;
    id?: number;
  }>;
}

interface ICatItem {
  title?: string;
  items?: Array<ICategories>;
  background?: string;
  color?: string;
  itemsMargin?: string;
  containerMargin?: string;
  defaultIndex?: boolean;
  itemsBorder?: string;
  activeIndex?: number;
}

const CategoryMenu = ({
  background,
  color,
  itemsMargin,
  items,
  containerMargin = "0",
  defaultIndex = true,
  itemsBorder,
  activeIndex,
}: ICatItem) => {
  const router = useRouter();
  useEffect(() => {
    console.log("Active Index: ", activeIndex);
  }, []);
  if (!items) return <h1>chizi ni</h1>;

  return (
    <Accordion
      borderRadius=".5rem"
      overflow="hidden"
      w="100%"
      defaultIndex={defaultIndex ? [activeIndex] : null}
      m={containerMargin}
      allowToggle>
      {items.map(({ title, id, category_set }, key) => (
        <CategoryItem
          items={category_set}
          categoryTitle={title}
          background={background}
          color={color}
          margin={itemsMargin}
          border={itemsBorder}
          key={key}
          categoryId={id}
        />
      ))}
    </Accordion>
  );
};

export default CategoryMenu;
