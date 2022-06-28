import React, { Children, ReactElement, useEffect, useState } from "react";
import { ColorWrapper, RippleEffect } from "./styles";
import * as _ from "lodash";

const COLORS = [
    "#f36747",
    "#f197a2",
    "#4360a8",
    "#3cc6ed",
    "#842d73",
    "#ee316b",
    "#4152a5",
    "#ffb137",
    "#5ce5aa",
];

function App() {
    const [color, setColor] = useState(COLORS[-1]);

    const [isRandom, setRandom] = useState(false);

    const [ripples, setRipples] = useState([] as any[]);
    const [colors, setColors] = useState([] as any[]);

    const setRandomColor = () => {
        if (isRandom) {
            let c = COLORS[Math.floor(Math.random() * COLORS.length)];

            if (color === c) {
                setRandomColor();
                return;
            }

            setColor(c);
            return;
        }

        console.log(COLORS.indexOf(color));
        setColor(
            COLORS[
                COLORS.indexOf(color) - 1 == COLORS.length
                    ? 0
                    : COLORS.indexOf(color) + 1
            ]
        );
    };

    const onClick = (event: any) => {
        setRipples((currentState) => [
            ...currentState,
            {
                y: event.clientY,
                x: event.clientX,
            },
        ]);

        setRandomColor();
        setColors((currentState) => [
            ...currentState,
            {
                y: event.clientY,
                x: event.clientX,
                color: _.cloneDeep(color),
            },
        ]);
    };

    useEffect(() => {
        setRandomColor();
    }, []);

    return (
        <ColorWrapper
            id="ripple-cursor-wrapper"
            onClick={onClick}
            color={color}
        >
            {ripples.map((ripple: any) => (
                <RippleEffect
                    style={{
                        top: `${ripple.y}px`,
                        left: `${ripple.x}px`,
                    }}
                    className="click-ripple"
                ></RippleEffect>
            ))}
            {colors.map((color: any) => (
                <RippleEffect
                    style={{
                        top: `${color.y}px`,
                        left: `${color.x}px`,
                        background: color.color,
                    }}
                    className="color-ripple"
                ></RippleEffect>
            ))}
        </ColorWrapper>
    );
}

export default App;
