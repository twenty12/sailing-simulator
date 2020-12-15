import React, { useEffect, useState, useRef, useCallback } from "react";

import sailboat from "./sailboat.svg";

function SailBoat(props) {
    const [isMoving, setIsIsMoving] = useState(false);
    const boatRef = useRef(null);
    const [position, setPosition] = useState([props.style.left, 0]); // change to posiotn

    const onMouseMove = useCallback(
        (e) => {
            // Change this to translate
            setPosition([
                e.movementX + boatRef.current.offsetLeft,
                e.movementY + boatRef.current.offsetTop,
            ]);
            e.preventDefault();
        },
        [boatRef.current]
    );

    const onMouseUp = useCallback(
        (e) => {
            console.log('not moving')
            setIsIsMoving(false);
        },
        [boatRef.current]
    );

    const onMouseDown = useCallback(
        (e) => {
            console.log('moving')
            setIsIsMoving(true);
        },
        [boatRef.current]
    );

// NOTES:
// The only mounting and unmounting that happens is when and HTML ellemetn is created and removed
// Look up up article on why to use Usetranslate instead of styles (REMOVE STYLES AND USE PAINT)
// HTML elements are classes on not objects
// CHECKOUT how to turn paint lines (frames per second)
// how do you run an effect that only runs one time...understand the reason why the second param of
// create a use effect that uses an onload 

// checkut the project managemtn tool and see if there is anything to 
    useEffect(() => {

    
        // document.addEventListener("mouseup", onMouseUp);
        const ocean = document.getElementById('ocean')

        
        // ocean.addEventListener("mousemove", (e) => { 
            ocean.addEventListener("mouseup", onMouseUp);
            ocean.addEventListener("mousedown", onMouseDown);

            if (isMoving == true) {
                console.log('we moving')
                ocean.addEventListener("mousemove", onMouseMove)
            }
        // });
    return () => {
        console.log('we done')
        ocean.removeEventListener("mouseup", onMouseUp);
        ocean.removeEventListener("mousedown", onMouseDown);
    }
    }, [isMoving])


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

SailBoat.defaultProps = { style: { left: 0 } };

export default SailBoat;
