import { useSelector } from "react-redux";
import { ResizableSquares } from "./ResizableSquares";

export const Squares = () => {
  const useKonvaStore = useSelector((state) => state.konva);

  const squareList = useKonvaStore.markers.square;

  console.log(squareList);

  return (
    <>
      {squareList.map((eachSquare, index) => (
        <ResizableSquares
          x={eachSquare.x}
          y={eachSquare.y}
          key={index}
          fill={eachSquare.fill}
          off
        />
      ))}
    </>
  );
};
