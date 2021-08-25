import { Flex,Text } from "@chakra-ui/layout";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import InfoBox from "./InfoBox";
import { IUser } from "../../redux";
import Head from "next/head";

const ProfileInfo = ({ currentUser }: IUser) => {
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
      <Head>
        <title>اطلاعات حساب کاربری</title>
        <meta name="description" content="اصلاعات پروفایل کاربر" />
        <meta name="keywords" content="پروفایل,اطلاعات کاربری,فروشگاه آنلاین" />
        <meta property="og:title" content="اطلاعات حساب کاربری" />
        <meta property="og:description" content="اصلاعات پروفایل کاربر" />
        <meta property="og:type" content="website" />
      </Head>
      <Flex
        alignItems="center"
        pb=".5rem"
        borderBottom="2px solid #0E668B"
        h={{ base: "35px", md: "35px" }}
        mb="2rem">
        <Text fontFamily="VazirBold" fontSize={18}>اطلاعات شخصی</Text>
      </Flex>
      <Flex h="45%" w="100%" flexDir={{ base: "column", md: "row" }}>
        <InfoBox
          borderTop="none"
          borderLeft="none"
          borderBottom={{ base: "1px solid #CFCFCF", md: "none" }}
          borderRight={{ base: "none", md: "1px solid #CFCFCF" }}
          info_box_for="name_lastname"
          title="نام و نام خانوادگی"
          value={currentUser.first_name + " " + currentUser.last_name}
          inputType="text"
        />
        <InfoBox
          borderBottom="none"
          borderLeft="none"
          borderRight="none"
          borderTop="none"
          info_box_for="phonenumber"
          title="شماره تلفن همراه"
          value={currentUser.phone_number}
          inputType="number"
        />
      </Flex>
      <Flex flexDir={{ base: "column", md: "row" }} h="45%" w="100%">
        <InfoBox
          borderLeft="none"
          info_box_for="national_id"
          borderRight={{ base: "none", md: "1px solid #CFCFCF" }}
          borderBottom="none"
          title="کد ملی"
          value={currentUser.national_id}
          inputType="number"
        />
        {currentUser.is_new ? (
          <InfoBox
            borderRight="none"
            borderLeft="none"
            borderBottom="none"
            info_box_for="password"
            title="رمز عبور"
            value="*********"
            inputType="password"
          />
        ) : (
          <InfoBox
            borderRight="none"
            borderLeft="none"
            borderBottom="none"
            info_box_for="change_password"
            title="تغییر رمز عبور"
            value="*********"
            inputType="password"
          />
        )}
      </Flex>
    </Flex>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(ProfileInfo);
