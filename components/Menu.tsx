import { Flex } from "@chakra-ui/layout";
import MenuItem from "./MenuItem";

const Menu = () => {
	return (
		<Flex
			bgColor="primary"
			p={["4", "6", "4", "6"]}
			direction="row-reverse"
		>
			<MenuItem text="صندلی" />
			<MenuItem text="میز" />
			<MenuItem text="کمد" />
			<MenuItem text="کمد و طبقه بندی" />
		</Flex>
	);
}

export default Menu;