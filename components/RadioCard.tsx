import { Box } from "@chakra-ui/layout"
import { useRadio } from "@chakra-ui/radio"


interface IRadioCard {
    lable?: string;
    radio?: any;
    onClick?: () => void;
}

const RadioCard = ({ lable, radio, onClick }: IRadioCard) => {
    const { getInputProps, getCheckboxProps } = useRadio(radio)

    const input = getInputProps()
    const checkbox = getCheckboxProps()

    return (
        <Box as="label">
            <input {...input} />
            <Box
                m="1rem"
                {...checkbox}
                cursor="pointer"
                borderWidth="1px"
                borderRadius="md"
                boxShadow="md"
                fontFamily="iranSans"
                textAlign="center"
                _checked={{
                    bg: "red.500",
                    color: "white",
                    borderColor: "red.500",
                }}
                _focus={{
                    boxShadow: 0,
                    outline: 0
                }}
                px={5}
                py={3}
                onClick={onClick}
            >
                {lable}
            </Box>
        </Box>
    )
}

export default RadioCard