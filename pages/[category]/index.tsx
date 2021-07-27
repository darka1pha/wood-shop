import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Fragment, useRef } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useGetCategories, useGetCategoryProducts } from "../../API";
import { IProducts } from "../../API/interfaces";
import { Error } from "../../components";
import CategoryMenu from "../../components/Category/CategoryMenu";
import Filter from "../../components/Filter/Filter";
import FilterTitle from "../../components/Filter/FilterTitle";
import ProductCard from "../../components/ProductCard";
import CategorySkeleton from "../../components/Skeleton/CategorySkeleton";
import { selectCurrentCategory } from "../../redux";

// const Filter = dynamic(
//   () => {
//     return import("../../components/Filter/Filter");
//   },
//   {
//     ssr: false,
//   }
// );

// const CategoryMenu = dynamic(
//   () => {
//     return import("../../components/Category/CategoryMenu");
//   },
//   {
//     ssr: false,
//   }
// );

// const FilterTitle = dynamic(
//   () => {
//     return import("../../components/Filter/FilterTitle");
//   },
//   {
//     ssr: false,
//   }
// );

// const ProductCard = dynamic(
//   () => {
//     return import("../../components/ProductCard");
//   },
//   {
//     ssr: false,
//   }
// );

const index = ({ currentCategory }) => {
  const router = useRouter();
  const [order, setOrder]: any = useState(router.query.order)
  const containerRef = useRef(null);
  const {
    data: categories,
    isLoading: isCategoryLoading,
    isError: categoriesError
  } = useGetCategories();
  const {
    data: products,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isLoading: isProductsLoading,
    isError: productsError
  } = useGetCategoryProducts({ id: currentCategory.id, ordering: order });

  if (!categories || !products || isCategoryLoading || isProductsLoading)
    return <CategorySkeleton showCategory={true} />

  if (categoriesError || productsError) return <Error />

  return (
    <Flex
      as="div"
      lang="fa"
      minH="100vh"
      overflowX="hidden"
      p={{ base: "80px .5rem 2rem .5rem", md: "160px 2rem 2rem 2rem" }}
      justifyContent="flex-end"
      bgColor="bgColor">
      <Head>
        <title>{`دسته بندی - ${router.query.category}`}</title>
        <meta name="description" content="دسته بندی و نمایش محصولات درون دسته بندی" />
        <meta name="keywords" content="خرید,فروشگاه,لوازم خانه,فروشگاه آنلاین,محصولات چوبی,میز و صندلی" />
        <meta property="og:title" content="دسته بندی" />
        <meta property="og:description" content="دسته بندی و نمایش محصولات درون دسته بندی" />
        <meta property="og:type" content="website" />
      </Head>
      <Flex
        dir="rtl"
        flexDir="column"
        mr={{ base: 0, md: "2rem" }}
        w="100%"
        justifyContent="flex-start"
        ref={containerRef}>
        <FilterTitle title={router.query.category} />
        <Filter setOrder={setOrder} />
        <Flex pb="2rem" flexWrap="wrap" w="100%" justifyItems="center">
          {products?.pages.map((group, index) => (
            <Fragment key={index}>
              {group?.results.map(
                ({ id, image, name, price, bookmarked }: IProducts, key: number) => (
                  <ProductCard
                    name={name}
                    price={price}
                    background_image={image}
                    id={id}
                    margin="1rem auto"
                    key={key}
                    bookmarked={bookmarked}
                  />
                )
              )}
            </Fragment>
          ))}
        </Flex>
        <Button
          fontFamily="Vazir"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage}
          color="white"
          variant="outline"
          transition="all 400ms ease-in-out"
          bgColor="btnBg"
          _hover={{
            bgColor: "btnHover",
          }}
          _focus={{
            outline: 0,
            bgColor: "btnBg",
          }}
          _active={{
            bgColor: "btnActive",
          }}>
          {isFetchingNextPage ? (
            <Spinner color="#fff" />
          ) : hasNextPage ? (
            "بیشتر"
          ) : (
            "محصولی برای بارگزاری وجود ندارد"
          )}
        </Button>
      </Flex>
      <Flex w="25%" h="auto" display={{ base: "none", md: "block" }}>
        <CategoryMenu
          activeIndex={categories?.findIndex(
            ({ title }) => title === router.query.category
          )}
          items={categories}
        />
      </Flex>
    </Flex>
  );
};

const mapStateToProps = createStructuredSelector({
  currentCategory: selectCurrentCategory,
});

export default connect(mapStateToProps)(index);
