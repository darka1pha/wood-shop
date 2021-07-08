import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { SyncLoader } from "react-spinners";
import { createStructuredSelector } from "reselect";
import { useGetCategories, useGetCategoryProducts } from "../../API";
import { IProducts } from "../../API/interfaces";
import CategoryMenu from "../../components/Category/CategoryMenu";
import Filter from "../../components/Filter/Filter";
import FilterTitle from "../../components/Filter/FilterTitle";
import ProductCard from "../../components/ProductCard";
import { selectCurrentCategory } from "../../redux";

const index = ({ currentCategory }) => {
  const router = useRouter();
  const containerRef = useRef(null);
  const { data: categories } = useGetCategories();
  const {
    data: products,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useGetCategoryProducts(currentCategory.id);

  const fetchMoreItems = () => {
    fetchNextPage();
  };

  // const isBottom = (el) => {
  //   console.log(
  //     "getBoundingClientRect().bottom",
  //     el.current?.getBoundingClientRect().bottom - 60
  //   );
  //   console.log("window.innerHeight ", window.innerHeight);
  //   return el.current?.getBoundingClientRect().bottom <= window.innerHeight;
  // };

  // useEffect(() => {
  //   if (containerRef) {
  //     console.log("isBottom ? ", isBottom(containerRef));
  //     if (isBottom) {
  //       fetchMoreItems();
  //     }
  //   }
  //   const trackScrolling = () => {
  //     if (containerRef) {
  //       if (isBottom(containerRef)) {
  //         if (hasNextPage) {
  //           fetchMoreItems();
  //           document.removeEventListener("scroll", trackScrolling);
  //         }
  //       }
  //     }
  //   };
  //   document.addEventListener("scroll", trackScrolling);
  //   return () => {
  //     document.removeEventListener("scroll", trackScrolling);
  //   };
  // }, [containerRef, isBottom(containerRef)]);

  if (!categories) return <h1>chizi ni</h1>;

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
        <Filter />
        <Flex pb="2rem" flexWrap="wrap" w="100%" justifyItems="center">
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
        <Button
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
            <SyncLoader color="#fff" size={5} />
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
