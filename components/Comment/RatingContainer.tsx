import { Flex } from "@chakra-ui/layout";
import { Text } from "..";
import Rating from "./Rating";
import RatingBlock from "./RatingBlock";

interface IRatingContainer {
	title: string;
	rate: number;
	editable?: boolean;
	mr?: string;
}

const RatingContainer = ({ mr, title, rate, editable = false }: IRatingContainer) => {
	return (
		<Flex p=".5rem" alignItems="center">
			<Rating editable={editable} rate={rate} />
			<Text
				whiteSpace="nowrap"
				ml="1rem"
				mr={mr}
				color="black"
				variant="normalExt"
				fontSize={{ base: "12px", md: "14px" }}
			>
				{title}
			</Text>
		</Flex>
	);
}

export default RatingContainer;