import { useState } from "react";
import "./App.css";

import { createRoot } from "react-dom/client";
import { Stage, Layer, Rect, Text } from "react-konva";

let history = [
  {
    x: 20,
    y: 20,
  },
];
let historyStep = 0;

function App() {
  const [position, setPosition] = useState({
    position: history[0],
  });

  const handleUndo = () => {
    if (historyStep === 0) return;

    historyStep -= 1;

    const previous = history[historyStep];

    setPosition({
      position: previous,
    });
  };

  const handleRedo = () => {
    if (historyStep === history.length - 1) return;

    historyStep += 1;

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

    history = history.concat([pos]);

    historyStep += 1;

    setPosition({
      position: pos,
    });
  };

  return (
    <>
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
    </>
  );
}

export default App;
