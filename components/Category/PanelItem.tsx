import { Box } from "@chakra-ui/layout";
import Link from "next/link";
import { useState } from "react";

interface PanelItem {
  name?: string;
  color?: string;
  id?: number;
  activeId?: number;
  onClick: () => void;
  categoryTitle: string;
}

const PanelItem = ({
  name,
  color = "black",
  id,
  onClick,
  activeId,
  categoryTitle
}: PanelItem) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <Box
      m=".5rem"
      cursor="pointer"
      color={id === activeId ? "active" : color}
      onClick={onClick}
      fontFamily="Vazir"
      fontWeight={id === activeId ? "semibold" : "normal"}>
      <Link href={{
        pathname: "/[category]",
        query: {
          category: categoryTitle,
          id: id,
          order: "default",
        },
      }}>
        {name}
      </Link>
    </Box>
  );
};

export default PanelItem;
