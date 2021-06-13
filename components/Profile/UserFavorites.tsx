import { Flex } from "@chakra-ui/layout";
import Text from "../Text";
import ProductContainer from "../../components/ProductContainer";

const UserFavorites = () => {
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
      <Flex
        alignItems="center"
        pb=".5rem"
        borderBottom="2px solid #0E668B"
        h={{ base: "35px", md: "35px" }}
        mb="2rem">
        <Text variant="heading5">علاقه مندی ها</Text>
      </Flex>
      <Flex
        mb="2rem"
        mt="1rem"
        h="45%"
        w="100%"
        flexDir={{ base: "column", md: "row" }}>
        <ProductContainer />
      </Flex>
    </Flex>
  );
};

export default UserFavorites;
