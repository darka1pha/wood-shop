import { Button, Collapse, Flex, Icon, useDisclosure } from "@chakra-ui/react"
import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Text from "./Text";

const ProductDiscription = () => {

	const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });

	return (
		<Flex
			flexDir="column"
			h="100%"
			w="100%"
			dir="rtl"
			m="1rem 0"
			pr={{ base: "1rem", md: 0 }}
		>
			<Flex
				alignItems="center"
			>
				<Icon
					border="2px solid #939393"
					h="20px"
					ml=".5rem"
					borderRadius=".3rem"
					w="20px"
					onClick={onToggle}
					as={!isOpen ? AiOutlinePlus : AiOutlineMinus}
					color="black"
					cursor="pointer"
				/>
				<Text variant="heading5">
					توضیحات
				</Text>
			</Flex>
			<Collapse in={isOpen}>
				<Text p=".5rem 2rem" color="black" variant="normalExt">
					لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
				</Text>
			</Collapse>
		</Flex >
	);
}

export default ProductDiscription;