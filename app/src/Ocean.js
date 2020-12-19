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
    const [hover, setHover] = useState(false)
    const calculateMove = (oldPosition) => {
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
        setIdOfHoveredBoat(idOfHoveredBoat);
        setHover(true)
    }

    const handleMouseLeave = (e) => {
        setIdOfHoveredBoat(null);
        setHover(false)
        console.log(idOfSelectedBoat)
    }

    const handleMouseUp = (e) => {
        setIsDragging(false);
    };

    const onMouseMove = (e) => {
        if (isDragging === true) {
            const moveOffset = {
                left: e.clientX,
                top: e.clientY,
            };
            setDragOffset(moveOffset);
            calculateMove(positions);
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
                    height={BOAT_HEIGHT}
                    width={BOAT_WIDTH}
                    onMouseUp={handleMouseUp}
                    onMouseDown={handleMouseDown}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    key={sailBoatId}
                    position={positions[sailBoatId]}
                    hover={hover}
                />
            );
        });
    };
    useEffect(() => {
        console.log("use effect get sailboat");
        getSailBoats();
    }, [sailBoatIds]);

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
