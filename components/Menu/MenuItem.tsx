import { Button, Flex } from "@chakra-ui/react";
import { ISetCurrentCategory, setCurrentCategory } from "../../redux";
import Text from "../Text";

import { useRouter } from "next/router";
import { connect } from "react-redux";
import { Dispatch, useEffect } from "react";

interface MenuItem {
  text: string;
  id: number;
  setCurrentCategory: ({ name, id }: ISetCurrentCategory) => void;
  category_set: Array<any>;
  setIsMenuOpen: Dispatch<boolean>
}

const MenuItem = ({ text, id, setCurrentCategory, category_set, setIsMenuOpen }: MenuItem) => {
  const router = useRouter();
  useEffect(() => {
    console.log(category_set)
  }, [])
  return (
    <Flex minW="80px" m="0.5rem 0" flexDir="column">
      <Button
        p="0 1rem"
        color="white"
        dir="rtl"
        border="none"
        display="flex"
        borderRadius="0"
        alignItems="center"
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
          setIsMenuOpen(false)
          router.push({
            pathname: "/[category]",
            query: {
              category: text,
              order: "default"
            },
          });
          setCurrentCategory({ name: text, id });
        }}>
        <Text color="black" variant="heading6">{text}</Text>
      </Button>
      <Flex flexDir="column">
        {
          category_set.map(({ title, id }, key) => (
            <Button
              key={key}
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
                setIsMenuOpen(false)
                router.push({
                  pathname: "/[category]",
                  query: {
                    category: text,
                    order: "default"
                  },
                });
                setCurrentCategory({ name: text, id });
              }}>
              <Text color="#4a4a4a" variant="normalMedium">{title}</Text>
            </Button>
          ))
        }
      </Flex>
    </Flex>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  setCurrentCategory: (current: ISetCurrentCategory) =>
    dispatch(setCurrentCategory(current)),
});

export default connect(null, mapDispatchToProps)(MenuItem);
