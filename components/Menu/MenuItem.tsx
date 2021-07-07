import { Button } from "@chakra-ui/react";

import Text from "../Text";

import { useRouter } from "next/router";

interface MenuItem {
  text: string;
}

const MenuItem = ({ text }: MenuItem) => {
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
          query: { category: text },
        });
      }}>
      <Text variant="normal">{text}</Text>
    </Button>
  );
};

export default MenuItem;
