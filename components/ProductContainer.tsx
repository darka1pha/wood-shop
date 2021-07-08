import { Flex } from "@chakra-ui/layout";
import { motion } from "framer-motion";
import { Fragment, useEffect, useRef } from "react";
import Loader from "react-spinners";
import { useGetCategoryProducts } from "../API";
import { IProducts } from "../API/interfaces";
import ProductCard from "./ProductCard";

interface IProductContainer {
  currentCategoryId: number;
}

const ProductContainer = ({ currentCategoryId }: IProductContainer) => {
  const {
    data: products,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useGetCategoryProducts(currentCategoryId);

  const fetchMoreItems = () => {
    fetchNextPage();
  };

  const variants = {
    visible: {
      opacity: 1,
      transition: {
        type: "ease",
        duration: 0.6,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        type: "ease",
        duration: 0.6,
      },
    },
  };

  const isBottom = (el) => {
    return (
      el.current?.getBoundingClientRect().bottom - 20 <= window.innerHeight
    );
  };

  return (
    <Flex
      pb="2rem"
      bgColor="rebeccapurple"
      flexWrap="wrap"
      w="100%"
      justifyItems="center">
      {products?.pages.map((group, index) => (
        <Fragment key={index}>
          {group?.results.map(
            ({ id, image, name, price }: IProducts, key: number) => (
              <ProductCard
                name={name}
                price={price}
                background_image={image}
                id={id}
                margin="1rem auto"
                key={key}
              />
            )
          )}
        </Fragment>
      ))}
    </Flex>
  );
};

export default ProductContainer;
