import { Flex } from "@chakra-ui/layout";
import Text from "../Text";
import InfoBox from "./InfoBox";

const ProfileInfo = () => {
	return (
		<Flex
			w="100%"
			h="340px"
			mr="2rem"
			borderRadius=".5rem"
			border="1px solid #CFCFCF"
			justifyContent="center"
			alignItems="flex-end"
			flexDir="column"
			overflow="hidden"
			p="1.5rem"
		>
			<Flex
				alignItems="center"
				pb="1rem"
				borderBottom="2px solid #0E668B"
				h="10%">
				<Text variant="heading5">
					اطلاعات شخصی
				</Text>
			</Flex>
			<Flex h="45%" w="100%">
				<InfoBox
					borderTop="none"
					borderLeft="none"
					borderBottom="none"
					title="نام و نام خانوادگی"
					value="ابوالفضل عمرانی"
					inputType="text"
				/>
				<InfoBox
					borderBottom="none"
					borderLeft="none"
					borderRight="none"
					borderTop="none"
					title="شماره تلفن همراه"
					value="09378239855"
					inputType="number"
				/>
			</Flex>
			<Flex h="45%" w="100%">
				<InfoBox
					borderLeft="none"
					borderBottom="none"
					title="شماره شناسنامه"
					value="3150526744"
					inputType="number"
				/>
				<InfoBox
					borderRight="none"
					borderLeft="none"
					borderBottom="none"
					title="پست الکترونیکی"
					value="abolfazl.omrani1999@gmail.com"
					inputType="email"
				/>
			</Flex>
		</Flex >
	);
}

export default ProfileInfo;