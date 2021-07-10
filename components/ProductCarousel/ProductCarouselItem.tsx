import { Flex } from "@chakra-ui/layout";

const ProductCarouselItem = ({ imageUrl }) => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      h="400px"
      w="100%"
      m="auto">
      <img
        style={{
          borderRadius: ".5rem",
          width: "auto",
          maxHeight: "400px",
        }}
        src={imageUrl}
        alt="product image"
      />
    </Flex>
  );
};

export default ProductCarouselItem;
