import { Flex } from "@chakra-ui/layout";
import Text from "./Text";
import { useRadioGroup } from "@chakra-ui/radio";
import RadioCard from "./RadioCard";

const ColorPalette = () => {

	const options = ["پیشفرض", "جدیدترین", "گرانترین", "ارزانترین", "پرفروشترین"]
	const { getRadioProps } = useRadioGroup({
		name: "Ordering",
		defaultValue: "پیشفرض",
	})

	return (
		<Flex
			w="100%"
			flexDir="column"
		>
			<Text fontSize={{ base: "14px", md: "18px" }} variant="heading5" >
				انتخاب رنگ
            </Text>
			<Flex>
				{options.map((value, key) => {
					const radio = getRadioProps({ value })
					return (
						<RadioCard
							borderRadius="100%"
							use_as_color_pallete
							width="45px"
							height="45px"
							onClick={() => console.log(value)}
							key={key}
							radio={radio}
							margin=".5rem .3rem"
						/>
					)
				})}
			</Flex>
		</Flex>
	);
}

export default ColorPalette;