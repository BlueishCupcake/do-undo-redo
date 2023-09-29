import { useRef } from "react";
import "./App.css";
import { Stage, Layer } from "react-konva";
import { useSelector, useDispatch } from "react-redux";
import { increment, addMarker } from "./store/konvaSlice";
import { Squares, Circles, SideBar } from "./components";

function App() {
  const useKonvaStore = useSelector((state) => state.konva);
  const dispatch = useDispatch();
  const stageRef = useRef(null);

  const handleStageClick = () => {
    const stage = stageRef.current;
    const pointerPosition = stage.getPointerPosition();

    if (pointerPosition && useKonvaStore.markerType === "circle") {
      const newMarker = {
        x: pointerPosition.x,
        y: pointerPosition.y,
        fill: "red",
      };

      dispatch(addMarker({ markerType: "circle", marker: newMarker }));
      dispatch(increment());
    }

    if (pointerPosition && useKonvaStore.markerType === "square") {
      const newMarker = {
        x: pointerPosition.x,
        y: pointerPosition.y,
        fill: "blue",
      };

      dispatch(addMarker({ markerType: "square", marker: newMarker }));
      dispatch(increment());
    }
  };

  return (
    <>
      <span>Steps: {useKonvaStore.value}</span>
      <div className="card">
        <SideBar />
        <div className="stage-div">
          <Stage
            width={1000}
            height={700}
            ref={stageRef}
            onClick={handleStageClick}
          >
            <Layer>
              <Squares />
              <Circles />
            </Layer>
          </Stage>
        </div>
      </div>
    </>
  );
}

export default App;
