import React, { Children, ReactElement, useEffect, useState } from 'react';
import { ColorWrapper, RippleEffect } from "./styles"

const COLORS = ["#f36747", "#f197a2",  "#4360a8","#3cc6ed","#842d73","#ee316b","#4152a5","#ffb137","#3cc6ed","#5ce5aa"]

function App() {
  const [color, setColor] = useState("");
  const [ripples, setRipples] = useState([] as any[]);
  const setRandomColor = () => {
    let c = COLORS[Math.floor(Math.random()*COLORS.length)];
    setColor(c);
  }

  const onClick = (event: any) => {
    setRipples((currentState) => [ ...currentState, {
      y: event.clientY,
      x: event.clientX,
    }]);
  }

  useEffect(() => {
    setRandomColor();
  }, [])

  return (
    <ColorWrapper id="ripple-cursor-wrapper" onClick={onClick} color={color}>
      {ripples.map((ripple: any) =>
        <RippleEffect style={{
          top: `${ripple.y}px`,
          left: `${ripple.x}px`
        }} id="ripple-cursor-follow"></RippleEffect>
      )}
    </ColorWrapper>
  );
}

export default App;
