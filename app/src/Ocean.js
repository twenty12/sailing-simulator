import React, { useEffect, useState, useRef, useCallback } from "react";

import SailBoat from "./SailBoat";

const INITIAL_POSITION = {
    top: 0,
    left: 0,
};

const BOAT_HEIGHT = 50;
const BOAT_WIDTH = 50;


export default function Ocean() {
    const [dragStartingPosition, setDragStartingPosition] = useState([
        INITIAL_POSITION,
    ]);
    const [dragOffset, setDragOffset] = useState([INITIAL_POSITION]);
    const [positions, setPositions] = useState([INITIAL_POSITION]);
    const [idOfSelectedBoat, setIdOfSelectedBoat] = useState(0);
    const [idOfHoveredBoat, setIdOfHoveredBoat] = useState(0);
    const [sailBoatIds, setSailBoatIds] = useState([0]);
    const [isDragging, setIsDragging] = useState(false);
    const [isTransforming, setIsTransforming] = useState(false);
    const [hoverStates, setHoverStates] = useState([false])
    const [controllerId, setControllerId] = useState(null)
    const [boatDimensions, setBoatDimensions] = useState({
        height: BOAT_HEIGHT,
        width: BOAT_WIDTH})
    const calculateMove = () => {
        const { left: offsetX, top: offsetY } = dragOffset;
        const newPosition = {
            top: offsetY,
            left: offsetX,
        };
        let newArr = [...positions];
        newArr[idOfSelectedBoat] = newPosition;
        setPositions(newArr);
    };

    const startDragging = (e) => {
        const newDragStartingPoint = {
            top: e.clientY,
            left: e.clientX,
        };
        setDragStartingPosition(newDragStartingPoint);
        setIsDragging(true);
    };

    const handleMouseDown = (e, idOfSelectedBoat) => {
        setIdOfSelectedBoat(idOfSelectedBoat);
        if (!isDragging) {
            startDragging(e);
        }
    };

    const handleMouseEnter = (e, idOfHoveredBoat) => {
        let newArr = [...hoverStates];
        newArr[idOfHoveredBoat] = true;
        setIdOfHoveredBoat(idOfHoveredBoat);
        setHoverStates(newArr)
    }

    const handleMouseLeave = (e) => {
        let newArr = [...hoverStates];
        newArr[idOfHoveredBoat] = false;
        setIdOfHoveredBoat(null);
        setHoverStates(newArr)
    }

    const handleMouseUp = (e) => {
        setIsDragging(false);
        setIsTransforming(false);
    };

    const onMouseMove = (e) => {

        const moveOffset = {
            left: e.clientX,
            top: e.clientY,
        };
        if (isTransforming) {
            setDragOffset(moveOffset);
            calculateDimensionChange(e)
            
        }
        if (isDragging === true) {

            setDragOffset(moveOffset);
            calculateMove();
        }
    };

    const overLapExists = (newPosition) => {
        var overLaps = [0];
        for (var oldPosition of positions) {

            var overlapX = !(
                newPosition.left + BOAT_WIDTH < oldPosition.left ||
                newPosition.left > oldPosition.left + BOAT_WIDTH
            );
            var overlapY = !(
                newPosition.top + BOAT_HEIGHT < oldPosition.top ||
                newPosition.top > oldPosition.top + BOAT_HEIGHT
            );
            if (overlapY && overlapX) {
                overLaps.push(1);
            }
        }
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        return overLaps.reduce(reducer) > 0;
    };

    const getBoatLaunchCoords = () => {
        var newPosition = { top: 0, left: 0 };
        const attempts = 100;
        var i;
        for (i = 0; i < attempts; i++) {
            if (!overLapExists(newPosition)) {
                return newPosition;
            }
            newPosition = {
                top: newPosition.top + 10,
                left: newPosition.left + 10,
            };
        }
    };

    const addBoat = () => {
        getBoatLaunchCoords();
        setSailBoatIds([...sailBoatIds, sailBoatIds.length]);
        setPositions([...positions, getBoatLaunchCoords()]);
    };
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

    const getSailBoats = () => {
        return sailBoatIds.map((sailBoatId) => {
            return (
                <SailBoat
                    boatId={sailBoatId}
                    boatDimensions={boatDimensions}
                    onMouseUp={handleMouseUp}
                    onMouseDown={handleMouseDown}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    handleControllerMouseDown={handleControllerMouseDown}
                    handleControllerMouseUp={handleControllerMouseUp}
                    key={sailBoatId}
                    position={positions[sailBoatId]}
                    hover={hoverStates[sailBoatId]}
                />
            );
        });
    };
    useEffect(() => {
        console.log("use effect get sailboat");
        getSailBoats();
    }, [sailBoatIds]);

    const startTransforming = (e) => {
        console.log(e)
        // setBoatDimensions({
        //     height:100,
        //     width: 100
        // })
        setIsTransforming(true)
        // startTransforming(true);
    }
    const handleControllerMouseDown = (e, boatId, controllerId) => {
        setIdOfSelectedBoat(boatId)
        if (!isTransforming) {
            startTransforming(e);
        }
        setControllerId(controllerId)
        // isTransforming(true)
        e.stopPropagation()
    }
    const handleControllerMouseUp = (e) => {
        startTransforming(false);
        setControllerId(null)
        e.stopPropagation()
    }

    const calculateDimensionChange = (e) => {
        const { left: offsetX, top: offsetY } = dragOffset;

        if (controllerId === 'topLeft'){
            const newPosition = {
                top: offsetY,
                left: offsetX
            };
            setBoatDimensions({
                height: boatDimensions.height + (positions[idOfSelectedBoat].top - offsetY),
                width: boatDimensions.width + (positions[idOfSelectedBoat].left - offsetX)
            })
            let newArr = [...positions];
            newArr[idOfSelectedBoat] = newPosition;
            setPositions(newArr);
        }

        if (controllerId === 'topRight'){
            const newPosition = {
                top: offsetY,
                left: positions[idOfSelectedBoat].left
            };
            setBoatDimensions({
                height: boatDimensions.height + (positions[idOfSelectedBoat].top - offsetY),
                width: e.clientX - positions[idOfSelectedBoat].left
            })
            let newArr = [...positions];
            newArr[idOfSelectedBoat] = newPosition;
            setPositions(newArr);
        }

        if (controllerId === 'bottomRight') {
            setBoatDimensions({
                height: offsetY - positions[idOfSelectedBoat].top,
                width: e.clientX - positions[idOfSelectedBoat].left
            })
        }

        if (controllerId == 'bottomLeft') {
            const newPosition = {
                top: positions[idOfSelectedBoat].top,
                left: offsetX
            };
            setBoatDimensions({
                height: offsetY - positions[idOfSelectedBoat].top,
                width: boatDimensions.width + (positions[idOfSelectedBoat].left - offsetX)
            })
            let newArr = [...positions];
            newArr[idOfSelectedBoat] = newPosition;
            setPositions(newArr);
        }
    }
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
                    <div>
                        dragStartingPosition: {JSON.stringify(dragStartingPosition)}
                    </div>
                    <div>dragOffset: {JSON.stringify(dragOffset)}</div>
                    <div>positions: {JSON.stringify(positions)}</div>
                </div>
                {getSailBoats()}
            </div>
        </>
    );
}
