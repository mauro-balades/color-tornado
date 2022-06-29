import styled, { keyframes } from "styled-components";

const rippleAnimation = keyframes`
    0%   { transform: translate(-100%, -100%); }
    80%  { transform: translate(-100%, -100%) scale(7); }
    100% { transform: translate(-100%, -100%) scale(7); opacity: 0; }
`;

const colorRippleAnimation = keyframes`
    0%   { transform: translate(-100%, -100%); }
    80%  { transform: translate(-100%, -100%) scale(100); }
    100% { transform: translate(-100%, -100%) scale(100); }
`;

export const ColorWrapper = styled.main`
    background: ${(props: any) => props.color};

    width: 100%;
    height: 100vh;

    position: relative;
    overflow: hidden;

    cursor: pointer;
`;

export const RippleEffect = styled.div`
    width: 50px;
    height: 50px;

    background: rgba(255, 255, 255, 0.4);
    position: absolute;
    border-radius: 50%;

    transform: translate(-50%, -50%);

    &.color-ripple {
        animation: 3s cubic-bezier(0, 0, 0.2, 1) ${colorRippleAnimation}
            forwards;
    }

    &.click-ripple {
        animation: 0.2s ease-in ${rippleAnimation} forwards;
        z-index: 9999;
    }
`;

export const ColourTitle = styled.div`
    position: absolute;

    top: 50%;
    left: 50%;

    color: #fff;
    transform: translate(-50%, -50%);

    z-index: 10;

    font-size: 40px;
    font-weight: bold;

    font-family: "Roboto", sans-serif;
    text-transform: uppercase;

    user-select: none;
    cursor: auto;
`;

export const Dialog = styled.div`
    position: absolute;

    bottom: 0%;
    left: 0%;

    margin: 10px;

    display: flex;
    align-items: center;

    padding: 10px 15px;
    font-weight: bold;

    font-family: "Roboto", sans-serif;

    color: #000;
    background: #fff;
    border: 2px solid #000;

    border-radius: 5px;
    z-index: 10;

    & a {
        color: #000;
        text-decoration: none;
        margin: 0 10px;
    }
`
