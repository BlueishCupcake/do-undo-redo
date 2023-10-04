import { useSelector } from "react-redux";
import { ResizableCircle } from "./ResizableCircle";

export const Circles = () => {
  const useKonvaStore = useSelector((state) => state.konva.present);

  const circleList = useKonvaStore.markers.circle;

  return (
    <>
      {circleList.map((eachCircle, index) => (
        <ResizableCircle
          x={eachCircle.x}
          y={eachCircle.y}
          fill={eachCircle.fill}
          index={index}
          key={index}
          off
        />
      ))}
    </>
  );
};
