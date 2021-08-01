import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import { useState } from "react";
import Text from "../Text";
import FilterItem from "./FilterItem";

import { HiSortAscending } from "react-icons/hi"
import Icon from "@chakra-ui/icon";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { useDisclosure } from "@chakra-ui/hooks";
import { useRadioGroup } from "@chakra-ui/radio";
import RadioCard from "../RadioCard";
import { useRouter } from "next/dist/client/router";

const Filter = ({ setOrder }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const router = useRouter()
	// const [active, setActive] = useState("پیشفرض")
	const { getRadioProps } = useRadioGroup({
		name: "Ordering",
		defaultValue: router.query.order === "default"
			? "پیشفرض"
			: router.query.order === "expencivest"
				? "گرانترین"
				: router.query.order === "cheapest"
					? "ارزانترین"
					: "پیشفرض"
	})

	const options = [{
		value: "پیشفرض",
		title: "default"
	}, {
		value: "ارزانترین",
		title: "cheapest"
	}, {
		value: "گرانترین",
		title: "expencivest"
	}]

	const onOrderClick = (e, ordering) => {
		router.push({
			pathname: '/[category]',
			query: {
				category: router.query.category,
				id: router.query.id,
				order: ordering
			}
		})
		setOrder(ordering)
	}

	return (
		<Flex
			h="45px"
			bgColor={{ base: "transparent", md: "itemsBg" }}
			alignItems="center"
			p={{ base: "0 .5rem 0 0", md: "0 2rem 0 1rem" }}
			dir="rtl"
			borderRadius=".5rem"
			mb="1rem"
		>
			<Text
				variant={"heading7"}
				fontSize={{ base: "10px", md: "12px" }}
				display={{ base: "none", md: "block" }}
			>
				مرتب کردن بر اساس
			</Text>
			<Flex
				mr={{ base: "0", md: "2rem" }}
				display={{ base: "none", md: "flex" }}
			>
				<FilterItem
					onClick={onOrderClick}
					isActive={router.query.order === "default"}
					type="پیشفرض"
					ordering="default"
				/>
				<FilterItem
					onClick={onOrderClick}
					isActive={router.query.order === "expencivest"}
					type="گرانترین"
					ordering="expencivest"
				/>
				<FilterItem
					onClick={onOrderClick}
					isActive={router.query.order === "cheapest"}
					type="ارزانترین"
					ordering="cheapest"
				/>

			</Flex>
			<Flex
				display={{ base: "flex", md: "none" }}
			>
				<Button
					_focus={{
						outline: 0
					}}
					_active={{
						outline: 0
					}}
					_hover={{
						outline: 0
					}}
					onClick={onOpen}
					fontFamily="Vazir"
					fontSize="12px"
					display="flex"
					bgColor="itemsBorder"
					h="35px"
					rightIcon={<Icon fontSize="1rem" as={HiSortAscending} color="black" />}
				>
					مرتب سازی
				</Button>
				<Modal
					isOpen={isOpen}
					onClose={onClose}>
					<ModalOverlay />
					<ModalContent h="480px" w="320px">
						<ModalCloseButton
							_focus={{
								outline: 0
							}}
							_active={{
								outline: 0
							}}
						/>
						<ModalBody >
							<ModalHeader
								fontFamily="Vazir"
								fontSize="18px"
								display="flex"
								alignItems="center"
								justifyContent="center"
							>
								مرتب سازی بر اساس
							</ModalHeader>
							{options.map(({ value, title }, key) => {
								const radio = getRadioProps({ value })
								return (
									<RadioCard ordering={title} onClick={onOrderClick} lable={value} key={key} radio={radio} />
								)
							})}
						</ModalBody>
					</ModalContent>
				</Modal>
			</Flex>
		</Flex>
	);
}

export default Filter;