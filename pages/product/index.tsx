import { Flex } from "@chakra-ui/layout";
import {
  ColorPalette,
  Comment,
  DeliveryTime,
  NewComment,
  ProductDiscription,
  Text,
} from "../../components";
import ReactStars from "react-rating-stars-component";
import Icon from "@chakra-ui/icon";
import { Button } from "@chakra-ui/button";
import { FiShoppingCart } from "react-icons/fi";
import { useAddToCart, useGetComments, useGetProductInfo, useSetScore } from "../../API";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Spinner } from "@chakra-ui/spinner";
import { useMutation } from "react-query";
import { connect } from "react-redux";
import { ISetAlert, setAlert } from "../../redux";
import ProductCarousel from "../../components/ProductCarousel";
import { IError } from "../../API/interfaces";
import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal } from "@chakra-ui/react";
import Rating from "../../components/ProductRating/ProductRating";

//TODO Dynamic Import for Components 

// const ProductCarousel = dynamic(
//   () => {
//     return import("../../components/ProductCarousel");
//   },
//   {
//     ssr: false,
//   }
// );

// const NewComment = dynamic(
//   () => {
//     return import("../../components/Comment/NewComment");
//   },
//   {
//     ssr: false,
//   }
// );

const index = ({ setAlert }) => {
  const router = useRouter();

  const containerRef = useRef(null);

  const addToCartMutation = useMutation(useAddToCart, {
    onSuccess: () => {
      setAlert({ content: "محصول به سبد خرید اضافه شد", type: "success" });
    },
    onError: () => {
      setAlert({ content: "خطایی رخ داده است", type: "error" });
    },
  });

  const setScoreMutation = useMutation(useSetScore, {
    onSuccess: () => {
      setAlert({ content: "امتیاز شما ثبت شد", type: "success" });
    },
    onError: (err: IError) => {
      console.log(err.response.data)
      setAlert({ content: "Erroe", type: "error" });
    }
  })

  const onAddToCart = async () => {
    addToCartMutation.mutateAsync({
      count: 1,
      product: Number(
        router.query.id ? router.query.id : window.location.search.split("=")[1]
      ),
    });
  };

  const { data: product, error: error2 } = useGetProductInfo(
    Number(
      router.query.id ? router.query.id : window.location.search.split("=")[1]
    )
  );

  const {
    data: comments,
    fetchNextPage,
    isFetchingNextPage,
    isSuccess,
    error: error1,
  } = useGetComments(
    Number(
      router.query.id
        ? router.query.id
        : Number(window.location.search.split("=")[1])
    )
  );

  const isBottom = (el) => {
    return el.current?.getBoundingClientRect().bottom <= window.innerHeight;
  };

  const onRatingChange = (res) => {
    console.log({ product: Number(router.query.id), value: res })
    setScoreMutation.mutate({ product: Number(router.query.id), value: res })
  }

  useEffect(() => {
    const trackScrolling = () => {
      if (containerRef) {
        if (isBottom(containerRef)) {
          fetchMoreItems();
          document.removeEventListener("scroll", trackScrolling);
        }
      }
    };
    document.addEventListener("scroll", trackScrolling);
    return () => {
      document.removeEventListener("scroll", trackScrolling);
    };
  }, [containerRef, product]);

  const fetchMoreItems = () => {
    fetchNextPage();
  };

  if (!product || !comments) return <h1>loading</h1>;
  if (error1 || error2) return <h1>Erooooooooooor</h1>;

  return (
    <Flex
      as="div"
      lang="fa"
      minH="100vh"
      overflowX="hidden"
      p={{ base: "80px .5rem 2rem .5rem", md: "180px 2rem 2rem 2rem" }}
      bgColor="bgColor"
      flexDir="column"
      justifyContent="center"
      alignItems="center">
      <Flex
        w="100%"
        maxW="1920px"
        alignItems="flex-start"
        flexDir={{ base: "column", md: "row-reverse" }}
        justifyContent="center"
        mb="2rem">
        <Flex w={{ base: "100%", md: "50%" }}>
          <ProductCarousel product={product} />
        </Flex>
        <Flex
          w={{ base: "100%", md: "auto" }}
          flexGrow={1}
          flexDir="column"
          alignItems="center"
          justifyContent="center">
          <Flex
            pt={{ base: "2rem", md: "2.5rem" }}
            w="100%"
            dir="rtl"
            pr={{ base: "1rem", md: "2rem" }}>
            <Text
              fontSize={{ base: "18px", md: "32px" }}
              color="black"
              variant="heading3">
              {product.name}
            </Text>
          </Flex>
          <Flex
            dir="rtl"
            alignItems="center"
            w="100%"
            pr="2rem"
            pt={{ base: ".5rem", md: 0 }}>
            <Popover>
              <PopoverTrigger>
                <Button
                  bgColor="#E2E8F0"
                  _focus={{
                    outline: 0
                  }}
                >
                  <Icon
                    as={AiFillStar}
                    h="35px"
                    w="35px"
                    color="orange"
                  />
                  <Text
                    m="0 .3rem"
                    color="black"
                    variant="heading7"
                    h="100%"
                    display="flex"
                    alignItems="center">
                    {product.score.toString()}
                  </Text>
                </Button>
              </PopoverTrigger>
              <Portal>
                <PopoverContent
                  _focus={{
                    outline: 0
                  }}
                  w="200px"
                >
                  <PopoverArrow />
                  <PopoverBody>
                    <Rating
                      onChange={onRatingChange}
                      editable={true}
                      rate={0}
                    />
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>

          </Flex>
          <Flex
            dir="rtl"
            w="100%"
            pr="2rem"
            pt=".5rem"
            flexDir="column"
            justifyContent="flex-end">
            <ColorPalette />
            <DeliveryTime time={product.creation_duration} />
            <Flex
              m={{ base: "1rem 0", md: "2rem 0" }}
              w="100%"
              alignItems="center"
              p={{ base: "1rem", md: 0 }}
              mr="-1rem">
              <Button
                onClick={onAddToCart}
                w="200px"
                borderRadius="2rem"
                rightIcon={<Icon as={FiShoppingCart} fontSize={22} />}
                color="white"
                variant="outline"
                transition="all 400ms ease-in-out"
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
                }}>
                <Text variant="normal" color="white">
                  سبد خرید
                </Text>
              </Button>
              <Text
                m="0 2rem"
                whiteSpace="nowrap"
                color="black"
                variant="heading5">
                {`${product.price.toLocaleString()} ریال`}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        ref={containerRef}
        w="100%"
        maxW="1920px"
        alignItems="center"
        flexDir="column"
        justifyContent="center">
        <ProductDiscription description={product.description} />
        <NewComment
          productId={Number(
            router.query.id
              ? router.query.id
              : Number(window.location.search.split("=")[1])
          )}
        />
        <Flex flexWrap="wrap" w="100%">
          {isSuccess &&
            comments?.pages.map((group, index) => (
              <React.Fragment key={index}>
                {group?.results.map(
                  (
                    {
                      design_value,
                      feature_value,
                      money_value,
                      quality_value,
                      text,
                      user,
                      datetime,
                    },
                    key: number
                  ) => (
                    <Comment
                      design_value={design_value}
                      feature_value={feature_value}
                      money_value={money_value}
                      quality_value={quality_value}
                      text={text}
                      key={key}
                      datetime={datetime}
                      user={user}
                    />
                  )
                )}
              </React.Fragment>
            ))}
          <motion.div
            style={{
              display: isFetchingNextPage ? "flex" : "none",
              width: "100%",
              justifyContent: "center",
              margin: "1rem 0",
            }}>
            <Spinner color="red.200" />
          </motion.div>
        </Flex>
      </Flex>
    </Flex>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setAlert: ({ type, content }: ISetAlert) =>
    dispatch(setAlert({ content, type })),
});

export default connect(null, mapDispatchToProps)(index);
