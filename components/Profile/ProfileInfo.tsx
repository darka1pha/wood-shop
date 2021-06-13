import { Flex } from "@chakra-ui/layout";
import Text from "../Text";
import InfoBox from "./InfoBox";

const ProfileInfo = () => {
  return (
    <Flex
      w="100%"
      minH="340px"
      mr={{ base: 0, md: "2rem" }}
      borderRadius=".5rem"
      border="1px solid #CFCFCF"
      justifyContent="center"
      alignItems="flex-end"
      flexDir="column"
      overflow="hidden"
      p="1.5rem">
      <Flex
        alignItems="center"
        pb=".5rem"
        borderBottom="2px solid #0E668B"
        h={{ base: "35px", md: "35px" }}
        mb="2rem">
        <Text variant="heading5">اطلاعات شخصی</Text>
      </Flex>
      <Flex h="45%" w="100%" flexDir={{ base: "column", md: "row" }}>
        <InfoBox
          borderTop="none"
          borderLeft="none"
          borderBottom={{ base: "1px solid #CFCFCF", md: "none" }}
          borderRight={{ base: "none", md: "1px solid #CFCFCF" }}
          info_box_for="name_lastname"
          title="نام و نام خانوادگی"
          value="ابوالفضل عمرانی"
          inputType="text"
        />
        <InfoBox
          borderBottom="none"
          borderLeft="none"
          borderRight="none"
          borderTop="none"
          info_box_for="phonenumber"
          title="شماره تلفن همراه"
          value="09378239855"
          inputType="number"
        />
      </Flex>
      <Flex flexDir={{ base: "column", md: "row" }} h="45%" w="100%">
        <InfoBox
          borderLeft="none"
          info_box_for="national_id"
          borderRight={{ base: "none", md: "1px solid #CFCFCF" }}
          borderBottom="none"
          title="شماره شناسنامه"
          value="3150526744"
          inputType="number"
        />
        <InfoBox
          borderRight="none"
          borderLeft="none"
          borderBottom="none"
          info_box_for="email"
          title="پست الکترونیکی"
          value="abolfazl.omrani1999@gmail.com"
          inputType="email"
        />
      </Flex>
    </Flex>
  );
};

export default ProfileInfo;
