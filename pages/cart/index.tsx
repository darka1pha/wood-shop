import { Flex } from "@chakra-ui/layout";
import { Text } from "../../components";
import CartDetails from "../../components/CartDetails";
import CartItem from "../../components/CartItem";

const index = () => {
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
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
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
          <CartDetails />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default index;
