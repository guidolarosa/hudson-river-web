import { keyframes } from "styled-components";

export const fadeDown = keyframes`
  0% {opacity: 0; transform: translateY(-5rem)}
  100% {opacity: 1; transform: translateY(0rem)}
`;

export const fadeUp = keyframes`
  0% {opacity: 0; transform: translateY(5rem)}
  100% {opacity: 1; transform: translateY(0rem)}
`;

export const fadeIn = keyframes`
  0% {opacity: 0}
  100% {opacity: 1}
`;