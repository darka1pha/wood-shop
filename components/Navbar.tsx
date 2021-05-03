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
import { FaTimes } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import Text from "./Text";
import { useState } from "react";
import { motion } from "framer-motion";

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Flex
        bgColor="primary"
        direction="row-reverse"
        pt="6"
        pl="4"
        pb="6"
        pr="4"
        justify="space-between"
        position="fixed"
        top="0"
        left="0"
        w="100%"
        zIndex="100"
      >
        <Text
          display={{ base: "none", md: "block" }}
          variant="heading4"
          color="white"
        >
          مصنوعات چوبی فرحبخش
      </Text>
        <IconButton
          display={{ base: "block", md: "none" }}
          variant="none"
          aria-label="Search"
          icon={<Icon fontSize="1.5rem" as={isOpen ? FaTimes : AiOutlineMenu} color="white" />}
          onClick={() => setIsOpen(!isOpen)}
          _focus={{
            borderColor: "transparent",
          }}
          _active={{
            borderColor: "transparent",
          }}
        />
        <Box
          flex={1}
          mr="8"
          ml="8"
          dir="rtl"
        >
          <InputGroup
            alignItems="center"
            display={{ base: "none", md: "block" }}
          >
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
      <motion.div
        style={{
          width: "100%",
          height: "100vh",
          zIndex: 99,
          position: "fixed",
          left: "0",
          top: 0,
          backgroundColor: "#AE4600",
        }}
        animate={{
          left: isOpen ? "0" : "100%",
          opacity: isOpen ? 1 : 0
        }}
        transition={{
          type: "tween",
          delay: .02,
        }}>

      </motion.div>
    </>
  );
};

export default Navbar;
