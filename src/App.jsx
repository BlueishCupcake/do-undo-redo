import { useState, useEffect } from "react";
import "./App.css";
import { Stage, Layer, Rect } from "react-konva";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./store/konvaSlice";

let history = [
  {
    x: 20,
    y: 20,
  },
];

function App() {
  const historyStep = useSelector((state) => state.konva.value);
  const dispatch = useDispatch();
  const [position, setPosition] = useState({
    position: history[0],
  });

  useEffect(() => {
    // Initialize position state with the initial history value after Redux state has been updated
    setPosition({
      position: history[historyStep],
    });
  }, [historyStep]);

  const handleUndo = () => {
    if (historyStep === 0) return;

    const previous = history[historyStep];

    setPosition({
      position: previous,
    });
    dispatch(decrement());
  };

  const handleRedo = () => {
    if (historyStep === history.length - 1) return;

    dispatch(increment());

    const next = history[historyStep];

    setPosition({
      position: next,
    });
  };

  const handleDragEnd = (e) => {
    history = history.slice(0, historyStep + 1);

    const pos = {
      x: e.target.x(),
      y: e.target.y(),
    };

    // Increment the history step before updating the history array
    dispatch(increment());

    // Create a new copy of the history array and add the new position
    const newHistory = [...history.slice(0, historyStep + 1), pos];

    // Update the state with the new history array
    history = newHistory;

    setPosition({
      position: pos,
    });
  };

  return (
    <div className="card">
      <div className="stage-div">
        <Stage width={1000} height={300}>
          <Layer>
            <Rect
              x={position.position.x}
              y={position.position.y}
              width={50}
              height={50}
              fill="black"
              draggable
              onDragEnd={handleDragEnd}
            />
          </Layer>
        </Stage>
      </div>
      <span>Steps: {historyStep}</span>
      <div className="buttons">
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleRedo}>Redo</button>
      </div>
    </div>
  );
}

export default App;
