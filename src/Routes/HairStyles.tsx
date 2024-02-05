import { useState, useRef, useEffect } from "react";
import { Container, Grid, GridItem } from "@chakra-ui/react";

function HairStyles() {
  const arr_grid = [
    { idx: 1, rowS: 2 },
    { idx: 2, rowS: 1 },
    { idx: 3, rowS: 1 },
    { idx: 4, rowS: 1 },
    { idx: 5, rowS: 2 },
    { idx: 6, rowS: 1 },
    { idx: 7, rowS: 1 },
    { idx: 8, rowS: 2 },
    { idx: 9, rowS: 1 },
    { idx: 10, rowS: 1 },
    { idx: 11, rowS: 1 },
    { idx: 12, rowS: 2 },
    { idx: 13, rowS: 1 },
    { idx: 14, rowS: 1 },
  ];

  const [selectedGrid, setSelectedGrid] = useState(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        // 클릭된 요소가 컨테이너 외부에 있다면 초기화
        setSelectedGrid(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, []);

  const handleGridClick = (index: any) => {
    setSelectedGrid((prev) => (prev === index ? 0 : index));
  };

  return (
    <Container maxW="8xl" bg="blackAlpha.200" color="white" ref={containerRef}>
      <Grid
        h="1500px"
        templateRows="repeat(6, 1fr)"
        templateColumns="repeat(3, 1fr)"
        gap={4}
        position="relative"
      >
        {arr_grid.map((item) => (
          <GridItem
            key={item.idx}
            rowSpan={item.rowS}
            colSpan={1}
            bg={selectedGrid === item.idx ? "white" : "tomato"}
            color="black"
            onClick={() => handleGridClick(item.idx)}
            style={{
              cursor: "pointer",
              transition: "all 0.3s ease",
              transform: selectedGrid === item.idx ? "scale(1.2)" : "scale(1)",
              zIndex: selectedGrid === item.idx ? 1 : "auto",
            }}
          >
            {item.idx}
          </GridItem>
        ))}
      </Grid>
    </Container>
  );
}

export default HairStyles;
