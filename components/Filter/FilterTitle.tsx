import { Box } from "@chakra-ui/layout";

interface CategoryTitle {
  title: string | string[];
}

const GategoryTitle = ({ title }: CategoryTitle) => {
  return (
    <Box
      borderBottom="1px solid #c6c6c6"
      fontFamily="iranSans"
      m="1rem 0"
      p=".5rem"
      textAlign="center">
      {title}
    </Box>
  );
};

export default GategoryTitle;
