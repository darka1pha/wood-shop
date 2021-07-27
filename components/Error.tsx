import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { RiSignalWifiErrorLine } from "react-icons/ri";

const Error = () => {
  const router = useRouter();
  return (
    <Flex
      w="100%"
      h="100vh"
    >
      <Flex
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        w="100%"
        h="100%">
        <Icon
          as={RiSignalWifiErrorLine}
          h="120px"
          w="120px"
          color="#595959"
        />
        <Text
          color="#595959"
          fontWeight="bold"
          fontFamily="Vazir"
          fontSize="1.5rem">
          . مشکلی در برقراری ارتباط با سرور رخ داده است
        </Text>
        <Button
          _focus={{
            outline: 0
          }}
          mt="0.5rem"
          fontWeight="bold"
          fontFamily="Vazir"
          onClick={() => router.reload()}
        >
          تلاش مجدد
        </Button>
      </Flex>

    </Flex>
  );
}

export default Error;