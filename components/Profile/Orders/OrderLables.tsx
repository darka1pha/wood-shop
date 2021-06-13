import { Flex } from "@chakra-ui/layout";
import { Text } from "../..";

const OrderLables = () => {
  return (
    <Flex dir="rtl" w="100%">
      <Flex justifyContent="center" w={{ base: "25%", md: "20%" }}>
        <Text
          whiteSpace="nowrap"
          fontSize={{ base: "12px", md: "14px" }}
          variant="heading6">
          نام محصول
        </Text>
      </Flex>
      <Flex justifyContent="center" w={{ base: "25%", md: "20%" }}>
        <Text
          whiteSpace="nowrap"
          fontSize={{ base: "12px", md: "14px" }}
          variant="heading6">
          قیمت
        </Text>
      </Flex>
      <Flex justifyContent="center" w={{ base: "25%", md: "20%" }}>
        <Text
          whiteSpace="nowrap"
          fontSize={{ base: "12px", md: "14px" }}
          variant="heading6">
          تاریخ سفارش
        </Text>
      </Flex>
      <Flex
        display={{ base: "none", md: "flex" }}
        justifyContent="center"
        w="20%">
        <Text
          whiteSpace="nowrap"
          fontSize={{ base: "12px", md: "14px" }}
          variant="heading6">
          شماره تراکنش
        </Text>
      </Flex>
      <Flex justifyContent="center" w={{ base: "25%", md: "20%" }}>
        <Text
          whiteSpace="nowrap"
          fontSize={{ base: "12px", md: "14px" }}
          variant="heading6">
          وضعیت
        </Text>
      </Flex>
    </Flex>
  );
};

export default OrderLables;
