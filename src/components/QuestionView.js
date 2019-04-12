import React from 'react';
import styled from 'styled-components';

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2rem 6rem 2rem;
  position: relative;
`;

const Header = styled.h1`
  font-size: 2rem;
  color: #fff;
`;

const Question = styled.span`
  font-size: 2.5rem;
  color: #fff;
`;

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  width: 100%;
`;

const ListItem = styled.li`
  flex: 1 0 45%;
  padding: 5px;
`;

// rgba(255, 255, 255, 0.08);
// rgba(0, 0, 0, 0.51);

const Button = styled.button`
${props => console.log(props)}
  background-color: ${({ isAnswerCorrect, answered }) =>
    (isAnswerCorrect === 'answerCorrect' && '#4cff9d') ||
    (isAnswerCorrect === 'answerWrongShowCorrect' && '#534f63') ||
    (isAnswerCorrect === 'answerWrong' && '#ff4545') ||
    (answered && 'rgba(255, 255, 255, 0.08)') ||
    '#fff'};
  width: 100%;
  color: ${({ isAnswerCorrect, answered }) =>
    (isAnswerCorrect === 'answerCorrect' && '#000') ||
    (isAnswerCorrect === 'answerWrongShowCorrect' && '#fff') ||
    (isAnswerCorrect === 'answerWrong' && '#fff') ||
    (answered && 'rgba(0, 0, 0, 0.51)') ||
    '#000'};
  font-size: 2.5rem;
  cursor: pointer;
  border: ${({ isAnswerCorrect }) =>
    (isAnswerCorrect === 'answerWrongShowCorrect' && 'solid #4cff9d 4px') ||
    'none'};
  border-radius: 5px;
  height: 11.5rem;
`;

const ClickInfo = styled.span`
  position: absolute;
  color: rgba(255, 255, 255, 0.58);
  bottom: 2rem;
  font-size: 2rem;

  ::after {
    content: '';
    position: absolute;
    top: 53%;
    width: 8%;
    right: -2rem;
    border-bottom: 2px solid rgba(255, 255, 255, 0.58);
  }

  ::before {
    content: '';
    position: absolute;
    top: 53%;
    width: 8%;
    left: -2rem;
    border-bottom: 2px solid rgba(255, 255, 255, 0.58);
  }
`;

const QuestionView = props => {
  return (
    <FlexContainer>
      <Header>
        {
          (props.question.category = props.question.category.replace(
            'Entertainment: ',
            ''
          ))
        }
      </Header>
      <Question>{props.question.question}</Question>
      <List>
        {props.answers.map(item => {
          if (!props.isQuestionAnswered) {
            return (
              <ListItem>
                <Button onClick={props.getSelectedAnswer}>{item}</Button>
              </ListItem>
            );
          } else {
            return (
              <ListItem>
                <Button
                  onClick={props.getSelectedAnswer}
                  isAnswerCorrect={props.showCorrectAnswer(item)}
                  answered
                  disabled
                >
                  {item}
                </Button>
              </ListItem>
            );
          }
        })}
      </List>
      {props.isQuestionAnswered && <ClickInfo>Tap to continue</ClickInfo>}
    </FlexContainer>
  );
};

export default QuestionView;
