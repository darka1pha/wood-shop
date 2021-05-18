import { Flex } from "@chakra-ui/layout";
import { Text } from ".";

const DeliveryTime = () => {
    return (
        <Flex m="1rem 0">
            <Text variant="heading7">
                زمان تحویل :&nbsp;
            </Text>
            <Text color="#348541" variant="heading7">
                در صورت موجود نبودن طی 8 روز به باربری تحویل داده میشود.
            </Text>
        </Flex>
    );
}

export default DeliveryTime;