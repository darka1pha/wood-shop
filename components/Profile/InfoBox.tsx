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
import {
  ICurrentUser,
  setCurrentUser,
  selectCurrentUser,
  setAlert,
  ISetAlert,
} from "../../redux";

import { FiEdit3 } from "react-icons/fi";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Text from "../Text";
import { useMutation, useQueryClient } from "react-query";
import { profileUpdate, profileUpdatePassword } from "../../API";
import { IError } from "../../API/interfaces";

interface IInfoBox extends FlexProps {
  title?: string;
  value?: string;
  inputType?: string;
  info_box_for:
    | "phonenumber"
    | "name_lastname"
    | "password"
    | "national_id"
    | "change_password";
  currentUser: ICurrentUser;
  setCurrentUser: (user: ICurrentUser) => void;
  setAlert: (alert: ISetAlert) => void;
}

const InfoBox = ({
  title,
  inputType,
  value,
  info_box_for,
  currentUser,
  setCurrentUser,
  setAlert,
  ...props
}: IInfoBox) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const queryClient = useQueryClient();

  const [input1, setInput1] = useState(null);
  const [input2, setInput2] = useState(null);
  const [input3, setInput3] = useState(null);

  const updateMutation = useMutation((data: any) => profileUpdate(data), {
    onSuccess: (res: any) => {
      console.log("awad :", res);
      // queryClient.refetchQueries();
      setCurrentUser({ ...res.data });
      setAlert({ content: "پروفایل با موفقیت آپدیت شد", type: "success" });
    },
    onError: (error: IError) => {
      console.log("Error: ", error.response);
      if (info_box_for === "national_id") {
        setAlert({ content: "کد ملی وارد شده اشتباه است", type: "error" });
      }
    },
  });

  const updatePasswordMutation = useMutation(
    (data: any) => profileUpdatePassword(data),
    {
      onSuccess: (res: any) => {
        // queryClient.refetchQueries();
        setCurrentUser({ ...res.data });
        setAlert({ content: "پروفایل با موفقیت آپدیت شد", type: "success" });
      },
      onError: (error: IError) => {
        console.log("Error: ", error.response);
        setAlert({ content: error.response.data.error.message, type: "error" });
      },
    }
  );

  const onConfirmClicked = () => {
    if (info_box_for === "name_lastname") {
      updateMutation.mutate({ first_name: input1, last_name: input2 });
    } else if (info_box_for === "national_id") {
      updateMutation.mutate({ national_id: input1 });
    } else if (info_box_for === "phonenumber") {
      updateMutation.mutate({ phone_number: input1 });
    } else if (info_box_for === "password") {
      //TODO setCurren User when request send response 200 ok
      setCurrentUser({
        ...currentUser,
        password: input1,
        is_new: false,
      });
      updateMutation.mutate({ password: input1 });
    } else if (
      info_box_for === "change_password" &&
      currentUser.is_new === false
    ) {
      if (input2 === input3 && input1.length >= 8) {
        updatePasswordMutation.mutate({
          password: input1,
          new_password: input2,
          confirm_password: input3,
        });
      } else if (input2 !== input3)
        setAlert({
          content: "رمز عبور جدید با تایید آن مطابقت ندارد",
          type: "error",
        });
      else if (input1.length < 8)
        setAlert({
          content: "رمز عبور قبلی وارد شده اشتباه است",
          type: "error",
        });
    }
    onClose();
  };

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
            display={info_box_for === "phonenumber" ? "none" : "flex"}
            cursor="pointer"
            onClick={info_box_for !== "phonenumber" ? onOpen : null}
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
            fontFamily="Vazir"
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
            {info_box_for === "change_password" ? (
              <Text variant="normal" color="black" m="0 .2rem .2rem 0">
                رمز عبور قبلی
              </Text>
            ) : null}
            <Input
              fontFamily="Vazir"
              defaultValue={
                info_box_for === "name_lastname"
                  ? currentUser.first_name
                  : info_box_for === "phonenumber"
                  ? currentUser.phone_number
                  : info_box_for === "change_password"
                  ? ""
                  : currentUser.national_id
              }
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
                  fontFamily="Vazir"
                  defaultValue={currentUser.last_name}
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
            {info_box_for === "change_password" ? (
              <>
                <Text color="black" variant="normal" m="1rem .2rem .2rem 0">
                  رمز عبور جدید
                </Text>
                <Input
                  fontFamily="Vazir"
                  type={inputType}
                  _focus={{
                    outline: "none",
                  }}
                  value={input2}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setInput2(e.target.value)
                  }
                />
                <Text color="black" variant="normal" m="1rem .2rem .2rem 0">
                  تایید رمز عبور جدید
                </Text>
                <Input
                  fontFamily="Vazir"
                  type={inputType}
                  _focus={{
                    outline: "none",
                  }}
                  value={input3}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setInput3(e.target.value)
                  }
                />
              </>
            ) : null}
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={onConfirmClicked}
              fontFamily="Vazir"
              colorScheme="blue">
              ثبت
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setAlert: ({ content, type }: ISetAlert) =>
    dispatch(setAlert({ type, content })),
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(InfoBox);
