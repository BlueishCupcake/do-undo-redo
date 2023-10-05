/* eslint-disable react/prop-types */
import { useRef, useEffect, useState } from "react";
import { Circle, Transformer } from "react-konva";
import { useDispatch } from "react-redux";
import { updateMarker } from "../../store/konvaSlice";

export const ResizableCircle = ({ x, y, fill, index }) => {
  const circleRef = useRef(null);
  const transformerRef = useRef(null);
  const dispatch = useDispatch();
  const [isSelected, setIsSelected] = useState(false);

  const handleTransformEnd = () => {
    const node = circleRef.current;
    const scaleX = node.scaleX();
    const radius = node.radius() * scaleX;

    dispatch(
      updateMarker({
        markerType: "circle",
        index: index,
        marker: {
          x: node.x(),
          y: node.y(),
          fill: fill,
          scaleX: scaleX,
          radius: radius,
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
      transformerRef.current.nodes([circleRef.current]);
    } else {
      transformerRef.current.nodes([]);
    }

    transformerRef.current.getLayer().batchDraw();
  }, [isSelected]);

  return (
    <>
      <Circle
        x={x}
        y={y}
        key={index}
        radius={25}
        fill={fill}
        draggable
        ref={circleRef}
        onTransformEnd={handleTransformEnd}
        onDragEnd={handleTransformEnd}
        onClick={isSelected ? handleDeselect : handleSelect}
        onTap={isSelected ? handleDeselect : handleSelect}
      />
      <Transformer ref={transformerRef} />
    </>
  );
};
