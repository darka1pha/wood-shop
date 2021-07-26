import { Flex } from "@chakra-ui/layout";

const CarouselThumb = ({ imageUrl }) => {
  return (
    <Flex
      cursor="pointer"
      h="80px"
      w="80px"
      m=".5rem auto"
      bgImage={`url(${imageUrl})`}
      bgSize="cover"
      bgRepeat="no-repeat"
      borderRadius=".5rem"
    />
  );
};

export default CarouselThumb;
