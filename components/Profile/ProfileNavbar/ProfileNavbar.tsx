import { Flex } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect } from "react";
import UserInfo from "./UserInfo";
import { BsPerson } from "react-icons/bs";
import { IoHeartOutline, IoExitOutline } from "react-icons/io5";
import { GoNote } from "react-icons/go";
import { RiRoadMapLine, RiRouteLine } from "react-icons/ri";

import ProfileNavbarBtn from "./ProfileNavbarBtn";

import ProfileInfo from "../ProfileInfo";
import UserFavorites from "../UserFavorites";
import Orders from "../Orders";
import Addresses from "../Addresses";

interface IProfileNavbar {
  setCurrentPage?: Dispatch<
    SetStateAction<{
      Component: JSX.Element;
      title: string;
    }>
  >;
  currentPage?: {
    Component: JSX.Element;
    title: string;
  };
}

const ProfileNavbar = ({ setCurrentPage, currentPage }: IProfileNavbar) => {
  return (
    <Flex
      p="1rem"
      w={{ base: "100%", md: "280px" }}
      border="1px solid #CFCFCF"
      borderRadius=".5rem"
      justifyContent={{ base: "flex-start", md: "center" }}
      alignItems="center"
      flexDir="column"
      h={{ base: "160px", md: "340px" }}
      mb={{ base: "1rem", md: 0 }}>
      <UserInfo />
      <Flex w="85%" m="1rem 0" h="1px" bgColor="rgba(207, 207, 207, 0.37)" />
      <Flex
        w="100%"
        flexDir={{ base: "row-reverse", md: "column" }}
        alignItems="flex-end">
        <ProfileNavbarBtn
          title="اطلاعات حساب کاربری"
          icon={BsPerson}
          onClick={setCurrentPage}
          iconSize="1.5rem"
          Component={{
            Component: <ProfileInfo />,
            title: "ProfileInfo",
          }}
          active={currentPage.title === "ProfileInfo" ? true : false}
        />
        <ProfileNavbarBtn
          title="علاقه مندی ها"
          icon={IoHeartOutline}
          onClick={setCurrentPage}
          iconSize="1.5rem"
          Component={{
            Component: <UserFavorites />,
            title: "favorites",
          }}
          active={currentPage.title === "favorites" ? true : false}
        />
        <ProfileNavbarBtn
          title="سفارشات"
          icon={GoNote}
          onClick={setCurrentPage}
          iconSize="1.5rem"
          Component={{
            Component: <Orders />,
            title: "orders",
          }}
          active={currentPage.title === "orders" ? true : false}
        />
        <ProfileNavbarBtn
          title="آدرس ها"
          icon={RiRoadMapLine}
          onClick={setCurrentPage}
          iconSize="1.5rem"
          Component={{
            Component: <Addresses />,
            title: "addresses",
          }}
          active={currentPage.title === "addresses" ? true : false}
        />
        <ProfileNavbarBtn
          title="خروج"
          icon={IoExitOutline}
          iconSize="1.5rem"
          exit
        />
      </Flex>
    </Flex>
  );
};

export default ProfileNavbar;
