import { Flex } from "@chakra-ui/layout";
import React, { useEffect } from "react";
import { Text } from "../..";

export type IOrder = {
  Order: Array<{
    name?: string;
    price?: string;
    orderDate?: string;
    transactionNumber?: string;
    status?: string;
  }>;
};

const OrderContainer = ({ Order }: IOrder) => {
  useEffect(() => {
    Order.map(({ name }) => {
      console.log(name);
    });
  }, []);
  return (
    <Flex
      dir="rtl"
      flexDir="column"
      w="100%"
      m=".5rem 0"
      borderRadius=".5rem"
      border="1px solid #d7d7d7">
      {Order.map(({ name, price, orderDate, transactionNumber }, key) => (
        <Flex m=".5rem 0" key={key}>
          <Flex justifyContent="center" w={{ base: "25%", md: "20%" }}>
            <Text
              color="black"
              fontSize={{ base: "12px", md: "14px" }}
              variant="normal">
              {name}
            </Text>
          </Flex>
          <Flex justifyContent="center" w={{ base: "25%", md: "20%" }}>
            <Text
              color="black"
              fontSize={{ base: "12px", md: "14px" }}
              variant="normal">
              {price}
            </Text>
          </Flex>
          <Flex justifyContent="center" w={{ base: "25%", md: "20%" }}>
            <Text
              color="black"
              fontSize={{ base: "12px", md: "14px" }}
              variant="normal">
              {orderDate}
            </Text>
          </Flex>
          <Flex
            display={{ base: "none", md: "flex" }}
            justifyContent="center"
            w="20%">
            <Text
              color="black"
              fontSize={{ base: "12px", md: "14px" }}
              variant="normal">
              {transactionNumber}
            </Text>
          </Flex>
          <Flex justifyContent="center" w={{ base: "25%", md: "20%" }}>
            <Text
              color="black"
              fontSize={{ base: "12px", md: "14px" }}
              variant="normal">
              {Order[0].status}
            </Text>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};

export default OrderContainer;
