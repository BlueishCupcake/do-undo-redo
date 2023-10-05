import { useSelector } from "react-redux";
import { ResizableSquares } from "./ResizableSquares";

export const Squares = () => {
  const useKonvaStore = useSelector((state) => state.konva.present);

  const squareList = useKonvaStore.markers.square;

  return (
    <>
      {squareList.map((eachSquare) => (
        <ResizableSquares
          x={eachSquare.x}
          y={eachSquare.y}
          key={eachSquare.id}
          index={eachSquare.id}
          fill={eachSquare.fill}
          off
        />
      ))}
    </>
  );
};
