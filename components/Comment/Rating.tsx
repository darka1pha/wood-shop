import { Flex } from "@chakra-ui/layout";
import React from "react";
import RatingBlock from "./RatingBlock";

interface IRating {
    rate?: number;
    editable?: boolean;
}

const Rating = ({ rate, editable }: IRating) => {
    const [rating, setRating] = React.useState(
        rate ? rate : 0
    );
    const [selection, setSelection] = React.useState(0);
    const hoverOver = (event) => {
        let val = 0;
        if (event && event.target && event.target.getAttribute("rating-id"))
            val = event.target.getAttribute("rating-id");
        setSelection(val);
    };
    return (
        <Flex
            onMouseOut={
                editable ? () => hoverOver(null) : null
            }
            onClick={
                editable ? (event: any) =>
                    setRating(event.target.getAttribute("rating-id") || rating) : null
            }
            onMouseOver={editable ? hoverOver : null}
            flexDir="row-reverse"
        >
            {Array.from({ length: 5 }, (v, i) => (
                <RatingBlock
                    rateId={i + 1}
                    key={`star_${i + 1} `}
                    isMarked={selection ? selection >= i + 1 : rating >= i + 1}
                />
            ))}
        </Flex>
    )
}

export default Rating;