import { Flex, Skeleton } from "@chakra-ui/react";

const CartSkeleton = () => {
  return (
    <Flex
      w="100%"
      h="90vh"
      justifyContent="space-between"
      p="180px 2rem 0 2rem"
    >
      <Skeleton borderRadius=".5rem" h="280px" w="25%" />
      <Skeleton borderRadius=".5rem" w="70%" />
    </Flex>
  );
}

export default CartSkeleton;