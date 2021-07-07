import Icon from "@chakra-ui/icon";
import { Flex } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import { IconType } from "react-icons/lib";
import { connect } from "react-redux";
import { clearCurrentUser } from "../../../redux";
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
  clearCurrentUser: (data) => void;
}

const ProfileNavbarBtn = ({
  icon,
  onClick,
  title,
  iconSize,
  Component,
  exit,
  active,
  clearCurrentUser,
}: IProfileNavbarBtn) => {
  const router = useRouter();

  const onLogout = () => {
    router.push("/");
    clearCurrentUser(null);
  };

  return (
    <Flex
      m={{ base: 0, md: ".5rem 0" }}
      ml={{ base: active ? ".5rem" : 0, md: 0 }}
      onClick={!exit ? () => onClick(Component) : onLogout}
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

const mapDispatchToProps = (dispatch: any) => ({
  clearCurrentUser: (data) => dispatch(clearCurrentUser(data)),
});

export default connect(null, mapDispatchToProps)(ProfileNavbarBtn);
