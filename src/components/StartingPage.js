import React, { Fragment } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  background: rgb(90, 80, 145);
  background: linear-gradient(
    180deg,
    rgba(90, 80, 145, 1) 4%,
    rgba(18, 15, 24, 1) 98%
  );
  height: 100%;
`;

const Button = styled.button`
  width: 90%;
  height: 100px;
`;

const StartingPage = props => {
  return (
    <Container>
      <Button onClick={props.startQuiz}>Start Game</Button>
    </Container>
  );
};

export default StartingPage;
