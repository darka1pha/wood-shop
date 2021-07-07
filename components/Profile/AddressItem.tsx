import Icon from "@chakra-ui/icon";
import { Flex, FlexProps } from "@chakra-ui/layout";
import Text from "../Text";
import { IoMdMore } from "react-icons/io";
import { BsPerson } from "react-icons/bs";

import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { IconButton } from "@chakra-ui/button";
import { IoMailOutline, IoPerson } from "react-icons/io5";
import { RiRoadMapLine } from "react-icons/ri";
import { FiPhone } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

interface IAddressItem {
  address?: string;
  id?: string | number;
  phone_number?: string;
  postal_code?: string;
  city?: string | number;
  state?: string | number;
  name?: string;
  onRemove?: () => void;
}

const AddressItem = ({
  address,
  onRemove,
  id,
  phone_number,
  postal_code,
  name,
  city,
  state,
}: IAddressItem) => {
  const FlexMotion = motion<FlexProps>(Flex);

  const variants = {
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "easeInOut",
        duration: 0.6,
        opacity: {
          delay: 0.2,
        },
      },
    },
    hidden: {
      opacity: 0,
      scale: 0.2,
      transition: {
        type: "easeInOut",
        duration: 0.6,
        opacity: {
          delay: 0.2,
        },
      },
    },
  };

  return (
      <Flex
        flexDirection="column"
        w="100%"
        dir="rtl"
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="hidden">
        <Flex
          w="100%"
          justifyContent="space-between"
          mt="1rem"
          alignItems="center">
          <Text variant="heading7" color="#424750">
            {address}
          </Text>
          <Menu>
            <MenuButton
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
        <Flex alignItems="center" mt="1rem">
          <Icon
            color="#81858B"
            as={RiRoadMapLine}
            ml=".5rem"
            fontSize="1.2rem"
          />
          <Text color="#81858B" fontSize="12px" variant="normalExt">
            {state + " - " + city}
          </Text>
        </Flex>
        <Flex alignItems="center" mt=".5rem">
          <Icon
            color="#81858B"
            as={IoMailOutline}
            ml=".5rem"
            fontSize="1.2rem"
          />
          <Text
            color="#81858B"
            letterSpacing=".1rem"
            fontSize="13px"
            variant="normalExt">
            {postal_code}
          </Text>
        </Flex>
        <Flex alignItems="center" mt=".5rem">
          <Icon color="#81858B" as={FiPhone} ml=".5rem" fontSize="1.2rem" />
          <Text
            color="#81858B"
            letterSpacing=".1rem"
            fontSize="13px"
            variant="normalExt">
            {phone_number}
          </Text>
        </Flex>
        <Flex
          pb="1rem"
          mt=".5rem"
          alignItems="center"
          borderBottom="2px solid #E9E9E9">
          <Icon color="#81858B" as={BsPerson} ml=".5rem" fontSize="1.2rem" />
          <Text color="#81858B" fontSize="12px" variant="normalExt">
            {name}
          </Text>
        </Flex>
      </Flex>
  );
};

export default AddressItem;
