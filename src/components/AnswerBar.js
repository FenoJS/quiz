import React from 'react';
import styled from 'styled-components';

const AnswersBarList = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  width: 100%;
  position: ${props => (props.topBar === true ? 'absolute' : 'relative')};
  top: ${props => props.topBar === true && '1.5rem'};
`;

const AnswersBarItem = styled.li`
  background-color: ${props =>
    (props.correct && '#4cff9d') ||
    (props.wrong && '#ff4545') ||
    (props.highlight && 'rgba(255,255,255,0.58)') ||
    'rgba(255, 255, 255, 0.08)'};
  width: 4rem;
  height: 5px;
  border-radius: 2rem;
  margin-right: 5px;
`;

const AnswersBar = props => {
  console.log(props);

  const placeholderArray = [1, 2, 3];

  const displayAnswers = () => {
    if (props.answersArr) {
      const answer = props.answersArr.map((item, i) => {
        if (
          (!props.topBar && item) ||
          (props.topBar && props.selectedAnswers[i] === true)
        ) {
          return <AnswersBarItem correct />;
        }
        if (
          (!props.topBar && item === false) ||
          (props.topBar && props.selectedAnswers[i] === false)
        ) {
          return <AnswersBarItem wrong />;
        } else return <AnswersBarItem />;
      });
      return answer;
    }
    if (props.highlighted) {
      return placeholderArray.map(item => <AnswersBarItem highlight />);
    }
    return placeholderArray.map(item => <AnswersBarItem />);
  };

  return (
    <AnswersBarList topBar={props.topBar}>
      {props.children}
      {displayAnswers()}
    </AnswersBarList>
  );
};

export default AnswersBar;
