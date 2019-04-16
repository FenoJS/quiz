import React from 'react';
import styled from 'styled-components';

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
`;

const ScoreContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  width: 35vw;
  height: 35vw;
  max-width: 13rem;
  max-height: 13rem;
`;

const Score = styled.div``;

const Point = styled.span`
  color: #fff;
  font-size: 4rem;
`;

const QuizStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const QuizRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const AnswersBar = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  width: 100%;
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

const RoundInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${props => (props.highlight && '#fff') || 'rgba(158, 158, 158, 0.56)'};
  height: 7rem;
  width: 80%;
`;

const Round = styled.span`
  font-size: 2rem;
`;
const Category = styled.span`
  font-size: 1.5rem;
`;

const Button = styled.button`
  width: 100%;
`;

const ResultsTable = props => {
  const round = [1, 2, 3, 4, 5];

  return (
    <FlexContainer>
      <ScoreContainer>
        <Avatar playerAvatar={props.playerAvatar} />
        <Score>
          <Point>{props.score[0]}</Point>:<Point>{props.score[1]}</Point>
        </Score>
        <Avatar aiAvatar={props.aiAvatar} />
      </ScoreContainer>
      <QuizStateContainer>
        {round.map(item => (
          <QuizRow>
            <AnswersBar>
              {item <= props.roundNumber ? (
                props.playerAnswers[item - 1] ? (
                  props.playerAnswers[item - 1].map(answer => {
                    if (answer === true) {
                      return <AnswersBarItem correct />;
                    }
                    if (answer === false) {
                      return <AnswersBarItem wrong />;
                    } else return <AnswersBarItem />;
                  })
                ) : (
                  <AnswersBar>
                    <AnswersBarItem />
                    <AnswersBarItem />
                    <AnswersBarItem />
                  </AnswersBar>
                )
              ) : (
                <AnswersBar>
                  <AnswersBarItem />
                  <AnswersBarItem />
                  <AnswersBarItem />
                </AnswersBar>
              )}
            </AnswersBar>
            {item <= props.roundNumber ? (
              <RoundInfo highlight={item === props.roundNumber ? true : null}>
                <Round>Round {item}</Round>
                <Category>{props.categories[item - 1][1]}</Category>
              </RoundInfo>
            ) : (
              <RoundInfo>
                <Round>Round {item}</Round>
                <Category />
              </RoundInfo>
            )}
            <AnswersBar>
              {item === props.roundNumber ? (
                <AnswersBar>
                  <AnswersBarItem highlight />
                  <AnswersBarItem highlight />
                  <AnswersBarItem highlight />
                </AnswersBar>
              ) : item <= props.roundNumber - 1 ? (
                props.aiAnswers[item - 1].map(answer => {
                  if (answer === true) {
                    return <AnswersBarItem correct />;
                  }
                  if (answer === false) {
                    return <AnswersBarItem wrong />;
                  } else return <AnswersBarItem />;
                })
              ) : (
                <AnswersBar>
                  <AnswersBarItem />
                  <AnswersBarItem />
                  <AnswersBarItem />
                </AnswersBar>
              )}
            </AnswersBar>
          </QuizRow>
        ))}
      </QuizStateContainer>
      {props.playButton && <Button onClick={props.continueQuiz}>Play!</Button>}
    </FlexContainer>
  );
};

export default ResultsTable;
