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

  const handleStageClick = (e) => {
    const stage = stageRef.current;
    const pointerPosition = stage.getPointerPosition();

    if (!pointerPosition || useKonvaStore.markerType === "") return;

    if (e.target.getAttr("draggable")) return;

    const newMarker = {
      x: pointerPosition.x,
      y: pointerPosition.y,
      fill: useKonvaStore.markerColor,
    };

    dispatch(
      addMarker({ markerType: useKonvaStore.markerType, marker: newMarker })
    );
    dispatch(increment());
    e.evt.stopPropagation();
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
