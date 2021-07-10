import Icon from "@chakra-ui/icon";
import { Flex } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Text from "./Text";
import { useAddBookmark } from "../API";
import { useMutation } from "react-query";
import { ISetAlert, setAlert } from "../redux";
import { connect } from "react-redux";
import { useRouter } from "next/router";

interface CarouselItem {
  background_image?: string;
  price?: number;
  name?: string;
  margin?: string;
  id: number;
  setAlert: (alert: ISetAlert) => void;
}

const ProductCard = ({
  background_image,
  name,
  price,
  margin,
  id,
  setAlert,
}: CarouselItem) => {
  const [isLiked, setIsLiked] = useState(false);
  const router = useRouter();

  const bgImage = background_image
    ? background_image
    : "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fHRhYmxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";

  // Mutation
  const bookmarkMutation = useMutation(useAddBookmark, {
    onSuccess: (response) => {
      console.log("Like Response: ", response);
      setIsLiked(!isLiked);
      setAlert({ content: "به لیست دلخواه افزوده شد", type: "success" });
    },
  });

  const onBookmarkClicked = () => {
    bookmarkMutation.mutate(id);
  };

  const onCardClicked = () => {
    router.push({
      pathname: "/product",
      query: {
        id,
      },
    });
  };

  return (
    <Flex
      borderRadius=".5rem"
      overflow="hidden"
      flexDir="column"
      h={{ base: "240px", md: "360px" }}
      w={{ base: "160px", md: "240px" }}
      m={margin}
      cursor="pointer"
      boxShadow="md"
      transition="all 200ms ease-in-out"
      _hover={{
        transform: "scale(1.02)",
      }}
      onClick={onCardClicked}>
      <Flex
        h="75%"
        w="100%"
        cursor="pointer"
        bgImage={`url(${bgImage})`}
        bgRepeat="no-repeat"
        bgSize="cover"
        borderRadius=".5rem .5rem 0 0 / .5rem .5rem 0 0"
      />
      <Flex
        flexDir="column"
        padding=".5rem"
        justifyContent="center"
        alignItems="center">
        <Text m=".1rem" color="black" variant="normal" dir="rtl">
          {name}
        </Text>
        <Text m=".1rem" color="black" variant="normalThin">
          {`${price.toLocaleString()} ریال`}
        </Text>
        <Flex
          w={{ base: "45%", md: "25%" }}
          m=".1rem"
          justifyContent="space-evenly">
          <Icon as={FiShoppingCart} color="black" h="20px" w="20px" />
          <Icon
            h="20px"
            w="20px"
            onClick={onBookmarkClicked}
            as={isLiked ? AiFillHeart : AiOutlineHeart}
            color="red"
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setAlert: ({ content, type }: ISetAlert) =>
    dispatch(setAlert({ type, content })),
});

export default connect(null, mapDispatchToProps)(ProductCard);
