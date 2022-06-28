import React, { useEffect, useState } from 'react';
import { ColorWrapper } from "./styles"

const COLORS = ["#f36747", "#f197a2",  "#4360a8","#3cc6ed","#842d73","#ee316b","#4152a5","#ffb137","#3cc6ed","#5ce5aa"]

function App() {
  const [color, setColor] = useState("");
  const setRandomColor = () => {
    let c = COLORS[Math.floor(Math.random()*COLORS.length)];
    setColor(c);
  }

  useEffect(() => {
    setRandomColor();
  }, [])

  return (
    <ColorWrapper color={color}></ColorWrapper>
  );
}

export default App;
