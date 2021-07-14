import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import Icon from "@chakra-ui/icon";
import { Input } from "@chakra-ui/input";
import { Divider, Flex } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { RadioGroup } from "@chakra-ui/radio";
import { Select } from "@chakra-ui/select";
import { useEffect, useState } from "react";
import { RiMapPinAddLine } from "react-icons/ri";
import { useMutation } from "react-query";
import { usePayment } from "../../API";
import { PaymentAddress, PaymentSend, Text } from "../../components";

interface IAddress {
  name?: string;
  lastname?: string;
  tag?: string;
  phoneNumber?: string;
  postalCode?: string;
  address?: string;
  unit?: string;
  city?: string;
  state?: string;
}

const payment = () => {
  const [selectedAddress, setSelectedAddress] = useState("test1");
  const [selectedSendMethod, setSelectedSendMethod] = useState("test1");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const paymentMutation = useMutation(usePayment, {
    onSuccess: (res) => {
      console.log("Payment Response: ", res);
    },
  });
  const cost = 2000;
  const [addresses, setAddresses] = useState<Array<IAddress>>([
    {
      name: "ابوالفضل",
      address: "کرمان ایران مریکا",
      lastname: "عمرانی",
      postalCode: "2564365874",
      phoneNumber: "09378239855",
      tag: "شهید حقانی",
      unit: "4",
      city: "کرمان",
      state: "کرمان",
    },
    {
      name: "حمیت",
      address: "کرمان ایران مریکا",
      lastname: "رادفر",
      postalCode: "2564365874",
      phoneNumber: "09378239855",
      tag: "شهید حقانی",
      unit: "10",

      city: "کرمان",
      state: "کرمان",
    },
  ]);
  const [tempAddress, setTempAddress] = useState<IAddress>({
    name: "",
    address: "",
    lastname: "",
    postalCode: "",
    phoneNumber: "",
    tag: "",
    unit: "",
    city: "",
    state: "",
  });
  const addAddress = (newAddress: IAddress) => {
    console.log(newAddress);
    setAddresses([...addresses, newAddress]);
    setTempAddress({
      name: "",
      address: "",
      lastname: "",
      postalCode: "",
      phoneNumber: "",
      tag: "",
      unit: "",
      city: "",
      state: "",
    });
    onClose();
  };

  const {
    lastname,
    postalCode,
    phoneNumber,
    tag,
    unit,
    address,
    name,
    city,
    state,
  } = tempAddress;

  const onAddressFieldChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempAddress({ ...tempAddress, [e.target.name]: e.target.value });
  };

  const onSelectChanges = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTempAddress({ ...tempAddress, [e.target.name]: e.target.value });
  };

  const onConfirmOrder = () => {
    paymentMutation.mutate();
  };

  useEffect(() => {
    console.log(selectedAddress);
  }, [selectedAddress]);
  return (
    <Flex
      as="div"
      lang="fa"
      minH="100vh"
      overflowX="hidden"
      p={{ base: "80px .5rem 2rem .5rem", md: "180px 2rem 2rem 2rem" }}
      bgColor="bgColor"
      flexDir="column"
      alignItems="center">
      <Flex
        maxW="1280px"
        w="100%"
        border="1px solid #CFCFCF"
        borderRadius=".5rem"
        p="1rem"
        flexDirection={{ base: "column", md: "row-reverse" }}
        justifyContent="space-between">
        <Flex justifyContent="flex-end" flexDirection="column">
          <Text dir="rtl" color="#545454" variant="heading6">
            انتخاب آدرس برای ارسال
          </Text>
          <RadioGroup onChange={setSelectedAddress} value={selectedAddress}>
            {addresses.map(({ address, state, city }, key) => (
              <PaymentAddress
                address={address}
                state={state}
                city={city}
                value={key.toString()}
                key={key}
              />
            ))}
          </RadioGroup>
          <Flex
            cursor="pointer"
            onClick={onOpen}
            mr="1rem"
            justifyContent="flex-end"
            alignItems="center">
            <Text color="#424750" variant="normalExt">
              اضافه کردن آدرس جدید
            </Text>
            <Icon as={RiMapPinAddLine} ml=".2rem" fontSize="1.4rem" />
          </Flex>
        </Flex>
        <Flex
          borderRadius=".5rem"
          w={{ base: "auto", md: "1px" }}
          h={{ base: "1px", md: "auto" }}
          m={{ base: "1rem 0", md: 0 }}
          bgColor="#CFCFCF"
        />
        <Flex p="0 1rem" flexDirection="column">
          <Text dir="rtl" color="#545454" variant="heading6">
            انتخاب شیوه ارسال
          </Text>
          <RadioGroup
            onChange={setSelectedSendMethod}
            value={selectedSendMethod}>
            <PaymentSend value="test1" content="با موتور هوندا 125" />
            <PaymentSend value="test2" content="با پا" />
            <PaymentSend value="test3" content="هوایی" />
          </RadioGroup>
        </Flex>
        <Flex
          borderRadius=".5rem"
          w={{ base: "auto", md: "1px" }}
          h={{ base: "1px", md: "auto" }}
          m={{ base: "1rem 0", md: 0 }}
          bgColor="#CFCFCF"
        />
        <Flex
          p="0 1rem"
          alignItems="flex-end"
          justifyContent="flex-end"
          flexDirection="column">
          <Text mb="1rem" color="#545454" variant="normalExt">
            {`مبلغ قابل پرداخت ${cost} ریال`}
          </Text>
          <Button
            color="white"
            fontFamily="Vazir"
            bgColor="btnBg"
            _hover={{
              bgColor: "btnHover",
            }}
            _focus={{
              outline: 0,
              bgColor: "btnBg",
            }}
            _active={{
              bgColor: "btnActive",
            }}
            onClick={onConfirmOrder}>
            پرداخت و ثبت سفارش
          </Button>
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          w={{ base: "85%", md: "auto" }}
          minW={{ base: "320px", md: "640px" }}>
          <ModalHeader dir="rtl" w="100%" fontFamily="Vazir">
            افزودن آدرس
          </ModalHeader>
          <ModalCloseButton
            _focus={{
              outline: 0,
            }}
            right={{ base: "88%", md: "92%" }}
          />
          <ModalBody p={{ base: "1rem 2rem", md: "1rem 4rem" }}>
            <Flex
              flexDir={{ base: "column", md: "row" }}
              justifyContent="space-between">
              <Flex
                mb={{ base: "1rem", md: 0 }}
                dir="rtl"
                w={{ base: "100%", md: "45%" }}
                flexDir="column">
                <Text mr=".5rem" color="#424750" variant="normal">
                  شهر
                </Text>
                <Select
                  fontFamily="Vazir"
                  fontSize="12px"
                  color="#6F6F6F"
                  dir="ltr"
                  focusBorderColor="pink.300"
                  placeholder="شهر خود را انتخاب کنید"
                  onChange={onSelectChanges}
                  value={city}
                  name="city">
                  <option value="تهران">تهران</option>
                  <option value="کرمان">کرمان</option>
                  <option value="شیراز">شیراز</option>
                </Select>
              </Flex>
              <Flex dir="rtl" w={{ base: "100%", md: "45%" }} flexDir="column">
                <Text mr=".5rem" color="#424750" variant="normal">
                  استان
                </Text>
                <Select
                  dir="ltr"
                  fontFamily="Vazir"
                  fontSize="12px"
                  color="#6F6F6F"
                  onChange={onSelectChanges}
                  focusBorderColor="pink.300"
                  value={state}
                  name="state"
                  placeholder="استان خود را انتخاب کنید">
                  <option value="تهران">تهران</option>
                  <option value="کرمان">کرمان </option>
                  <option value="شیراز">شیراز</option>
                </Select>
              </Flex>
            </Flex>
            <Flex m="1rem 0" dir="rtl" flexDir="column">
              <Text mr=".5rem" color="#424750" variant="normal">
                نشانی پستی
              </Text>
              <Input
                fontFamily="Vazir"
                fontSize="14px"
                focusBorderColor="pink.300"
                name="address"
                value={address}
                onChange={onAddressFieldChanges}
              />
            </Flex>
            <Flex
              flexDir={{ base: "column", md: "row" }}
              justifyContent="space-between"
              m="1rem 0"
              dir="rtl">
              <Flex
                mb={{ base: "1rem", md: 0 }}
                w={{ base: "100%", md: "20%" }}
                dir="rtl"
                flexDir="column">
                <Text mr=".5rem" color="#424750" variant="normal">
                  پلاک
                </Text>
                <Input
                  focusBorderColor="pink.300"
                  name="tag"
                  onChange={onAddressFieldChanges}
                  value={tag}
                />
              </Flex>
              <Flex
                mb={{ base: "1rem", md: 0 }}
                w={{ base: "100%", md: "20%" }}
                dir="rtl"
                flexDir="column">
                <Text mr=".5rem" color="#424750" variant="normal">
                  واحد
                </Text>
                <Input
                  focusBorderColor="pink.300"
                  name="unit"
                  onChange={onAddressFieldChanges}
                  value={unit}
                />
              </Flex>
              <Flex dir="rtl" flexDir="column">
                <Text mr=".5rem" color="#424750" variant="normal">
                  کد پستی
                </Text>
                <Input
                  focusBorderColor="pink.300"
                  name="postalCode"
                  onChange={onAddressFieldChanges}
                  value={postalCode}
                />
              </Flex>
            </Flex>
            <Flex h="1px" w="100%" bgColor="#E9E9E9" />
            <Flex
              flexDir={{ base: "column", md: "row" }}
              justifyContent="space-between"
              m="1rem 0"
              dir="rtl">
              <Flex
                mb={{ base: "1rem", md: 0 }}
                w={{ base: "100%", md: "45%" }}
                dir="rtl"
                flexDir="column">
                <Text mr=".5rem" color="#424750" variant="normal">
                  نام گیرنده
                </Text>
                <Input
                  focusBorderColor="pink.300"
                  name="name"
                  onChange={onAddressFieldChanges}
                  value={name}
                />
              </Flex>
              <Flex w={{ base: "100%", md: "45%" }} dir="rtl" flexDir="column">
                <Text mr=".5rem" color="#424750" variant="normal">
                  نام خانوادگی گیرنده
                </Text>
                <Input
                  focusBorderColor="pink.300"
                  name="lastname"
                  onChange={onAddressFieldChanges}
                  value={lastname}
                />
              </Flex>
            </Flex>
            <Flex justifySelf="flex-end" w="100%" dir="rtl" flexDir="column">
              <Text mr=".5rem" color="#424750" variant="normal">
                شماره تلفن
              </Text>
              <Input
                focusBorderColor="pink.300"
                w={{ base: "100%", md: "45%" }}
                name="phoneNumber"
                onChange={onAddressFieldChanges}
                value={phoneNumber}
              />
            </Flex>
          </ModalBody>
          <ModalFooter dir="rtl">
            <Button
              fontFamily="Vazir"
              fontSize="12px"
              bgColor="#EF394E"
              color="white"
              _hover={{
                bgColor: "#EF394E",
              }}
              _focus={{
                outline: 0,
                bgColor: "#EF394E",
              }}
              _active={{
                bgColor: "#E3122A",
              }}
              mr={3}
              onClick={() => addAddress(tempAddress)}>
              تایید و ثبت
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default payment;
