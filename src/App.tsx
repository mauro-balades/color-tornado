import React, { Children, ReactElement, useEffect, useState } from "react";
import { ColorWrapper, RippleEffect, ColourTitle } from "./styles";
import { randomBetween } from "./utils";
import rgbHex from "rgb-hex";
import * as _ from "lodash";

function App() {
    const [color, setColor] = useState("");

    const [ripples, setRipples] = useState([] as any[]);
    const [colors, setColors] = useState([] as any[]);

    const setRandomColor = () => {
        let value = rgbHex(
            randomBetween(0, 255),
            randomBetween(0, 255),
            randomBetween(0, 255)
        );

        setColor(value);
        return value;
    };

    const updateColor = (info: {
        y: number | undefined;
        x: number | undefined;
        color: string;
        space: boolean;
    }) => {
        setRipples((currentState) => [
            ...(currentState.length > 2 ? [currentState[2]] : currentState),
            info,
        ]);

        setColors((currentState) => [
            ...(currentState.length > 25
                ? currentState.slice(-15)
                : currentState),
            info,
        ]);
    };

    const onClick = (event: any) => {
        let color = setRandomColor();
        let info = {
            space: false,
            y: event.clientY,
            x: event.clientX,
            color,
        };

        updateColor(info);
    };

    document.body.onkeyup = function (e) {
        if (e.key == " " || e.code == "Space" || e.keyCode == 32) {
            let color = setRandomColor();
            let info = {
                space: true,
                y: undefined,
                x: undefined,
                color,
            };

            updateColor(info);
        }
    };

    return (
        <>
            <ColourTitle>
                {color === "" ? (
                    <span style={{ color: "#000" }}>
                        Click anywhere or the spacebar
                    </span>
                ) : (
                    <>
                        <span style={{ marginRight: "5px" }}>#</span>
                        {color}
                    </>
                )}
            </ColourTitle>
            <ColorWrapper
                id="ripple-cursor-wrapper"
                onClick={onClick}
                color={color}
            >
                {ripples.map((ripple: any) => (
                    <RippleEffect
                        style={
                            !ripple.space
                                ? {
                                      top: `${ripple.y}px`,
                                      left: `${ripple.x}px`,
                                  }
                                : { top: `50%`, left: `50%` }
                        }
                        key={ripple.color}
                        className="click-ripple"
                    ></RippleEffect>
                ))}
                {colors.map((color: any) => (
                    <RippleEffect
                        style={
                            !color.space
                                ? {
                                      top: `${color.y}px`,
                                      left: `${color.x}px`,
                                      background:
                                          color.color === ""
                                              ? "#000"
                                              : `#${color.color}`,
                                  }
                                : {
                                      top: `50%`,
                                      left: `50%`,
                                      background:
                                          color.color === ""
                                              ? "#000"
                                              : `#${color.color}`,
                                  }
                        }
                        key={color.color}
                        className="color-ripple"
                    ></RippleEffect>
                ))}
            </ColorWrapper>
        </>
    );
}

export default App;
