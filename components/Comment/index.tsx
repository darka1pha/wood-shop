import { Flex } from "@chakra-ui/layout";
import dynamic from "next/dynamic";
import { IComment } from "../../API/interfaces";
import Text from "../Text";
import RatingContainer from "./RatingContainer";

// const RatingContainer = dynamic(
//   () => {
//     return import("./RatingContainer");
//   },
//   {
//     ssr: false,
//   }
// );

const index = ({
  text,
  design_value,
  quality_value,
  product,
  money_value,
  feature_value,
  id,
  user,
  datetime,
}: IComment) => {
  const ratings = [
    {
      engTitle: "feature_value",
      title: "امکانات",
      rate: feature_value,
    },
    {
      engTitle: "money_value",
      title: "ارزش نسبت به قیمت",
      rate: money_value,
    },
    {
      engTitle: "quality_value",
      title: "کیفیت ساخت",
      rate: quality_value,
    },
    {
      engTitle: "design_value",
      title: "طراحی و ظاهر",
      rate: design_value,
    },
  ];
  return (
    <Flex justifyContent="center" alignItems="center" w="100%">
      <Flex
        w="100%"
        maxW="1920px"
        flexDir={{ base: "column", md: "row-reverse" }}
        bgColor="#F8F8F8"
        border="1px solid #BDBDBD"
        m="1rem 0"
        borderRadius=".4rem"
        p="1rem">
        <Flex
          w="100%"
          display={{ base: "flex", md: "none" }}
          flexDir="row-reverse"
          justifyContent="space-between">
          <Text fontSize="12px" color="black" variant="normalExt">
            {user && user.last_name !== null && user.first_name !== null
              ? user.first_name + " " + user.last_name
              : null}
          </Text>
          <Text fontSize="12px" color="black" variant="normalExt">
            {datetime}
          </Text>
        </Flex>
        <Flex flexDir="column">
          {ratings.map(({ rate, title }, key) => (
            <RatingContainer title={title} rate={rate} key={key} />
          ))}
        </Flex>
        <Flex w="100%" shrink={1} flexDir="column" p="0 1rem">
          <Flex
            justifyContent="space-between"
            w="100%"
            flexDir="row-reverse"
            mb="1rem">
            <Text
              display={{ base: "none", md: "flex" }}
              color="black"
              variant="normalExt">
              {user ? user.first_name + " " + user.last_name : null}
            </Text>
            <Text
              display={{ base: "none", md: "flex" }}
              color="black"
              variant="normalExt">
              {datetime}
            </Text>
          </Flex>
          <Flex w="100%" shrink={1}>
            <Text w="100%" dir="rtl" color="black" variant="normalExt">
              {text}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default index;
