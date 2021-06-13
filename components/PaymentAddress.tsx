import { Flex } from "@chakra-ui/layout";
import { Radio } from "@chakra-ui/radio";
import { Text } from ".";

interface IPaymentAddress {
  address?: string;
  value?: string;
  city?: string;
  state?: string;
}

const PaymentAddress = ({ address, value, city, state }: IPaymentAddress) => {
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
          {state + " -  " + city + " , " + address}
        </Text>
      </Radio>
    </Flex>
  );
};

export default PaymentAddress;
