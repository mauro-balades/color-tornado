
import styled, { keyframes } from "styled-components";

const rippleAnimation = keyframes`
    0%   { transform: translate(-100%, -100%); }
    80%  { transform: translate(-100%, -100%) scale(7); }
    100% { transform: translate(-100%, -100%) scale(7); opacity: 0; }
`

export const ColorWrapper = styled.main`
    background: ${(props: any) => props.color};

    width: 100%;
    height: 100vh;

    position: relative;
    overflow: hidden;
`

export const RippleEffect = styled.div`
    width: 50px;
    height: 50px;

    background: rgba(0,0,0,.2);
    position: absolute;
    border-radius: 50%;

    transform: translate(-50%, -50%);
    animation: .3s linear ${rippleAnimation} forwards;
`


