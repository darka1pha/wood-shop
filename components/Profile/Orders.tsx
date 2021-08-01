import { Flex } from "@chakra-ui/layout";
import Text from "../Text";
import OrderLables from "./Orders/OrderLables";
import OrderContainer, { IOrder } from "./Orders/OrderContainer";
import OrderSkeleton from "../Skeleton/OrderSkeleton";
import Head from "next/head";

// interface IOrders {
//   orders?: ;
// }

const Orders = () => {
  const testOrder = [
    [
      {
        name: "تست 1",
        price: "5000",
        status: "ارسال شد",
        orderDate: "1400/12/31",
        transactionNumber: "123456789",
      },
      {
        name: "فثسف 2",
        price: "5000",
        status: "ارسال شد",
        orderDate: "1400/12/31",
        transactionNumber: "123456789",
      },
    ],
    [
      {
        name: "تست 1",
        price: "5000",
        status: "ارسال شد",
        orderDate: "1400/12/31",
        transactionNumber: "123456789",
      },
      {
        name: "فثسف 2",
        price: "5000",
        status: "ارسال شد",
        orderDate: "1400/12/31",
        transactionNumber: "123456789",
      },
    ],
  ];
  if (true) return <OrderSkeleton />

  return (
    <Flex
      w="100%"
      minH="340px"
      mr={{ base: 0, md: "2rem" }}
      borderRadius=".5rem"
      border="1px solid #CFCFCF"
      justifyContent="flex-start"
      alignItems="flex-end"
      flexDir="column"
      overflow="hidden"
      p={{ base: "1.5rem .5rem", md: "1.5rem" }}>
      <Head>
        <title>سفارشات</title>
        <meta name="description" content="اصلاعات پروفایل کاربر" />
        <meta name="keywords" content="پروفایل,اطلاعات کاربری,فروشگاه آنلاین" />
        <meta property="og:title" content="سفارشات" />
        <meta property="og:description" content="اصلاعات پروفایل کاربر" />
        <meta property="og:type" content="website" />
      </Head>
      <Flex
        alignItems="center"
        pb=".5rem"
        borderBottom="2px solid #0E668B"
        h={{ base: "35px", md: "35px" }}
        mb="2rem">
        <Text fontSize={{ base: "14px", md: "18px" }} variant="heading5">
          تاریخچه سفارشات
        </Text>
      </Flex>
      <OrderLables />
      {testOrder.map((order, key) => (
        <OrderContainer Order={order} key={key} />
      ))}
    </Flex>
  );
};

export default Orders;
