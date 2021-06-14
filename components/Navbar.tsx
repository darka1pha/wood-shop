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
  InputLeftAddon,
} from "@chakra-ui/react";
import { FiUser, FiShoppingCart, FiSearch } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import Text from "./Text";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import CategoryMenu from "./Category/CategoryMenu";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const btnSearchRef = useRef(null);
  const searchRefMd = useRef(null);
  const searchRefBase = useRef(null);

  let condition = false;

  const [isOpen, setIsOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const onSearchCliked = () => {
    if (!isSearchOpen) {
      setIsSearchOpen(true);
      searchRefMd.current.focus();
    } else {
      router.push({
        pathname: "/search",
        query: {
          value: searchValue,
        },
      });
    }
  };

  const onSearchValueChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchValue(e.target.value);

  useEffect(() => {
    function handleClickOutside(event: { target: any; button: number }) {
      if (
        btnSearchRef.current &&
        !btnSearchRef.current.contains(event.target)
      ) {
        if (event.button === 0) {
          setIsSearchActive(false);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [btnSearchRef]);

  const variants = {
    visible: {
      opacity: 1,
      left: 0,
      transition: {
        ease: "easeInOut",
        duration: 0.4,
      },
    },
    hidden: {
      type: "spring",
      opacity: 0,
      left: "100%",
      display: "none",
      transition: {
        duration: 0.4,
        display: {
          delay: 0.4,
        },
      },
    },
  };

  const SearchVariants = {
    active: {
      width: "100%",
      borderRadius: ".5rem",
      paddingRight: "3rem",
      transition: {
        ease: "easeInOut",
        duration: 0.4,
      },
    },
    hidden: {
      width: 0,
      borderRadius: "2rem",
      paddingRight: "0",
      transition: {
        ease: "easeInOut",
        duration: 0.4,
        paddingRight: {
          delay: 0.4,
        },
        borderRadius: {
          delay: 0.1,
        },
      },
    },
  };

  return (
    <>
      <Flex
        bgColor="primary"
        direction="row-reverse"
        pt={{ base: "4", md: "6" }}
        pl="4"
        pb={{ base: "4", md: "6" }}
        pr="4"
        justify="space-between"
        position="fixed"
        top="0"
        left="0"
        w="100%"
        zIndex="100">
        <IconButton
          display={{ base: "block", md: "none" }}
          variant="none"
          aria-label="Search"
          icon={
            <Icon
              fontSize="1.5rem"
              as={isOpen ? FaTimes : AiOutlineMenu}
              color="white"
            />
          }
          onClick={() => setIsOpen(!isOpen)}
          _focus={{
            borderColor: "transparent",
          }}
          _active={{
            borderColor: "transparent",
          }}
        />
        <Text
          w={{ base: "100%", md: "auto" }}
          variant="heading4"
          color="white"
          textAlign="center"
          pl="40px"
          fontSize={{ base: "20px", md: "24px" }}
          m="auto"
          cursor="pointer"
          onClick={() => {
            setIsOpen(false);
            router.push("/");
          }}>
          مصنوعات چوبی فرحبخش
        </Text>
        <Box
          flex={1}
          mr="8"
          ml="8"
          dir="rtl"
          display={{ base: "none", md: "block" }}>
          <InputGroup alignItems="center">
            <motion.input
              ref={searchRefMd}
              style={{
                height: "40px",
                fontFamily: "iranSans",
              }}
              value={searchValue}
              onChange={onSearchValueChanged}
              initial="hidden"
              placeholder="جستجو..."
              variants={SearchVariants}
              animate={isSearchOpen ? "active" : "hidden"}
              onBlur={() =>
                !condition ? setIsSearchOpen(false) : (condition = false)
              }
            />
            <InputRightElement alignItems="center">
              <IconButton
                onClick={onSearchCliked}
                onMouseDown={() => (condition = true)}
                borderRadius={isSearchOpen ? ".5rem" : "2rem"}
                _focus={{
                  outline: 0,
                }}
                aria-label="Search"
                icon={<Icon as={FiSearch} color="black" />}
              />
            </InputRightElement>
          </InputGroup>
        </Box>
        <Box display={{ base: "none", md: "block" }}>
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
              outline: "none",
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
            onClick={() => router.push("/auth/signin")}>
            <Text variant="normalLight" mr="2">
              حساب کاربری
            </Text>
          </Button>
        </Box>
      </Flex>
      <motion.div
        style={{
          width: "100%",
          minHeight: "100vh",
          zIndex: 99,
          position: "fixed",
          left: "100%",
          top: 0,
          backgroundColor: "#42301e",
          paddingTop: "60px",
        }}
        variants={variants}
        animate={isOpen ? "visible" : "hidden"}>
        <Flex w="100%" h="100%" p="2rem" alignItems="center" flexDir="column">
          <Button
            color="white"
            variant={isSearchActive ? "none" : "outline"}
            _hover={{
              bg: "transparent",
            }}
            _active={{
              bg: "transparent",
            }}
            _focus={{
              outline: "none",
            }}
            display="flex"
            w="240px"
            borderRadius="2rem"
            ref={btnSearchRef}
            p="0"
            overflow="hidden"
            height="40px"
            alignItems="center">
            <motion.p
              style={{
                height: "100%",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontFamily: "iranSans",
                fontWeight: 300,
                display: "flex",
                textAlign: "center",
              }}
              animate={{
                opacity: isSearchActive ? 0 : 1,
                display: isSearchActive ? "none" : "flex",
              }}
              transition={{
                type: "tween",
                delay: 0.02,
              }}
              onClick={() => {
                setIsSearchActive(true);
                searchRefBase.current.focus();
              }}>
              جستجو
            </motion.p>
            <motion.div
              style={{
                height: "100%",
                width: "100%",
              }}
              animate={{
                opacity: isSearchActive ? 1 : 0,
                display: isSearchActive ? "block" : "none",
              }}
              transition={{
                type: "tween",
                delay: 0.02,
              }}>
              <InputGroup w="100%">
                <InputLeftAddon
                  children={<Icon as={FiSearch} color="black" />}
                />
                <Input
                  w="100%"
                  ref={searchRefBase}
                  value={searchValue}
                  onChange={onSearchValueChanged}
                  bg="white"
                  placeholder="جستجو"
                  color="black"
                  fontFamily="VazirMedium"
                  _focus={{
                    borderColor: "transparent",
                  }}
                  borderRadius="2rem"
                  dir="rtl"
                  type="text"
                />
              </InputGroup>
            </motion.div>
          </Button>
          <Flex w="240px">
            <CategoryMenu
              color="white"
              background="#4d3723"
              containerMargin="1rem 0 1rem 0"
              defaultIndex={false}
              itemsMargin=".5rem 0 .5rem 0"
              itemsBorder="none"
            />
          </Flex>
          <Flex flexDir="column" pos="absolute" bottom="2rem">
            <Button
              borderRadius="2rem"
              w="200px"
              mb="1rem"
              rightIcon={<Icon as={FiUser} fontSize={22} />}
              color="white"
              variant="outline"
              _hover={{
                bg: "transparent",
                outline: 0,
              }}
              _active={{
                bg: "transparent",
                outline: 0,
              }}
              _focus={{
                bg: "transparent",
                outline: 0,
              }}
              onClick={() => router.push("/auth/signin")}>
              <Text variant="normalLight" mr="2">
                حساب کاربری
              </Text>
            </Button>
            <Button
              w="200px"
              borderRadius="2rem"
              rightIcon={<Icon as={FiShoppingCart} fontSize={22} />}
              color="primary"
              variant="outline"
              bgColor="white"
              _hover={{
                bg: "transparent",
                outline: 0,
              }}
              _active={{
                bg: "transparent",
                outline: 0,
              }}
              _focus={{
                bg: "transparent",
                outline: 0,
              }}>
              <Text variant="normal" mr="2" color="primary">
                سبد خرید
              </Text>
            </Button>
          </Flex>
        </Flex>
      </motion.div>
    </>
  );
};

export default Navbar;
