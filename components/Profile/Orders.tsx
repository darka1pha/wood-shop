import { Flex } from "@chakra-ui/layout";
import Text from "../Text";

const Orders = () => {
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
      p="1.5rem">
      <Text variant="heading1">Orders</Text>
    </Flex>
  );
};

export default Orders;
