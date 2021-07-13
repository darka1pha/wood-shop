import { Flex } from "@chakra-ui/layout";
import dynamic from "next/dynamic";
import { Fragment, useEffect } from "react";
import { useGetCart, useGetCartInfo } from "../../API";
import { Text } from "../../components";

const CartItem = dynamic(
  () => {
    return import("../../components/CartItem");
  },
  {
    ssr: false,
  }
);

const CartDetails = dynamic(
  () => {
    return import("../../components/CartDetails");
  },
  {
    ssr: false,
  }
);

const index = () => {
  const { data: products } = useGetCart();
  const { data: cartInfo } = useGetCartInfo();

  useEffect(() => {
    console.log("CART DATA: ", cartInfo);
  }, [products, cartInfo]);

  if (!products && !cartInfo) return <h1>Chizi ni</h1>;

  return (
    <Flex
      as="div"
      lang="fa"
      minH="100vh"
      overflowX="hidden"
      p={{ base: "80px .5rem 2rem .5rem", md: "180px 2rem 2rem 2rem" }}
      bgColor="bgColor"
      flexDir="column"
      justifyContent="center"
      alignItems="center">
      <Flex
        w="100%"
        maxW="1920px"
        flexDir={{ base: "column", md: "row-reverse" }}
        mb="2rem"
        minH="70vh">
        <Flex
          bgColor="white"
          p={{ base: ".5rem", md: "1rem" }}
          borderRadius=".5rem"
          boxShadow="lg"
          border="1px solid #e6e6e6"
          ml={{ base: 0, md: "2rem" }}
          w="100%"
          h="100%"
          flexDir="column"
          dir="rtl">
          <Flex
            mb="1rem"
            w="100px"
            alignItems="center"
            flexDir="column"
            p="1rem">
            <Text whiteSpace="nowrap" variant="heading5">
              سبد خرید
            </Text>
            <Flex mt=".5rem" w="85px" h="2px" bgColor="#EF394E" />
          </Flex>
          {products?.pages.map((group, index) => (
            <Fragment key={index}>
              {group?.results.map(
                ({ count, id, product, form }, key: number) => (
                  <CartItem count={count} id={id} product={product} key={key} />
                )
              )}
            </Fragment>
          ))}
        </Flex>
        <Flex
          boxShadow="lg"
          border="1px solid #e6e6e6"
          p="1rem"
          w={{ base: "100%", md: "420px" }}
          bgColor="white"
          borderRadius=".5rem"
          justifyContent="center"
          alignItems="center"
          flexDir="column"
          h="240px"
          mt={{ base: "1rem", md: 0 }}>
          <CartDetails
            total_cost={cartInfo?.total_cost}
            total_off={cartInfo?.total_off}
            final_cost={cartInfo?.final_cost}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default index;
