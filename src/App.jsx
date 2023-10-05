import { useRef, useEffect, useState } from "react";
import "./App.css";
import { Stage, Layer, Image } from "react-konva";
import { useSelector, useDispatch } from "react-redux";
import { addMarker, changeMarker } from "./store/konvaSlice";
import { Squares, Circles, SideBar } from "./components";
import { v4 as uuidv4 } from "uuid";

function App() {
  const useKonvaStore = useSelector((state) => state.konva.present);
  const dispatch = useDispatch();
  const stageRef = useRef(null);

  const [image, setImage] = useState(null);
  const [stageSize, setStageSize] = useState({ width: 500, height: 500 });
  const scale = 1;

  useEffect(() => {
    const img = new window.Image();
    img.src = ""; // placeholder for api maybe
    img.onload = () => {
      setImage(img);
    };
  }, []);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // FileReader common browser object
      const reader = new FileReader();

      // onload is being called after the file is read
      reader.onload = (e) => {
        const img = new window.Image();
        img.src = e.target.result;

        // onload is being called after the image is read
        img.onload = () => {
          setImage(img);

          // sets konva stage to be the size of the image being used
          setStageSize({
            width: img.width,
            height: img.height,
          });
        };
      };

      // FileReader method for setting the result of onload into a dataURL, a base64-encoded string representing the file's data
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    const dataURL = stageRef.current.toDataURL(); // get stage's content as a data URL
    const link = document.createElement("a"); // creates a reference to simulate the user clicking an triggering a download event
    link.href = dataURL;
    link.download = "placeholder.png"; // filename will come for api (?)
    document.body.appendChild(link);
    link.click(); // the simulated user "click"
    document.body.removeChild(link);
  };

  const handleWheel = (e) => {
    // function for zoom in and out of the image
    e.evt.preventDefault();

    const scaleBy = 1.05;
    const stage = stageRef.current;
    const oldScale = stage.scaleX();

    // the function below makes that the point where the mouse is scrolling in the stage
    // would be in the center of the stage
    const mousePointTo = {
      x: stageSize.width / 2 / oldScale - stage.x() / oldScale,
      y: stageSize.height / 2 / oldScale - stage.y() / oldScale,
    };

    // Prevents zoom out greater than the image original scale
    const newScale = Math.max(
      1,
      e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy
    );

    stage.scale({ x: newScale, y: newScale });

    const newPos = {
      x: stageSize.width / 2 - mousePointTo.x * newScale,
      y: stageSize.height / 2 - mousePointTo.y * newScale,
    };
    stage.position(newPos);
    stage.batchDraw();
  };

  const handleStageClick = (e) => {
    const stage = stageRef.current;
    const pointerPosition = stage.getPointerPosition();

    // convert the stage coordinates to "layer" coordinates
    const layerX = pointerPosition.x / scale - stageRef.current.x() / scale;
    const layerY = pointerPosition.y / scale - stageRef.current.y() / scale;

    if (!pointerPosition || useKonvaStore.markerType === "") return;

    if (e.target.getAttr("draggable")) return;

    const newMarker = {
      id: uuidv4(),
      x: layerX,
      y: layerY,
      fill: useKonvaStore.markerColor,
    };

    dispatch(
      addMarker({ markerType: useKonvaStore.markerType, marker: newMarker })
    );

    dispatch(changeMarker(""));
    e.evt.stopPropagation();
  };

  const handleStageDrag = (pos) => {
    const { width: stageWidth, height: stageHeight } = stageSize;
    const scale = stageRef.current.scaleX();

    // calculates the current dimensions of the image based on the current
    // scale and original size
    const imageWidth = image.width * scale;
    const imageHeight = image.height * scale;

    // determinetes the new position of the stage based on the image drag
    // and ensure that the image stays within the bounds of the stage
    let newX = pos.x;
    let newY = pos.y;

    if (newX > 0) newX = 0;
    if (newY > 0) newY = 0;
    if (newX < stageWidth - imageWidth) newX = stageWidth - imageWidth;
    if (newY < stageHeight - imageHeight) newY = stageHeight - imageHeight;

    return {
      x: newX,
      y: newY,
    };
  };

  return (
    <>
      <input type="file" onChange={handleUpload} />
      <button onClick={handleDownload}>Download Content</button>
      <SideBar />
      <div className="card">
        <div className="stage-div">
          <Stage
            width={stageSize.width}
            height={stageSize.height}
            ref={stageRef}
            onClick={handleStageClick}
            scaleX={scale}
            scaleY={scale}
            onWheel={handleWheel}
            draggable
            dragBoundFunc={handleStageDrag}
          >
            <Layer>
              <Image image={image} />
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
