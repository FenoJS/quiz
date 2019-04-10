import React from 'react';
import styled from 'styled-components';

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Header = styled.h1`
  font-size: 2rem;
  color: #fff;
`;

const Button = styled.button`
  background-color: ${({ isAnswerCorrect }) =>
    (isAnswerCorrect === true && 'green') ||
    (isAnswerCorrect === false && 'red') ||
    '#fff'};
  ${console.log(this)}
`;

const QuestionView = props => {
  console.log(props);
  return (
    <FlexContainer>
      <Header>{props.question.category}</Header>
      <p>{props.question.question}</p>
      <ul>
        {props.answers.map(item => {
          if (!props.isQuestionAnswered) {
            return (
              <li>
                <Button onClick={props.getSelectedAnswer}>{item}</Button>;
              </li>
            );
          } else {
            return (
              <li>
                <Button
                  onClick={props.getSelectedAnswer}
                  isAnswerCorrect={props.showCorrectAnswer(item)}
                >
                  {item}
                </Button>
                ;
              </li>
            );
          }
        })}
      </ul>
    </FlexContainer>
  );
};

export default QuestionView;
