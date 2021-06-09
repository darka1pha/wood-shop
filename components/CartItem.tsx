import Icon from "@chakra-ui/icon";
import { Flex } from "@chakra-ui/layout";
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Text } from ".";

interface ICartItem {
  image_url?: string;
  title?: string;
  color?: string;
  price?: string;
  count?: number;
}

const CartItem = ({
  color,
  count,
  image_url = "https://dkstatics-public.digikala.com/digikala-products/cd6a59e7a7d277e2de97d93aec0c950fc773e659_1600689705.jpg?x-oss-process=image/resize,m_lfit,h_350,w_350/quality,q_60",
  price,
  title,
}: ICartItem) => {
  return (
    <Flex m=".5rem 0" h={{ base: "100px", md: "120px" }}>
      <Flex
        h="100%"
        w={{ base: "100px", md: "120px" }}
        bgImage={`url(${image_url})`}
        bgSize="contain"
        bgRepeat="no-repeat"
      />
      <Flex w="100%" justifyContent="space-between">
        <Flex mt=".5rem" mr=".5rem" flexDir="column">
          <Text fontSize={{ base: "12px", md: "16px" }} variant="heading6">
            نام کالا
          </Text>
          <Text
            fontSize={{ base: "10px", md: "12px" }}
            color="#717171"
            variant="normal">
            سلامت فیزیکی
          </Text>
        </Flex>
        <Flex h="45px" alignItems="center">
          <Text
            fontSize={{ base: "12px", md: "14px" }}
            color="black"
            variant="normalExt">
            قیمت : {price ? price : "620 هزار تومان"}
          </Text>
        </Flex>
        <Flex
          border="1px solid #e6e6e6"
          h={{ base: "35px", md: "40px" }}
          borderRadius="1.5rem"
          alignItems="center">
          {count === 1 ? (
            <Icon
              fontSize={{ base: "0.7rem", md: "1rem" }}
              color="#4f4f4f"
              cursor="pointer"
              m={{ base: "0 .5rem", md: "0 .8rem" }}
              as={AiOutlineDelete}
            />
          ) : (
            <Icon
              fontSize={{ base: "0.7rem", md: "1rem" }}
              color="#4f4f4f"
              cursor="pointer"
              m={{ base: "0 .5rem", md: "0 .8rem" }}
              as={AiOutlineMinus}
            />
          )}
          <Text fontSize={{ base: "12px", md: "16px" }} variant="heading6">
            {count ? count.toString() : "1"}
          </Text>
          <Icon
            color="#4f4f4f"
            cursor="pointer"
            m={{ base: "0 .5rem", md: "0 .8rem" }}
            fontSize={{ base: "0.7rem", md: "1rem" }}
            as={AiOutlinePlus}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CartItem;
