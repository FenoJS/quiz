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
  const { topBar, selectedAnswers, answersArr } = props;
  const placeholderArray = [1, 2, 3];

  const displayAnswers = () => {
    if (answersArr) {
      const answer = answersArr.map((item, i) => {
        if ((!topBar && item) || (topBar && selectedAnswers[i] === true)) {
          return <AnswersBarItem key={'key' + i} correct />;
        } else if (
          (!topBar && item === false) ||
          (topBar && selectedAnswers[i] === false)
        ) {
          return <AnswersBarItem key={'key' + i} wrong />;
        } else return <AnswersBarItem key={'key' + i} />;
      });
      return answer;
    } else if (props.highlighted) {
      return placeholderArray.map(item => (
        <AnswersBarItem key={'key' + item} highlight />
      ));
    }
    return placeholderArray.map(item => <AnswersBarItem key={'key' + item} />);
  };

  return (
    <AnswersBarList topBar={topBar}>
      {props.children}
      {displayAnswers()}
    </AnswersBarList>
  );
};

export default AnswersBar;
