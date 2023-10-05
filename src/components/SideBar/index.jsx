import { useDispatch, useSelector } from "react-redux";
import { changeMarker, changeMarkerColor } from "../../store/konvaSlice";
import { ActionCreators as UndoActionCreators } from "redux-undo";

export const SideBar = () => {
  const useKonvaStore = useSelector((state) => state.konva.present);
  const dispatch = useDispatch();

  const handleChangeMaker = (marker) => {
    dispatch(changeMarker(marker));
  };

  const handleChangeColor = (e) => {
    const color = e.target.value;

    dispatch(changeMarkerColor(color));
  };

  const handleUndo = () => {
    dispatch(UndoActionCreators.undo());
  };

  const handleRedo = () => {
    dispatch(UndoActionCreators.redo());
  };

  return (
    <div className="sidebar-div">
      <button onClick={() => handleChangeMaker("square")}>square</button>
      <button onClick={() => handleChangeMaker("circle")}>circle</button>
      <label htmlFor="favcolor">Select color:</label>
      <input
        type="color"
        id="favcolor"
        value={useKonvaStore.markerColor}
        onChange={handleChangeColor}
      ></input>
      <button onClick={handleUndo}>Undo</button>
      <button onClick={handleRedo}>Redo</button>
    </div>
  );
};
