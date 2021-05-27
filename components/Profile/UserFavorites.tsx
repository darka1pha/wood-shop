import { Flex } from "@chakra-ui/layout";
import Text from "../Text";

const UserFavorites = () => {
    return (
        <Flex
			w="100%"
			h="100%"
			mr="2rem"
			borderRadius=".5rem"
			border="1px solid #CFCFCF"
			p="1rem"
			justifyContent="center"
			alignItems="center"
		>
			<Text variant="heading1">
				User Fave
			</Text>
		</Flex >
    );
}

export default UserFavorites;