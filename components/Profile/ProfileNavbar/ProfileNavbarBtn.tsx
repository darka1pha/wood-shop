import Icon from "@chakra-ui/icon";
import { Flex } from "@chakra-ui/layout";
import { Dispatch, SetStateAction } from "react";
import { IconType } from "react-icons/lib";
import Text from "../../Text";

interface IProfileNavbarBtn {
  icon?: IconType;
  onClick?: Dispatch<
    SetStateAction<{
      Component: JSX.Element;
      title: string;
    }>
  >;
  title?: string;
  iconSize?: string;
  Component?: {
    Component: JSX.Element;
    title: string;
  };
  exit?: boolean;
  active?: boolean;
}

const ProfileNavbarBtn = ({
  icon,
  onClick,
  title,
  iconSize,
  Component,
  exit,
  active,
}: IProfileNavbarBtn) => {
  return (
    <Flex
      m={{ base: 0, md: ".5rem 0" }}
      ml={{ base: active ? ".5rem" : 0, md: 0 }}
      onClick={!exit ? () => onClick(Component) : () => alert("Exit profile")}
      alignItems="center"
      justifyContent="space-between"
      cursor="pointer">
      <Text
        color={active ? "#0E668B" : "#717171"}
        fontWeight={active ? "600" : "400"}
        variant="normalExt"
        display={{ base: active ? "flex" : "none", md: "flex" }}>
        {title}
      </Text>
      <Icon
        fontWeight={active ? "600" : "400"}
        ml=".5rem"
        fontSize={iconSize}
        as={icon}
        color={active ? "#0E668B" : "#717171"}
      />
    </Flex>
  );
};

export default ProfileNavbarBtn;
