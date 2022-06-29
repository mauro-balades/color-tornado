import React, { Children, ReactElement, useEffect, useState } from "react";
import { ColorWrapper, RippleEffect, ColourTitle } from "./styles";
import { randomBetween } from "./utils";
import rgbHex from 'rgb-hex';
import * as _ from "lodash";



function App() {
    const [color, setColor] = useState("");

    const [ripples, setRipples] = useState([] as any[]);
    const [colors, setColors] = useState([] as any[]);

    const setRandomColor = () => {
        let value = rgbHex(
            randomBetween(0, 255),
            randomBetween(0, 255),
            randomBetween(0, 255),
        );

        setColor(value);
        return value;
    };

    const onClick = (event: any) => {
        setRipples((currentState) => [
            ...currentState,
            {
                y: event.clientY,
                x: event.clientX,
            },
        ]);

        let color = setRandomColor();
        setColors((currentState) => [
            ...currentState,
            {
                y: event.clientY,
                x: event.clientX,
                color,
            },
        ]);
    };

    console.log(colors)

    return (
        <>
            <ColourTitle>
                {color === "" ? <>Click anywhere or the spacebar</> : <><span style={{ marginRight: '5px' }}>#</span>{color}</>}
            </ColourTitle>
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
                            background: color.color === "" ? "#000" : `#${color.color}`,
                        }}
                        className="color-ripple"
                    ></RippleEffect>
                ))}
            </ColorWrapper>
        </>
    );
}

export default App;
