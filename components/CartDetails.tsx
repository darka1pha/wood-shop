import { Button } from "@chakra-ui/button";
import { Divider, Flex } from "@chakra-ui/layout";
import { Text } from ".";

const CartDetails = () => {
  return (
    <Flex flexDir="column" w="100%" h="100%">
      <Flex
        m="1rem 0"
        justifyContent="space-between"
        w="100%"
        flexDir="row-reverse">
        <Text dir="rtl" color="black" variant="normal">
          مجموع قیمت
        </Text>
        <Flex alignItems="center" flexDir="row-reverse">
          <Text color="black" variant="normalExt">
            455
          </Text>
          <Text color="#717171" fontSize="12px" variant="normal">
            هزار تومان&nbsp;
          </Text>
        </Flex>
      </Flex>
      <Flex
        m=".5rem 0"
        justifyContent="space-between"
        w="100%"
        flexDir="row-reverse">
        <Text dir="rtl" color="black" variant="normal">
          سود شما
        </Text>
        <Flex alignItems="center" flexDir="row-reverse">
          <Text color="#13bf52" variant="normalExt">
            200
          </Text>
          <Text color="#717171" fontSize="12px" variant="normal">
            هزار تومان&nbsp;
          </Text>
        </Flex>
      </Flex>
      <Divider />
      <Flex
        m="1rem 0"
        justifyContent="space-between"
        w="100%"
        flexDir="row-reverse">
        <Text dir="rtl" color="black" variant="normal">
          مبلغ قابل پرداخت
        </Text>
        <Flex alignItems="center" flexDir="row-reverse">
          <Text color="black" variant="normalExt">
            255
          </Text>
          <Text color="#717171" fontSize="12px" variant="normal">
            هزار تومان&nbsp;
          </Text>
        </Flex>
      </Flex>
      <Flex w="100%">
        <Button
        onClick={() => alert("خرید")}
          fontFamily="iranSans"
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
          w="100%">
          ادامه فرایند خرید
        </Button>
      </Flex>
    </Flex>
  );
};

export default CartDetails;
