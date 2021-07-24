import Icon from "@chakra-ui/icon";
import { Box } from "@chakra-ui/layout";
import { Ref } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";

interface ICarouselArrow {
    rotate?: string;
    type?: string;
    buttonRef: Ref<HTMLDivElement>
    otherProps?: any;
}

const NextArrow = ({ rotate, type, buttonRef, ...otherProps }: ICarouselArrow) => {
    const { onClick }: any = otherProps;
    return (
        <Box
            ref={buttonRef}
            onClick={onClick}
            borderRadius="100%"
            lineHeight="0"
            className="customArrow"
            pos="absolute"
            h="45px"
            w="45px"
            bg="white"
            top="50%"
            left="0"
            zIndex="2"
            display={{ base: "none", md: "flex" }}
            alignItems="center"
            fontSize="2rem"
            justifyContent="center"
            cursor="pointer"
        >
            <Icon
                as={MdKeyboardArrowLeft}
                color="black"
            />
        </Box>
    );
}

export default NextArrow;