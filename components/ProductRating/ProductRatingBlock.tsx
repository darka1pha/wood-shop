import { Box } from "@chakra-ui/layout";


interface IRatingBlock {
	isMarked: boolean;
	rateId?: number;
}

const RatingBlock = ({ isMarked, rateId }: IRatingBlock) => {
	return (
		// <Box
		// filter=""
		//     clipPath="polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);"
		//     role="button"
		//     inset="0% 45% 0% 45% round 10px"
		//     rating-id={rateId}
		//     m=".2rem"
		//     h="30px"
		//     w="30px"
		//     bgColor={isMarked ? "#4BC557" : "#D5D5D5"}
		//     borderRadius=".2rem"
		//     cursor="pointer"
		//     transition="all 400ms ease-in"
		// />

		<>
			<Box
				clipPath=" polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);"
				className="star"
				role="button"
				rating-id={rateId}
				m=".2rem"
				h="30px"
				w="30px"
				bgColor={isMarked ? "orange" : "#D5D5D5"}
				borderRadius=".2rem"
				cursor="pointer"
				transition="all 400ms ease-in"
			/>
		</>
	);
}

export default RatingBlock;