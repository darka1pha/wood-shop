import { Box } from "@chakra-ui/layout";
import { useState } from "react";

interface PanelItem {
  name?: string;
  color?: string;
  id?: number;
}

const PanelItem = ({ name, color = "black", id }: PanelItem) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <Box
      m=".5rem"
      cursor="pointer"
      color={isActive ? "active" : color}
      onClick={() => setIsActive(!isActive)}
      fontWeight={isActive ? "semibold" : "normal"}>
      {name}
    </Box>
  );
};

export default PanelItem;
