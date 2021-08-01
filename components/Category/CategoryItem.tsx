import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/accordion";
import { Box } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  ISetCurrentCategory,
  selectCurrentCategory,
  setCurrentCategory,
} from "../../redux";
import PanelItem from "./PanelItem";

interface ICategories {
  title?: string;
  id?: number;
}

interface CategoryItem {
  categoryTitle?: string;
  items?: Array<ICategories>;
  background?: string;
  color?: string;
  margin?: string;
  border?: string;
  setCurrentCategory: ({ id, name }: ISetCurrentCategory) => void;
  currentCategory: any;
  categoryId: number;
}

const CategoryItem = ({
  items,
  categoryTitle,
  background = "itemsBg",
  margin = "0",
  color = "black",
  border = "auto",
  setCurrentCategory,
  currentCategory,
  categoryId,
}: CategoryItem) => {
  const router = useRouter();
  if (!items) return <h1>chizi ni</h1>;
  return (
    <AccordionItem
      bgColor={background}
      fontFamily="Vazir"
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
          <Box fontFamily="VazirMedium" flex="1" textAlign="right" color={color}>
            {categoryTitle}
          </Box>
        </AccordionButton>
      </h2>
      <AccordionPanel dir="rtl" pb={4}>
        <PanelItem
          onClick={() => {
            setCurrentCategory({ id: categoryId, name: categoryTitle });
            router.push({
              pathname: "/[category]",
              query: {
                id: categoryId,
                category: categoryTitle,
                order: "default"
              },
            });
          }}
          categoryTitle={categoryTitle}
          color={color}
          id={categoryId}
          name="همه"
          activeId={currentCategory.id}
        />
        {items.map(({ id, title }, key) => (
          <PanelItem
            categoryTitle={title}
            onClick={() => {
              setCurrentCategory({ id, name: title });
              router.push({
                pathname: "/[category]",
                query: {
                  category: title,
                  id: id,
                  order: "default",
                },
              });
            }}
            color={color}
            id={id}
            key={key}
            name={title}
            activeId={currentCategory.id}
          />
        ))}
      </AccordionPanel>
    </AccordionItem>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  setCurrentCategory: (current: ISetCurrentCategory) =>
    dispatch(setCurrentCategory(current)),
});

const mapStateToProps = createStructuredSelector({
  currentCategory: selectCurrentCategory,
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem);
