import { Box } from "@chakra-ui/layout";
import { useState } from "react";

interface PanelItem {
  name?: string;
  color?: string;
  id?: number;
  activeId?: number;
  onClick: () => void;
}

const PanelItem = ({
  name,
  color = "black",
  id,
  onClick,
  activeId,
}: PanelItem) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <Box
      m=".5rem"
      cursor="pointer"
      color={id === activeId ? "active" : color}
      onClick={onClick}
      fontWeight={id === activeId ? "semibold" : "normal"}>
      {name}
    </Box>
  );
};

export default PanelItem;
