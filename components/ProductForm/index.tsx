import { Flex } from "@chakra-ui/layout";
import { Collapse, Icon, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Text from "../Text";
import FormItem from "./FormItem";

const Description = ({ productForm }) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });
  console.log(Object.keys(productForm).map((name, index) => console.log("Key:", name, "index ", index)))

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
        <Text variant="heading5">مشخصات</Text>
      </Flex>
      <Collapse in={isOpen}>
        {
          productForm && Object.keys(productForm).map((name, index) => (
            <FormItem name={name} value={productForm[name]} index={index} />
          ))
        }
      </Collapse>
    </Flex>
  );
}

export default Description;