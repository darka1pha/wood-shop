import { Button, Flex, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

const Test = () => {
  return (
    <Flex
      flexDir="column"
      as="div"
      lang="fa"
      bgColor="bgColor"
      minH="100vh"
      overflowX="hidden"
      pt={{ base: 0, md: "140px" }}
    >
      <Flex p="2rem" justifyContent="center" h="100vh" w="100%">
        <Menu>
          {({ isOpen }) => (
            <>
              <MenuButton isActive={isOpen} as={Button} >
                {isOpen ? "Close" : "Open"}
              </MenuButton>
              <MenuList>
                <MenuItem _hover={{
                  backgroundColor:"red"
                }} isFocusable={false} _focus={{}}>Download</MenuItem>
                <MenuItem onClick={() => alert("Kagebunshin")}>Create a Copy</MenuItem>
              </MenuList>
            </>
          )}
        </Menu>
      </Flex>
    </Flex>
  );
}

export default Test;