import { Box } from "@chakra-ui/layout";


interface IRatingBlock {
    isMarked: boolean;
    rateId?: number;
}

const RatingBlock = ({ isMarked, rateId }: IRatingBlock) => {
    return (
        <Box
            role="button"
            rating-id={rateId}
            m=".2rem"
            h="8px"
            w="30px"
            bgColor={isMarked ? "#4BC557" : "#D5D5D5"}
            borderRadius=".2rem"
            cursor="pointer"
            transition="all 400ms ease-in"
        />
    );
}

export default RatingBlock;