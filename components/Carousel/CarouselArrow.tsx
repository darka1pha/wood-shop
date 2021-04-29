import Icon from "@chakra-ui/icon";
import { Box } from "@chakra-ui/layout";
import { MdKeyboardArrowLeft } from "react-icons/md";

interface ICarouselArrow {
    rotate?: string;
    type?: string;
    otherProps?: any;
}

const CarouselArrow = ({ rotate, type, ...otherProps }: ICarouselArrow) => {
    const { onClick }: any = otherProps;
    return (
        <Box
            onClick={onClick}
            borderRadius="100%"
            pos="absolute"
            h="45px"
            w="45px"
            bg="white"
            transform={`rotate(${rotate}deg)`}
            top={"45%"}
            left={type !== "right" ? "1rem" : "auto"}
            right={type === "right" ? "1rem" : "auto"}
            zIndex="2"
            display="flex"
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

export default CarouselArrow;