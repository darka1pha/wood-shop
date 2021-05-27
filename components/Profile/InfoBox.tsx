import { Flex } from "@chakra-ui/layout";
import {
	Button,
	FlexProps,
	Icon,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure

} from "@chakra-ui/react"

import { FiEdit3 } from "react-icons/fi"
import Text from "../Text";

interface IInfoBox extends FlexProps {
	title?: string;
	value?: string;
	inputType?: string;
}

const InfoBox = ({ title, inputType, value, ...props }: IInfoBox) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	return (
		<>
			<Flex
				p="2rem 1rem"
				justifyContent="flex-start"
				flexDir="column"
				w="50%"
				border="1px solid #CFCFCF"
				alignItems="flex-start"
				{...props}
			>
				<Flex
					justifyContent="space-between"
					flexDir="row-reverse"
					alignItems="center"
					w="100%"
				>
					<Text color="#424750" variant="normalExt">
						{
							title
						}
					</Text>
					<Icon
						as={FiEdit3}
						cursor="pointer"
						onClick={onOpen}
						fontSize="1.3rem"
					/>
				</Flex>
				<Flex w="100%" flexDir="row-reverse">
					<Text mt=".5rem" color="#717171" variant="normalExt">
						{
							value
						}
					</Text>
				</Flex>
			</Flex>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent display="flex" dir="rtl">
					<ModalHeader
						fontFamily="iranSans"
						fontSize="16px"
						borderBottom="1px solid #DFDFDF"
						ml="2rem"
						mr="2rem"
						pr="0"
					>
						{
							title
						}
					</ModalHeader>
					<ModalCloseButton
						_focus={{
							outline: 0
						}}
						top=".5rem"
						right="92%" />

					<ModalBody
						flexDir="column"
						display="flex"
						as="form"
					>
						<Input
							type={inputType}
							_focus={{
								outline: "none"
							}}
						/>
					</ModalBody>
					<ModalFooter>
						<Button
							fontFamily="iranSans"
							colorScheme="blue"
						>ثبت</Button>
					</ModalFooter>
				</ModalContent>
			</Modal >
		</>
	)
}

export default InfoBox;