import { Flex } from "@chakra-ui/react";

const FormItem = ({ name, value, index }) => {
  return (
    <Flex h="45px" w="100%">
      <Flex
        alignItems="center"
        pr="0.5rem"
        fontFamily="VazirMedium"
        fontSize="14px"
        bgColor={index % 2 === 0 ? "#f8f8f8" : "#ececec"}
        m="0.5"
        flex="1"
      >
        {
          name
        }
      </Flex>
      <Flex
        pr="0.5rem"
        alignItems="center"
        fontFamily="VazirMedium"
        fontSize="14px"
        bgColor={index % 2 === 0 ? "#f8f8f8" : "#ececec"}
        m="0.5"
        flex="1"
      >
        {
          value
        }
      </Flex>
    </Flex>
  );
}

export default FormItem;