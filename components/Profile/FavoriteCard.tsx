import { IconButton } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Flex } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { FiChevronLeft } from "react-icons/fi";
import { IoMdMore } from "react-icons/io";
import { Text } from "..";

const FavoriteCard = ({ onRemove }) => {
  const onWatchProduct = () => {
    alert("OnWatch Product");
  };
  return (
    <Flex
      pos="relative"
      w={{ base: "100%", md: "48%" }}
      m="1rem 1%"
      boxShadow="md"
      h="160px"
      borderRadius=".5rem"
      overflow="hidden"
      justifyContent="flex-end">
      <Flex flexDir="row-reverse" w="100%">
        <Flex h="100%" w="160px" bgColor="blackAlpha.300" />
        <Flex alignItems="flex-end" flexDir="column">
          <Flex p="1rem 2rem">
            <Text color="black" variant="normalExt">
              نام محصول
            </Text>
          </Flex>
          <Flex p="1rem 2rem">
            <Text dir="rtl" color="black" variant="normalExt">
              199,500 ریال
            </Text>
          </Flex>
          <Flex
            onClick={onWatchProduct}
            cursor="pointer"
            alignItems="center"
            p="0 2rem"
            flexDir="row-reverse">
            <Text dir="rtl" color="#47C0DF" variant="normalExt">
              مشاهده محصول
            </Text>
            <Icon color="#47C0DF" as={FiChevronLeft} />
          </Flex>
        </Flex>
      </Flex>
      <Menu>
        <MenuButton
          pos="absolute"
          left="1rem"
          top="1rem"
          as={IconButton}
          icon={<Icon fontSize="1.5rem" as={IoMdMore} cursor="pointer" />}
          _focus={{
            outline: 0,
          }}
          _hover={{
            bgColor: "transparent",
          }}
        />
        <MenuList minW="110px">
          <MenuItem
            fontFamily="iranSans"
            color="red.500"
            dir="rtl"
            _hover={{
              outline: 0,
              bgColor: "transparent",
            }}
            _focus={{
              outline: 0,
              bgColor: "transparent",
            }}
            onClick={onRemove}>
            حذف
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default FavoriteCard;
