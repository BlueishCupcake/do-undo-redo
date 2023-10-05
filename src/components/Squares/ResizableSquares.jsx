/* eslint-disable react/prop-types */
import { useRef, useEffect, useState } from "react";
import { Rect, Transformer } from "react-konva";
import { useDispatch } from "react-redux";
import { updateMarker } from "../../store/konvaSlice";

export const ResizableSquares = ({ x, y, fill, index }) => {
  const squareRef = useRef(null);
  const transformerRef = useRef(null);
  const dispatch = useDispatch();
  const [isSelected, setIsSelected] = useState(false);

  const handleTransformEnd = () => {
    const node = squareRef.current;
    const scaleX = node.scaleX();

    dispatch(
      updateMarker({
        markerType: "square",
        index: index,
        marker: {
          x: node.x(),
          y: node.y(),
          fill: fill,
          scaleX: scaleX,
        },
      })
    );

    setIsSelected(false);
  };
  const handleSelect = () => {
    setIsSelected(true);
  };

  const handleDeselect = () => {
    setIsSelected(false);
  };

  useEffect(() => {
    if (isSelected) {
      transformerRef.current.nodes([squareRef.current]);
    } else {
      transformerRef.current.nodes([]);
    }

    transformerRef.current.getLayer().batchDraw();
  }, [isSelected]);

  return (
    <>
      <Rect
        x={x}
        y={y}
        key={index}
        fill={fill}
        draggable
        width={50}
        height={50}
        ref={squareRef}
        onTransformEnd={handleTransformEnd}
        onDragEnd={handleTransformEnd}
        onClick={isSelected ? handleDeselect : handleSelect}
        onTap={isSelected ? handleDeselect : handleSelect}
      />
      <Transformer ref={transformerRef} />
    </>
  );
};
