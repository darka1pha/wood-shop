import { Flex } from "@chakra-ui/layout";
import { Radio } from "@chakra-ui/radio";
import { Text } from ".";

interface IPaymentAddress {
  type?: string;
  value?: string;
  content?: string;
}

const PaymentSend = ({ type, value, content }: IPaymentAddress) => {
  return (
    <Flex justifyContent="flex-end" m="1rem" fontFamily="iranSans">
      <Radio
        cursor="pointer"
        display="flex"
        flexDir="row-reverse"
        ml=".5rem"
        value={value}
        colorScheme="orange"
        size="lg"
        _focus={{
          outline: 0,
        }}>
        <Text color="black" cursor="pointer" mr=".5rem" variant="normal">
          {content}
        </Text>
      </Radio>
    </Flex>
  );
};

export default PaymentSend;
