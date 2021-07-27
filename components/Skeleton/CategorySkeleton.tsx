import { Flex, Skeleton } from "@chakra-ui/react";

const CategorySkeleton = ({ showCategory }) => {
  return (
    <Flex
      flexWrap="wrap"
      w="100%"
      h="100vh"
      mt="5rem"
      // pt={{ base: 0, md: "85px" }}
      p={{ base: "0", md: "85px 2rem 2rem 2rem" }}
      justifyContent="space-between"
      flexDir="column"
      dir="rtl"
    >
      <Flex display={showCategory ? { base: "none", md: "flex" } : "none"} p={{ base: "1rem 0", md: "2rem 0" }} w="20%">
        <Skeleton
          w="100%"
          m="1rem 1%"
          h="320px"
          borderRadius=".5rem"
        />
      </Flex>
      <Flex p="2rem" flexDir="column" w={showCategory ? { base: "100%", md: "75%" } : "100%"}>
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
}

export default CategorySkeleton;