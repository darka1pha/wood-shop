import { Flex, Skeleton } from "@chakra-ui/react";

const LandingSkeleton = () => {
  return (
    <Flex
      flexWrap="wrap" w="100%"
      h="100vh"
      mt="5rem"
      p="85px"
    >
      <Skeleton m="1rem" flex="1 1 360px" height="280px" />
      <Skeleton m="1rem" flex="1 1 360px" height="280px" />
      <Skeleton m="1rem" flex="1 1 360px" height="280px" />
      <Skeleton m="1rem" flex="1 1 360px" height="280px" />
      <Skeleton m="1rem" flex="1 1 360px" height="280px" />
    </Flex>
  );
}

export default LandingSkeleton;