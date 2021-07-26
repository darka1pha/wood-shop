import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { Fragment, useRef } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useGetCategories, useGetCategoryProducts } from "../../API";
import { IProducts } from "../../API/interfaces";
import CategoryMenu from "../../components/Category/CategoryMenu";
import Filter from "../../components/Filter/Filter";
import FilterTitle from "../../components/Filter/FilterTitle";
import ProductCard from "../../components/ProductCard";
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
  const { data: categories } = useGetCategories();
  const {
    data: products,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useGetCategoryProducts({ id: currentCategory.id, ordering: order });

  const fetchMoreItems = () => {
    fetchNextPage();
  };

  if (!categories || !products)
    return (
      <Flex
        flexWrap="wrap"
        w="100%"
        h="100vh"
        mt="5rem"
        p="85px"
        justifyContent="space-between"
        flexDir="column"
        dir="rtl"
      >
        <Flex p="2rem 0" w="20%">
          <Skeleton
            w="100%"
            m="1rem 1%"
            h="320px"
            borderRadius=".5rem"
          />
        </Flex>
        <Flex p="2rem" flexDir="column" w="75%">
          <Skeleton
            w="100%"
            m="1rem 1%"
            h="60px"
            borderRadius=".5rem"
          />
          <Flex w="100%" flexWrap="wrap">
            <Skeleton
              h={{ base: "240px", md: "360px" }}
              w={{ base: "160px", md: "240px" }}
              m="1rem auto"
              borderRadius=".5rem"
            />
            <Skeleton
              h={{ base: "240px", md: "360px" }}
              w={{ base: "160px", md: "240px" }}
              m="1rem auto"
              borderRadius=".5rem"
            />
            <Skeleton
              h={{ base: "240px", md: "360px" }}
              w={{ base: "160px", md: "240px" }}
              m="1rem auto"
              borderRadius=".5rem"
            />
            <Skeleton
              h={{ base: "240px", md: "360px" }}
              w={{ base: "160px", md: "240px" }}
              m="1rem auto"
              borderRadius=".5rem"
            />
            <Skeleton
              h={{ base: "240px", md: "360px" }}
              w={{ base: "160px", md: "240px" }}
              m="1rem auto"
              borderRadius=".5rem"
            />
            <Skeleton
              h={{ base: "240px", md: "360px" }}
              w={{ base: "160px", md: "240px" }}
              m="1rem auto"
              borderRadius=".5rem"
            />
          </Flex>
        </Flex>

      </Flex>
    );

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
        <title>Wood Shop</title>
        <link rel="icon" href="/favicon.ico" />
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
          onClick={fetchMoreItems}
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
