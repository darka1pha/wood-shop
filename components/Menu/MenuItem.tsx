import { Button } from "@chakra-ui/react";
import { ISetCurrentCategory, setCurrentCategory } from "../../redux";
import Text from "../Text";

import { useRouter } from "next/router";
import { connect } from "react-redux";

interface MenuItem {
  text: string;
  id: number;
  setCurrentCategory: ({ name, id }: ISetCurrentCategory) => void;
}

const MenuItem = ({ text, id, setCurrentCategory }: MenuItem) => {
  const router = useRouter();
  return (
    <Button
      p="0 1rem"
      color="white"
      dir="rtl"
      border="none"
      display="flex"
      borderRadius="0"
      alignItems="center"
      borderLeft="0.5px solid #FFFFFF"
      justifyContent="flex-start"
      _hover={{
        bg: "transparent",
      }}
      _active={{
        bg: "transparent",
      }}
      _focus={{
        outline: "none",
      }}
      variant="ghost"
      onClick={() => {
        router.push({
          pathname: "/[category]",
          query: {
            category: text,
            order: "default"
          },
        });
        setCurrentCategory({ name: text, id });
      }}>
      <Text variant="normal">{text}</Text>
    </Button>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  setCurrentCategory: (current: ISetCurrentCategory) =>
    dispatch(setCurrentCategory(current)),
});

export default connect(null, mapDispatchToProps)(MenuItem);
