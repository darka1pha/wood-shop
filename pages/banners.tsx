import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { useGetBannerProducts, useSearch } from "../API";
// import Filter from "../components/Filter/Filter";
// import FilterTitle from "../components/Filter/FilterTitle";
// import ProductCard from "../components/ProductCard";

const ProductCard = dynamic(
  () => {
    return import("../components/ProductCard");
  },
  {
    ssr: false,
  }
);
const FilterTitle = dynamic(
  () => {
    return import("../components/Filter/FilterTitle");
  },
  {
    ssr: false,
  }
);
// const Filter = dynamic(
//   () => {
//     return import("../components/Filter/Filter");
//   },
//   {
//     ssr: false,
//   }
// );

const Banners = () => {
  const [page, setPage] = useState<number>(0);
  const router = useRouter();
  const {
    data: products,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useGetBannerProducts(router.query.value);

  const fetchMoreItems = () => {
    const newPage = page + 1;
    setPage((prev) => prev + 1);

    fetchNextPage({ pageParam: newPage + 1 });
  };

  if (!products) return <h1>Chizi ni</h1>;
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
        justifyContent="flex-start">
        <FilterTitle
          title={`Banner Title`}
        />
        <Flex pb="2rem" flexWrap="wrap" w="100%" justifyItems="center">
          {/* {products?.pages.map((group, index) => (
            <Fragment key={index}>
              {group?.results.map(
                ({ id, name, image, price, score }, key: number) => (
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
          ))} */}
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
            <Spinner color="white" />
          ) : hasNextPage ? (
            "بیشتر"
          ) : (
            "محصولی برای بارگزاری وجود ندارد"
          )}
        </Button>
      </Flex>
    </Flex>
  );
};

export default Banners;
