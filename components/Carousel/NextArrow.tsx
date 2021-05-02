import Icon from "@chakra-ui/icon";
import { Box } from "@chakra-ui/layout";
import { MdKeyboardArrowRight } from "react-icons/md";

interface ICarouselArrow {
    rotate?: string;
    type?: string;
    otherProps?: any;
}

const NextArrow = ({ rotate, type, ...otherProps }: ICarouselArrow) => {
    const { onClick }: any = otherProps;
    return (
        <Box
            onClick={onClick}
            borderRadius="100%"
            lineHeight="0"
            className="customArrow"
            pos="absolute"
            h="45px"
            w="45px"
            bg="white"
            top="50%"
            right="0"
            zIndex="2"
            display={{ base: "none", md: "flex" }}
            alignItems="center"
            fontSize="2rem"
            justifyContent="center"
            cursor="pointer"
        >
            <Icon
                as={MdKeyboardArrowRight}
                color="black"
            />
        </Box>
    );
}

export default NextArrow;