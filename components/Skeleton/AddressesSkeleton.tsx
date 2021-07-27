import { Flex, Skeleton } from "@chakra-ui/react";

const AddressesSkeleton = () => {
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
        <Skeleton
          w="100%"
          m="1rem 1%"
          h="160px"
          borderRadius=".5rem"
        />
        <Skeleton
          w="100%"
          m="1rem 1%"
          h="80px"
          borderRadius=".5rem"
        />
      </Flex>
    </Flex>
  );
}

export default AddressesSkeleton;