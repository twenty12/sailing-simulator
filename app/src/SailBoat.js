import React, { useEffect, useState, useRef } from "react";

import sailboat from "./sailboat.svg";

function SailBoat(props) {
    const [isMoving, setIsIsMoving] = useState(false);
    const boatRef = useRef(null);
    const [position, setPosition] = useState([props.style.left, 0]);
  
    function onMouseMove(e) {
      if (!isMoving) return;
      setPosition([
        e.movementX + boatRef.current.offsetLeft,
        e.movementY + boatRef.current.offsetTop,
      ]);
    }
  
    function onMouseUp(e) {
      setIsIsMoving(false);
    }
  
    function onMouseDown(e) {
      setIsIsMoving(true);  
      e.preventDefault();
    }

    useEffect(() => {
        if (isMoving) {
          document.addEventListener("mouseup", onMouseUp);
          document.addEventListener("mousemove", onMouseMove);
        } else {
          document.removeEventListener("mouseup", onMouseUp);
          document.removeEventListener("mousemove", onMouseMove);
        }
        return () => {
          document.removeEventListener("mouseup", onMouseUp);
          document.removeEventListener("mousemove", onMouseMove);
        };
      }, [isMoving]);

    useEffect(() => {
      boatRef.current.addEventListener("mousedown", onMouseDown);
  
      return () => {
        boatRef.current.removeEventListener("mousedown", onMouseDown);
      };
    }, [boatRef.current]);
  

  
    return (
        <div
          ref={boatRef}
          style={{
            position: "absolute",
            width: 70,
            height: 70,
            left: position[0],
            top: position[1],
          }}
        >
      <img src={sailboat} className="" alt="yacht" />

        </div>
      );
  }

SailBoat.defaultProps = {style: {left: 0}}

export default SailBoat;
