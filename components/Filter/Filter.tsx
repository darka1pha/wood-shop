import { Flex } from "@chakra-ui/layout";
import { useState } from "react";
import Text from "../Text";
import FilterItem from "./FilterItem";

const Filter = () => {

	const [active, setActive] = useState("پیشفرض")

	return (
		<Flex
			h="45px"
			bgColor="itemsBg"
			alignItems="center"
			p={{ base: "0 .5rem 0 .5rem", md: "0 2rem 0 1rem" }}
			dir="rtl"
			borderRadius=".5rem"
			mb="1rem"
		>
			<Text
				variant={"heading7"}
			>
				مرتب کردن بر اساس
      </Text>
			<Flex
				mr="2rem"
			>
				<FilterItem onClick={(e: any) => setActive("پیشفرض")} isActive={active === "پیشفرض"} type="پیشفرض" />
				<FilterItem onClick={(e: any) => setActive("جدیدترین")} isActive={active === "جدیدترین"} type="جدیدترین" />
				<FilterItem onClick={(e: any) => setActive("گرانترین")} isActive={active === "گرانترین"} type="گرانترین" />
				<FilterItem onClick={(e: any) => setActive("ارزانترین")} isActive={active === "ارزانترین"} type="ارزانترین" />
				<FilterItem onClick={(e: any) => setActive("پرفروشترین")} isActive={active === "پرفروشترین"} type="پرفروشترین" />
			</Flex>
		</Flex>
	);
}

export default Filter;