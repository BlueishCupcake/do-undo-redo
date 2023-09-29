import { useDispatch } from "react-redux";
import { changeMarker } from "../../store/konvaSlice";

export const SideBar = () => {
  const dispatch = useDispatch();

  const handleChangeMaker = (marker) => {
    dispatch(changeMarker(marker));
  };

  return (
    <div className="sidebar-div">
      <button onClick={() => handleChangeMaker("square")}>square</button>
      <button onClick={() => handleChangeMaker("circle")}>circle</button>
    </div>
  );
};
