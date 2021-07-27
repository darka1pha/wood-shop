import { Flex, Skeleton } from "@chakra-ui/react";

const UserInfoSkeleton = () => {
  return (
    <Flex
      flexWrap="wrap"
      w="100%"
      h="100vh"
      mt="5rem"
      p={{ base: "1rem", md: "85px 2rem 2rem 2rem" }}
      justifyContent="space-between"
      flexDir="column"
      dir="rtl"
    >
      <Flex p={{ base: "1rem 0", md: "2rem 0" }} w="240px">
        <Skeleton
          w="100%"
          m="1rem 1%"
          h="320px"
          borderRadius=".5rem"
        />
      </Flex>
      <Flex p="2rem" flexDir="column" w="85%">
        <Skeleton
          h="340px"
          w="100%"
          m="1rem auto"
          borderRadius=".5rem"
        />
      </Flex>
    </Flex>
  );
}

export default UserInfoSkeleton;