import { Avatar } from "@chakra-ui/avatar";
import { Flex } from "@chakra-ui/layout";
import Text from "../../Text";

interface IUserInfo {
  name?: string;
  phone_number?: string;
}

const UserInfo = ({ name, phone_number }: IUserInfo) => {
  return (
    <Flex flexDir="row-reverse" w="100%">
      <Avatar
        name={name}
        bgColor="violet"
        h="50px"
        w="50px"
        fontFamily="Vazir"
      />
      <Flex
        flexDir="column"
        mr=".7rem"
        justifyContent="center"
        alignItems="flex-end">
        <Text variant="heading6">{name}</Text>
        <Text
          mt=".2rem"
          color="#717171"
          variant="heading7"
          letterSpacing=".1rem">
          {phone_number}
        </Text>
      </Flex>
    </Flex>
  );
};

export default UserInfo;
