import { keyframes } from "styled-components";

export const SlideInDown = keyframes`
  from {
    transform: translateY(-2.5rem);
    opacity: 0;
  }
  
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const SlideInUp = keyframes`
  from {
    transform: translateY(2.5rem);
    opacity: 0;
  }
  
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const Appear = keyframes`
  from {
    opacity: 0;
  }
  
  to {
    opacity: 1;
  }
`;
