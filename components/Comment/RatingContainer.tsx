import { Flex } from "@chakra-ui/layout";
import { Text } from "..";
import Rating from "./Rating";
import { IComment } from "../../API/interfaces";
import { Dispatch, SetStateAction } from "react";

interface IRatingContainer {
  title: string;
  engTitle?: string;
  rate: number;
  editable?: boolean;
  mr?: string;
  rating?: number;
  onChange?: Dispatch<SetStateAction<IComment>>;
  oldArray?: IComment;
}

const RatingContainer = ({
  engTitle,
  mr,
  title,
  rate,
  editable = false,
  onChange,
  rating,
  oldArray,
}: IRatingContainer) => {
  return (
    <Flex p=".5rem" alignItems="center">
      <Rating
        oldArray={oldArray}
        name={engTitle}
        setFinalRating={onChange}
        rating={rating}
        editable={editable}
        rate={rate}
      />
      <Text
        whiteSpace="nowrap"
        ml="1rem"
        mr={mr}
        color="black"
        variant="normalExt"
        fontSize={{ base: "12px", md: "14px" }}>
        {title}
      </Text>
    </Flex>
  );
};

export default RatingContainer;
