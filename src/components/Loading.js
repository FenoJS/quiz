import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const FlexContainer = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const Circle = styled.div`
  height: 18rem;
  width: 18rem;
  border: 5px solid transparent;
  border-top-color: #4cff9d;
  border-radius: 50%;
  animation: ${spin} 2s linear infinite;

  &::before {
    content: '';
    position: absolute;
    left: 15px;
    right: 15px;
    top: 15px;
    bottom: 15px;
    border: 5px solid transparent;
    border-top-color: #4cff9d;
    border-radius: 50%;
    animation: ${spin} 2s linear infinite;
  }

  &::after {
    content: '';
    position: absolute;
    left: 5px;
    top: 5px;
    right: 5px;
    bottom: 5px;
    border: 5px solid transparent;
    border-top-color: #ff4545;
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
  }
`;

const Loading = () => {
  return (
    <FlexContainer>
      <Circle />
    </FlexContainer>
  );
};

export default Loading;
