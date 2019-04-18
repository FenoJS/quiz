import React, { Fragment } from 'react';
import styled from 'styled-components';

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: ${props => (props.column ? 'column' : 'row')};
  height: 100%;
  padding: 2rem;
`;

const Avatars = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const Avatar = styled.div`
  border: 5px solid red;
  border-radius: 50%;
  background-image: ${props =>
    props.playerAvatar
      ? `url(${props.playerAvatar})`
      : `url(${props.aiAvatar})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  /* padding-bottom: 50%;
  width: 50%; */
  width: 35vw;
  height: 35vw;
  max-width: 16rem;
  max-height: 16rem;

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
  position: relative;
`;

const Button = styled.div`
  display: flex;
  flex: ${props => (props.small ? '1 0 30%' : '1 0 100%')};
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 8rem;
  color: #000;
  background-color: #fff;
  margin: 2px;
  border-radius: 5px;
  font-size: 2.5rem;
  border: solid #4cff9d 4px;
  cursor: pointer;
`;

const Select = styled.span`
  color: #fff;
  font-size: 2.5rem;
  text-align: center;
  position: absolute;
  top: -5rem;
`;

const StartingPage = props => {
  return (
    <FlexContainer column>
      <Avatars>
        <Avatar playerAvatar={props.playerAvatar} />
        <Avatar aiAvatar={props.aiAvatar} aiAvatarHover={props.aiAvatarHover} />
      </Avatars>

      <Buttons>
        {/* <Select>select difficulty</Select> */}
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
