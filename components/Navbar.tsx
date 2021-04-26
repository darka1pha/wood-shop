import { Flex, Text } from "@chakra-ui/layout";

const Navbar = () => {
    return (
        <Flex
            h="180px"
            p="20px 120px"
            bgColor="primary"
            w="100%"
            flexDir="column"
        >
            <Flex
              w="100%"
              dir="rtl"
              color="white"
            >
                <Text
                    fontFamily="iranSans"
                    fontSize="h1"
                >
                    فروشگاه محصولات چوبی فرحبخش
                </Text>
            </Flex>

        </Flex>
    );
}

export default Navbar;