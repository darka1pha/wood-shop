import { Flex } from "@chakra-ui/layout";
import {
  Button,
  FlexProps,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { FiEdit3 } from "react-icons/fi";
import Text from "../Text";

interface IInfoBox extends FlexProps {
  title?: string;
  value?: string;
  inputType?: string;
  info_box_for: "phonenumber" | "name_lastname" | "email" | "national_id";
}

const InfoBox = ({
  title,
  inputType,
  value,
  info_box_for,
  ...props
}: IInfoBox) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  return (
    <>
      <Flex
        p="2rem 1rem"
        justifyContent="flex-start"
        flexDir="column"
        w={{ base: "100%", md: "50%" }}
        border="1px solid #CFCFCF"
        alignItems="flex-start"
        {...props}>
        <Flex
          justifyContent="space-between"
          flexDir="row-reverse"
          alignItems="center"
          w="100%">
          <Text color="#424750" variant="normalExt">
            {title}
          </Text>
          <Icon
            as={FiEdit3}
            cursor="pointer"
            onClick={onOpen}
            fontSize="1.3rem"
          />
        </Flex>
        <Flex w="100%" flexDir="row-reverse">
          <Text mt=".5rem" color="#717171" variant="normalExt">
            {value}
          </Text>
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent display="flex" dir="rtl">
          <ModalHeader
            fontFamily="iranSans"
            fontSize="16px"
            borderBottom="1px solid #DFDFDF"
            ml="2rem"
            mr="2rem"
            pr="0">
            {title}
          </ModalHeader>
          <ModalCloseButton
            _focus={{
              outline: 0,
            }}
            top=".5rem"
            right="92%"
          />

          <ModalBody flexDir="column" display="flex" as="form">
            {info_box_for === "name_lastname" ? (
              <Text variant="normal" color="black" m="0 .2rem .2rem 0">
                نام
              </Text>
            ) : null}
            <Input
              fontFamily="iranSans"
              type={inputType}
              _focus={{
                outline: "none",
              }}
              value={input1}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInput1(e.target.value)
              }
            />
            {info_box_for === "name_lastname" ? (
              <>
                <Text color="black" variant="normal" m="1rem .2rem .2rem 0">
                  نام خانوادگی
                </Text>
                <Input
                  fontFamily="iranSans"
                  type={inputType}
                  _focus={{
                    outline: "none",
                  }}
                  value={input2}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setInput2(e.target.value)
                  }
                />
              </>
            ) : null}
          </ModalBody>
          <ModalFooter>
            <Button fontFamily="iranSans" colorScheme="blue">
              ثبت
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InfoBox;
