import { MouseEventHandler, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Box } from "@chakra-ui/layout";
import { useGetCategories } from "../../API";
import { useQueryClient } from "react-query";
import LandingSkeleton from "../Skeleton/LandingSkeleton";
import { MenuButton, Menu as CMenu, MenuList, MenuGroup, BoxProps, Icon, Flex, FlexProps } from "@chakra-ui/react";
import MenuItem from "./MenuItem";
import Text from "../Text";
import { FiShoppingBag } from "react-icons/fi";

const Menu = () => {
  const queryClient = useQueryClient()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const MotionFlex = motion<FlexProps>(Flex)

  // const [categories, setCategories] = useState(null)
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const { data: categories } = useGetCategories();
  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setVisible(prevScrollPos > currentScrollPos);
    setPrevScrollPos(currentScrollPos);
  };

  const variants = {
    visible: {
      x: "-.5rem",
      display: "flex",
      opacity: 1,
      transition: {
        type: "tween",
        ease: "easeInOut",
        duration: 0.4,
        display: {
          delay: 0.4,
          duration: 0.2
        },
      }
    },
    hidden: {
      x: "100px",
      display: "none",
      opacity: 0,
      transition: {
        type: "tween",
        ease: "easeInOut",
        duration: 0.4,
        display: {
          delay: 0.4,
          duration: 0.2
        },
      }
    }
  }




  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // setCategories(queryClient.getQueryData([`categories`]))
    console.log("Cats: ", categories)
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [prevScrollPos, visible, handleScroll]);

  return (
    <Box display={{ base: "none", md: "block" }}>
      <motion.div
        layout
        animate={{
          height: visible ? "60px" : "0",
          top: visible ? "85px" : "-10px",
          opacity: visible ? 1 : 0,
        }}
        transition={{
          type: "tween",
          delay: 0.02,
        }}
        style={{
          // padding: "4px 3px 12px 4px",
          width: "100%",
          zIndex: 3,
          position: "fixed",
          left: "0",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#42301e",
          flexDirection: "row-reverse",
        }}>

        <Box
          onMouseOutCapture={() => setIsMenuOpen(false)}
          onMouseOver={() => setIsMenuOpen(true)}
          pos="relative"
        >
          <Flex alignItems="center" mr="1rem" cursor="pointer">
            <Text color="white" variant="heading6">دسته بندی ها</Text>
            <Icon ml="0.2rem" color="white" as={FiShoppingBag} h="20px" w="20px" />
          </Flex>
          <motion.div
            animate={isMenuOpen ? "visible" : "hidden"}
            variants={variants}
            style={{
              borderRadius: "0.5rem",
              top: "2rem",
              right: "1rem",
              position: "absolute",
              backgroundColor: "white",
              direction: "rtl"
            }}
          >
            {categories?.map(({ title, id, category_set }, key: number) => (
              <MenuItem setIsMenuOpen={setIsMenuOpen} id={id} text={title} key={key} category_set={category_set} />
            ))}
          </motion.div>
        </Box>
      </motion.div>
    </Box>
  );
};

export default Menu;
