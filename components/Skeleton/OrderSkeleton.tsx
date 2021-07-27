import { Flex, Skeleton } from "@chakra-ui/react";

const OrderSkeleton = () => {
  return (
    <Flex
      w="100%"
      minH="340px"
      mr={{ base: 0, md: "2rem" }}
      borderRadius=".5rem"
      border="1px solid #CFCFCF"
      justifyContent="flex-start"
      alignItems="flex-end"
      flexDir="column"
      overflow="hidden"
      p="1.5rem"
    >
      <Flex
        alignItems="center"
        pb=".5rem"
        h={{ base: "35px", md: "35px" }}
        mb="2rem">
        <Skeleton w="128px" h="45px" />
      </Flex>
      <Flex
        w="100%"
        flexDir="column"
      >
        <Flex justifyContent="center" dir="rtl" w="100%">
          <Flex justifyContent="center" w={{ base: "25%", md: "20%" }}>
            <Skeleton my="0.5rem" mx="0.5rem" mr="0" h="20px" w="100%" />
          </Flex>
          <Flex justifyContent="center" w={{ base: "25%", md: "20%" }}>
            <Skeleton m="0.5rem" h="20px" w="100%" />
          </Flex>
          <Flex justifyContent="center" w={{ base: "25%", md: "20%" }}>
            <Skeleton m="0.5rem" h="20px" w="100%" />
          </Flex>
          <Flex
            display={{ base: "none", md: "flex" }}
            justifyContent="center"
            w="20%">
            <Skeleton m="0.5rem" h="20px" w="100%" />
          </Flex>
          <Flex justifyContent="center" w={{ base: "25%", md: "20%" }}>
            <Skeleton m="0.5rem" h="20px" w="100%" />
          </Flex>
        </Flex>
        <Skeleton
          w="100%"
          m="1rem 1%"
          h="75px"
          borderRadius=".5rem"
        />
        <Skeleton
          w="100%"
          m="1rem 1%"
          h="75px"
          borderRadius=".5rem"
        />
      </Flex>
    </Flex>
  );
}

export default OrderSkeleton;