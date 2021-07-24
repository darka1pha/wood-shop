import { Box } from "@chakra-ui/layout";
import { useRadio } from "@chakra-ui/radio";

interface IRadioCard {
  lable?: string;
  radio?: any;
  onClick?: (e: any, ordering: string) => void;
  height?: string;
  width?: string;
  borderRadius?: string;
  image_url?: string;
  use_as_color_pallete?: boolean;
  margin?: string;
  ordering?: string;
}

const RadioCard = ({
  lable,
  radio,
  onClick,
  width,
  borderRadius,
  height,
  image_url,
  use_as_color_pallete,
  margin = "1rem",
  ordering
}: IRadioCard) => {
  const { getInputProps, getCheckboxProps } = useRadio(radio);
  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        m={margin}
        {...checkbox}
        cursor="pointer"
        borderWidth={use_as_color_pallete ? "3px" : "1px"}
        borderRadius={use_as_color_pallete ? borderRadius : "md"}
        boxShadow="md"
        fontFamily="Vazir"
        textAlign="center"
        h={use_as_color_pallete ? height : "auto"}
        w={use_as_color_pallete ? width : "auto"}
        bg={
          use_as_color_pallete
            ? "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStnZu3mIESjUwsAQSa25-GFsj_IGAUW6mLCQ&usqp=CAU')"
            : ""
        }
        _checked={{
          bg: use_as_color_pallete ? null : "red.500",
          color: "white",
          borderColor: "red.500",
        }}
        _focus={{
          boxShadow: 0,
          outline: 0,
        }}
        px={3}
        py={3}
        onClick={(e) => onClick(e, ordering)}
      >
        {lable}
      </Box>
    </Box>
  );
};

export default RadioCard;
