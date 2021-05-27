import { Avatar } from "@chakra-ui/avatar";
import { Flex } from "@chakra-ui/layout";
import Text from "../../Text";

interface IUserInfo {
	name?: string;
	phone_number?: string;
}

const UserInfo = ({ name, phone_number }: IUserInfo) => {
	return (
		<Flex
			flexDir="row-reverse"
			w="100%"
		>
			<Avatar
				name="ابوالفضل عمرانی"
				bgColor="violet"
				h="50px"
				w="50px"
				fontFamily="iranSans"
			/>
			<Flex
				flexDir="column"
				mr=".7rem"
				justifyContent="center"
				alignItems="flex-end"
			>
				<Text
					variant="heading6"
				>
					{
						name ? name : "ابوالفضل عمرانی"
					}
				</Text>
				<Text
					mt=".2rem"
					color="#717171"
					variant="heading7"
					letterSpacing=".1rem"
				>
					{
						phone_number ? phone_number : "09378239855"
					}
				</Text>
			</Flex>
		</Flex>
	);
}

export default UserInfo;