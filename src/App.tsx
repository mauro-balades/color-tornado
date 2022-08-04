import React, { Children, ReactElement, useEffect, useState } from "react";
import { ColorWrapper, RippleEffect, ColourTitle, Dialog } from "./styles";
import { randomBetween } from "./utils";
import rgbHex from "rgb-hex";
import * as _ from "lodash";

function App() {
    const [color, setColor] = useState("");

    const [ripples, setRipples] = useState([] as any[]);
    const [colors, setColors] = useState([] as any[]);

    const copyColor = () => {
        navigator.clipboard.writeText(`#${color}`);
    }

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

    document.body.onkeydown = function (e) {
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
            <Dialog>
                <a href="https://github.com/mauro-balades/color-tornado" target="_blank">Source Code</a>
                <a href="">Twitter</a>
                <span style={{ height: '30px', width: '2px', background: '#000', margin: '0 10px' }}></span>
                <svg style={{ height: '30px', width: '30px', cursor: 'pointer', paddingLeft: '5px' }} onClick={copyColor} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            </Dialog>
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
