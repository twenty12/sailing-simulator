import React, { useEffect, useState, useRef, useCallback } from "react";

export default function Sailboat({ boatId, position, onMouseUp, onMouseDown}) {
  const translateValue = `translate(${position.left}px, ${position.top}px)`;
  const styles = {
    zIndex: 10,
    position: "absolute",
    top: "0px",
    left: "0px",
    backgroundColor: "pink",
    width: "50px",
    height: "50px",
    transform: translateValue,
  };

  return (
    <div onMouseUp={onMouseUp} onMouseDown={(e) => onMouseDown(e, boatId)} style={styles}>
      {"BOAT"}
    </div>
  );
}
