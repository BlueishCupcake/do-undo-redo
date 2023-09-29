import { Rect } from "react-konva";
import { useSelector } from "react-redux";

export const Squares = () => {
  const useKonvaStore = useSelector((state) => state.konva);

  const squareList = useKonvaStore.markers.square;

  return (
    <>
      {squareList.map((eachSquare, index) => (
        <Rect
          x={eachSquare.x}
          y={eachSquare.y}
          width={50}
          height={50}
          key={index}
          fill={eachSquare.fill}
          draggable
        />
      ))}
    </>
  );
};
