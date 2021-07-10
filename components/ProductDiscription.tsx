import { Button, Collapse, Flex, Icon, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Text from "./Text";

const ProductDiscription = ({ description }) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });

  return (
    <Flex
      flexDir="column"
      h="100%"
      w="100%"
      dir="rtl"
      m="1rem 0"
      pr={{ base: "1rem", md: 0 }}>
      <Flex alignItems="center">
        <Icon
          border="2px solid #939393"
          h="20px"
          ml=".5rem"
          borderRadius=".3rem"
          w="20px"
          onClick={onToggle}
          as={!isOpen ? AiOutlinePlus : AiOutlineMinus}
          color="black"
          cursor="pointer"
        />
        <Text variant="heading5">توضیحات</Text>
      </Flex>
      <Collapse in={isOpen}>
        <Text p=".5rem 2rem" color="black" variant="normalExt">
          {description}
        </Text>
      </Collapse>
    </Flex>
  );
};

export default ProductDiscription;
