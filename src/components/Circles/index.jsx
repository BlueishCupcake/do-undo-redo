import { Circle } from "react-konva";
import { useSelector } from "react-redux";

export const Circles = () => {
  const useKonvaStore = useSelector((state) => state.konva);

  const circleList = useKonvaStore.markers.circle;

  return (
    <>
      {circleList.map((eachCircle, index) => (
        <Circle
          x={eachCircle.x}
          y={eachCircle.y}
          key={index}
          radius={25}
          fill={eachCircle.fill}
          draggable
        />
      ))}
    </>
  );
};
