import { Flex } from "@chakra-ui/layout";
import { useState } from "react";
import RatingBlock from "./ProductRatingBlock";

interface IRating {
  rate?: number;
  editable?: boolean;
  onChange: (any) => void;
}

const Rating = ({
  rate,
  editable,
  onChange,
}: IRating) => {
  const [selection, setSelection] = useState(0);
  const [rating, setRating] = useState(rate ? rate : 0);
  const hoverOver = (event) => {
    let val = 0;
    if (event && event.target && event.target.getAttribute("rating-id"))
      val = event.target.getAttribute("rating-id");
    setSelection(val);
  };
  return (
    <Flex
    flexDir="row-reverse"
      onMouseOut={editable ? () => hoverOver(null) : null}
      onClick={
        editable
          ? (event: any) => {
            setRating(event.target.getAttribute("rating-id") || rating);
            onChange(event.target.getAttribute("rating-id") || rating)
          }
          : null
      }
      onMouseOver={editable ? hoverOver : null}
    >
      {Array.from({ length: 5 }, (v, i) => (
        <RatingBlock
          rateId={i + 1}
          key={`star_${i + 1} `}
          isMarked={selection ? selection >= i + 1 : rating >= i + 1}
        />
      ))}
    </Flex>
  );
};

export default Rating;
