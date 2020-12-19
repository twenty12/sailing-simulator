import React, { useEffect, useState, useRef, useCallback } from "react";

export default function Sailboat({ boatId, position, onMouseUp, onMouseDown, onMouseEnter, onMouseLeave, height, width, hover}) {
  const translateValue = `translate(${position.left}px, ${position.top}px)`;
  const styles = {
    zIndex: 10,
    position: "absolute",
    top: "0px",
    left: "0px",
    backgroundColor: "pink",
    width: width + "px",
    height: height + "px",
    transform: translateValue,
    border: '1px solid transparent'
  };
  if (hover) {
      styles.border = '1px solid black'
  }
  return (
    <div
        onMouseEnter={(e) => onMouseEnter(e, boatId)}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseDown={(e) => onMouseDown(e, boatId)}
        style={styles}>
      {"BOAT"}
    </div>
  );
}
