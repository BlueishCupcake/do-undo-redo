import { useDispatch, useSelector } from "react-redux";
import { changeMarker, changeMarkerColor } from "../../store/konvaSlice";

export const SideBar = () => {
  const useKonvaStore = useSelector((state) => state.konva);
  const dispatch = useDispatch();

  const handleChangeMaker = (marker) => {
    dispatch(changeMarker(marker));
  };

  const handleChangeColor = (e) => {
    const color = e.target.value;

    dispatch(changeMarkerColor(color));
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
    </div>
  );
};
