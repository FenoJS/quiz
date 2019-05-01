import React from 'react';
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
  border: 2px solid #fff;
  border-radius: 50%;
  background-image: ${props =>
    props.playerAvatar
      ? `url(${props.playerAvatar})`
      : `url(${props.aiAvatar})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
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
  color: ${props => (props.small ? '#fff' : '#000')};
  background-color: ${props => (props.small ? 'transaprent' : '#fff')};
  margin-bottom: ${props => (props.small ? '2rem' : null)};
  border-radius: 5px;
  font-size: 2.5rem;
  cursor: pointer;
  transition: all 0.5s;

  &:active {
    font-size: 3.5rem;
  }
`;

const StartingPage = props => {
  const levels = ['Easy', 'Medium', 'Hard'];
  return (
    <FlexContainer column>
      <Avatars>
        <Avatar playerAvatar={props.playerAvatar} />
        <Avatar aiAvatar={props.aiAvatar} aiAvatarHover={props.aiAvatarHover} />
      </Avatars>
      <Buttons>
        {levels.map(level => (
          <Button
            key={level}
            small
            onClick={props.changeAvatarAndDifficulty}
            onMouseEnter={props.hoverAvatarOn}
            onMouseLeave={props.hoverAvatarOff}
          >
            {level}
          </Button>
        ))}
        <Button onClick={props.startQuiz}>Start Game</Button>
      </Buttons>
    </FlexContainer>
  );
};

export default StartingPage;
