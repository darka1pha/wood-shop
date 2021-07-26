import { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import { motion } from "framer-motion";
import { Box } from "@chakra-ui/layout";
import { useGetCategories } from "../../API";
import { useQueryClient } from "react-query";

const Menu = () => {
  const queryClient = useQueryClient()
  const [categories, setCategories] = useState(null)
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  // const { data: categories } = useGetCategories();
  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setVisible(prevScrollPos > currentScrollPos);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    setCategories(queryClient.getQueryData([`categories`]))
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible, handleScroll, queryClient.getQueryData([`categories`])]);

  if (!categories) return <h1>chizi nis</h1>;

  return (
    <Box display={{ base: "none", md: "block" }}>
      <motion.div
        layout
        animate={{
          top: visible ? "85px" : "-10px",
          opacity: visible ? 1 : 0,
        }}
        transition={{
          type: "tween",
          delay: 0.02,
        }}
        style={{
          padding: "4px 3px 8px 3px",
          width: "100%",
          zIndex: 3,
          position: "fixed",
          left: "0",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#42301e",
          flexDirection: "row-reverse",
        }}>
        {categories.map(({ title, id }, key: number) => (
          <MenuItem id={id} text={title} key={key} />
        ))}
      </motion.div>
    </Box>
  );
};

export default Menu;
