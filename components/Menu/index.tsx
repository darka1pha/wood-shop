import { Flex } from "@chakra-ui/layout";
import MenuItem from "./MenuItem";

const Menu = () => {
	return (
		<Flex
			bgColor="primary"
			pl="4"
			pb="6"
			pr="4"
			direction="row-reverse"
			pt="100px"
		>
			<MenuItem text="صندلی" />
			<MenuItem text="میز" />
			<MenuItem text="کمد" />
			<MenuItem text="کمد و طبقه بندی" />
		</Flex>
	);
}

export default Menu;