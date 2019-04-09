import React, { Fragment } from 'react';
import styled from 'styled-components';

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${props => (props.column ? 'column' : 'row')};
  background: rgb(90, 80, 145);
  background: linear-gradient(
    180deg,
    rgba(90, 80, 145, 1) 4%,
    rgba(18, 15, 24, 1) 98%
  );
  height: 100%;
  padding: 2rem;
`;

const Button = styled.button`
  display: flex;
  flex: ${props => (props.small ? '1 0 30%' : '1 0 100%')};
  height: 10rem;
  justify-content: center;
  margin: 2px;
  border: 2px solid red;
  border-radius: 5px;
`;

const Avatars = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Avatar = styled.div`
  width: 20rem;
  height: 20rem;
  border: 5px solid red;
  border-radius: 50%;
  background-image: ${props =>
    props.playerAvatar
      ? `url(${props.playerAvatar})`
      : `url(${props.aiAvatar})`};
  background-size: cover;

  ${({ aiAvatarHover }) =>
    aiAvatarHover &&
    `
    background-image: url(${aiAvatarHover})
  `}
`;
const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

const StartingPage = props => {
  return (
    <FlexContainer column>
      <Avatars>
        <Avatar playerAvatar={props.playerAvatar} />
        <Avatar aiAvatar={props.aiAvatar} aiAvatarHover={props.aiAvatarHover} />
      </Avatars>
      <Buttons>
        <Button
          small
          onClick={props.changeAvatarAndDifficulty}
          onMouseEnter={props.hoverAvatarOn}
          onMouseLeave={props.hoverAvatarOff}
        >
          Easy
        </Button>
        <Button
          small
          onClick={props.changeAvatarAndDifficulty}
          onMouseEnter={props.hoverAvatarOn}
          onMouseLeave={props.hoverAvatarOff}
        >
          Medium
        </Button>
        <Button
          small
          onClick={props.changeAvatarAndDifficulty}
          onMouseEnter={props.hoverAvatarOn}
          onMouseLeave={props.hoverAvatarOff}
        >
          Hard
        </Button>
        <Button onClick={props.startQuiz}>Start Game</Button>
      </Buttons>
    </FlexContainer>
  );
};

export default StartingPage;
