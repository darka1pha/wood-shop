import {
  Flex,
  Button,
  Icon,
  Box,
  IconButton,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
} from "@chakra-ui/react";
import { FiUser, FiShoppingCart, FiSearch } from "react-icons/fi";

import Text from "./Text";

const Navbar = () => {
  return (
    <Flex
      bgColor="primary"
      direction="row-reverse"
      pt="6"
      pl="4"
      pb="6"
      pr="4"
      justify="space-between"
    >
      <Text variant="heading4" color="white">
        مصنوعات چوبی فرحبخش
      </Text>
      <Box flex={1} mr="8" ml="8" dir="rtl">
        <InputGroup alignItems="center">
          <InputLeftElement
            alignItems="center"
            pointerEvents="none"
            children={undefined}
          />
          <Input
            bg="white"
            placeholder="جستجو"
            color="black"
            fontFamily="VazirMedium"
            mr="2"
            _focus={{
              borderColor: "transparent",
            }}
          />
          <InputRightElement alignItems="center">
            <IconButton
              aria-label="Search"
              icon={<Icon as={FiSearch} color="black" />}
              onClick={() => alert("Search")}
            />
          </InputRightElement>
        </InputGroup>
      </Box>
      <Box>
        <IconButton
          aria-label="Shoping Cart"
          icon={<Icon as={FiShoppingCart} color="white" fontSize={22} />}
          variant="ghost"
          mr="8"
          _hover={{
            bg: "transparent",
          }}
          _active={{
            bg: "transparent",
          }}
          _focus={{
            outline: "none"
          }}
          onClick={() => alert("Shoping Cart")}
        />
        <Button
          rightIcon={<Icon as={FiUser} fontSize={22} />}
          color="white"
          variant="outline"
          _hover={{
            bg: "transparent",
          }}
          _active={{
            bg: "transparent",
          }}
          onClick={() => alert("User Profile")}
        >
          <Text variant="normalLight" mr="2">
            حساب کاربری
          </Text>
        </Button>
      </Box>
    </Flex>
  );
};

export default Navbar;
