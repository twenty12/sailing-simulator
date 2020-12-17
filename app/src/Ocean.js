import React, { useEffect, useState, useRef, useCallback } from "react";

import SailBoat from "./SailBoat";

const INITIAL_POSITION = {
  top: 0,
  left: 0,
};

export default function Ocean() {
  const [dragStartingPosition, setDragStartingPosition] = useState(
    [INITIAL_POSITION]
  );
  const [dragOffset, setDragOffset] = useState(
    [INITIAL_POSITION]
  );
  const [position, setPosition] = useState([INITIAL_POSITION]);
  const [idOfSelectedBoat, setIdOfSelectedBoat] = useState(0)
  const [sailBoatIds, setSailBoatIds] = useState([0]);
  const [isDragging, setIsDragging] = useState(false);

  const calculateMove = (oldPosition) => {
    const { left: offsetX, top: offsetY } = dragOffset
    const newPosition = {
      top: offsetY,
      left: offsetX,
    };
    let newArr = [...position]
    newArr[idOfSelectedBoat] = newPosition 
    setPosition(newArr);
  };

  const startDragging = (e) => {
    const newDragStartingPoint = {
      top: e.clientY,
      left: e.clientX,
    };
    setDragStartingPosition(newDragStartingPoint);
    // console.log("newDragStartingPoint", newDragStartingPoint);
    setIsDragging(true);
  };

  const handleMouseDown = (e, idOfSelectedBoat) => {
    setIdOfSelectedBoat(idOfSelectedBoat)
    if (!isDragging) {
    //   console.log("running here click down");
      startDragging(e);
    }
  };

  const handleMouseUp = (e) => {

    // console.log("running here click up");

    setIsDragging(false);
  };

  const onMouseMove = (e) => {

    // console.log('e.clientX', e.clientX)
    // console.log('e.clientY', e.clientY)
    // console.log('dragStartingPosition.left', dragStartingPosition.left)
    // console.log('dragStartingPosition.top', dragStartingPosition.top)
  if (isDragging === true) {
    const moveOffset = {
      left: e.clientX,
      top: e.clientY,
    };
    setDragOffset(moveOffset)
    // console.log("moveOffset", moveOffset);
    calculateMove(position);
  }
}

  const oceanStyles = {
    backgroundColor: "yellow",
    height: "500px",
    width: "500px",
    position: "relative",
  };
  const debugStyles = {
    position: "absolute",
    top: "500px",
    backgroundColor: "purple",
    color: "white",
  };
  const addBoat = () => {
    position.push()
    console.log('Position ', position)
    console.log(sailBoatIds.length)
    setSailBoatIds(sailBoatIds => [...sailBoatIds, sailBoatIds.length])
    setPosition(position => [...position, {top: 60, left: 60}])
    console.log(position)
    console.log(sailBoatIds)
  }

  const getSailBoats = () => {
      return (
        sailBoatIds.map((sailBoatId) => {
            return (
                  <SailBoat
                  boatId={sailBoatId}
                    onMouseUp={handleMouseUp}
                    onMouseDown={handleMouseDown}
                    key={sailBoatId}
                    position={position[sailBoatId]}
              />
            )
        })
      )
  }
  useEffect(() => {
      console.log('use effect get sailboat')
      getSailBoats()
    }, [sailBoatIds])

    // )});
  // create an array with ids of sailboats and add button that creates more sailboats.
  return (
    <>
    <button onClick={addBoat}>Launch Boat</button>
    <div
      onMouseMove={onMouseMove}
      onMouseUp={handleMouseUp}
      style={oceanStyles}
    >
      <div style={debugStyles}>
        <div>isDragging: {JSON.stringify(isDragging)}</div>
        <div>dragStartingPosition: {JSON.stringify(dragStartingPosition)}</div>
        <div>dragOffset: {JSON.stringify(dragOffset)}</div>
        <div>position: {JSON.stringify(position)}</div>
      </div>
      {getSailBoats()}
    </div>
    </>
  );
}
