import { Flex } from "@chakra-ui/layout";
import { Text } from "..";
import Rating from "./Rating";
import RatingBlock from "./RatingBlock";

interface IRatingContainer {
	title: string;
	rate: number;
	editable?: boolean;
}

const RatingContainer = ({ title, rate, editable = false }: IRatingContainer) => {
	return (
		<Flex p=".5rem" alignItems="center">
			<Rating editable={editable} rate={rate} />
			<Text
				whiteSpace="nowrap"
				ml="1rem"
				color="black"
				variant="normalExt"
			>
				{title}
			</Text>
		</Flex>
	);
}

export default RatingContainer;