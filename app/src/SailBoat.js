import React, { useEffect, useState, useRef, useCallback } from "react";

export default function Sailboat({
    boatId,
    position,
    onMouseUp,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    handleControllerMouseDown,
    boatDimensions,
    handleControllerMouseUp,
    hover,
}) {
    const translateValue = `translate(${position.left}px, ${position.top}px)`;
    // const skewValue = `skew(${height*4}px, ${width*2}px)`;
    const styles = {
        zIndex: 10,
        position: "absolute",
        top: "0px",
        left: "0px",
        backgroundColor: "pink",
        width: boatDimensions.width + "px",
        height: boatDimensions.height + "px",
        transform: translateValue,
        border: "1px solid transparent",
    };

    if (hover) {
        styles.border = "1px solid black";
    }
    const controllerStyles = {
        position:'absolute',
        height: "8px",
        width: "8px",
        backgroundColor: 'black',
        zIndex: 11,

    }
    const controllers = [
        {
            id: "topLeft",
            style: {
                top: "-4px",
                left: "-4px",
            },
        },
        {
            id: "topRight",
            style: {
                top: "-4px",
                left: (boatDimensions.width - 4) + "px",
            },
        },
        {
            id: "bottomRight",
            style: {
                top: (boatDimensions.height - 4) + "px",
                left: (boatDimensions.width - 4) + "px",
            },
        },
        {
            id: "bottomLeft",
            style: {
                top: (boatDimensions.height - 4) + "px",
                left: "-4px",
            },
        },
        {
            id: "top",
            style: {
                top: "-4px",
                left: (boatDimensions.width/2 - 4) + "px",
            },
        },
        {
            id: "right",
            style: {
                top: (boatDimensions.height/2 - 4) + "px",
                left: (boatDimensions.width - 4) + "px",
            },
        },
        {
            id: "bottom",
            style: {
                top: (boatDimensions.height - 4) + "px",
                left: (boatDimensions.width/2 - 4) + "px",
            },
        },
        {
            id: "left",
            style: {
                top: (boatDimensions.height/2 - 4) + "px",
                left: "-4px",
            },
        },
    ];

    const getControllers = () => {
        if (hover){
            return controllers.map((controller) => {
                return <div
                onMouseUp={(e)=> handleControllerMouseUp(e)}
                onMouseDown={(e)=> handleControllerMouseDown(e, boatId, controller.id)}
                key={controller.id}
                style={{...controllerStyles, ...controller.style}}></div>
            })
        }
    }
    return (
        <div
            onMouseEnter={(e) => onMouseEnter(e, boatId)}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseDown={(e) => onMouseDown(e, boatId)}
            style={styles}
        >
            {getControllers()}
            {"BOAT"}
        </div>
    );
}
