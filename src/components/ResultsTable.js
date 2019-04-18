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
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
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
  max-width: 13rem;
  max-height: 13rem;
`;

const Score = styled.div`
  font-size: 4rem;
  color: #fff;
`;

const Point = styled.span`
  color: #fff;
  font-size: 4rem;
  padding: 0.5rem;
`;

const ResultInfo = styled.div`
  color: #fff;
  font-size: 4.5rem;
  font-family: 'Varela Round', sans-serif;
  opacity: 1;
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
  position: relative;
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
  color: ${props => (props.highlight ? '#fff' : 'rgba(158, 158, 158, 0.56)')};
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
  height: 5rem;
  font-size: 2.5rem;
  color: #fff;
  background-color: #ff4545;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  opacity: ${props => (props.hide ? '0' : null)};
`;

const Hidden = styled.span`
  position: absolute;
  top: -2.2rem;
  text-align: center;
  font-size: 1.5rem;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.58);
`;

const ResultsTable = props => {
  const round = [1, 2, 3, 4, 5];
  const fake3ItemArray = [1, 2, 3];

  const answerBarPlaceholder = status => {
    if (status === 'highlight') {
      return fake3ItemArray.map(item => <AnswersBarItem highlight />);
    } else return fake3ItemArray.map(item => <AnswersBarItem />);
  };

  const pointsAi = () => {
    if (props.roundStartedByAi) {
      return props.score[1];
    } else {
      return props.score[1] - 3;
    }
  };

  const displayAnswers = answer => {
    if (answer) {
      return <AnswersBarItem correct />;
    }
    if (answer === false) {
      return <AnswersBarItem wrong />;
    } else return <AnswersBarItem />;
  };

  const showResult = () => {
    if (props.score[0] > props.score[1]) {
      return 'You Won!';
    }
    if (props.score[0] < props.score[1]) {
      return 'You Lose!';
    } else return 'Draw!';
  };

  return (
    <FlexContainer>
      <ScoreContainer>
        <Avatar playerAvatar={props.playerAvatar} />
        <Score>
          <Point>{props.score[0]}</Point>
          <span>-</span>
          <Point>{props.roundNumber > 1 ? pointsAi() : 0}</Point>
        </Score>
        <Avatar aiAvatar={props.aiAvatar} />
      </ScoreContainer>
      {props.roundNumber > 5 && <ResultInfo>{showResult()}</ResultInfo>}
      <QuizStateContainer>
        {round.map(item => (
          <QuizRow>
            <AnswersBar>
              {item <= props.roundNumber ? (
                props.playerAnswers[item - 1] ? (
                  props.playerAnswers[item - 1].map(displayAnswers)
                ) : (
                  <AnswersBar>{answerBarPlaceholder()}</AnswersBar>
                )
              ) : (
                <AnswersBar>{answerBarPlaceholder()}</AnswersBar>
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
                props.roundStartedByAi ? (
                  <AnswersBar>
                    <Hidden>hidden</Hidden>
                    {answerBarPlaceholder('highlight')}
                  </AnswersBar>
                ) : (
                  <AnswersBar>{answerBarPlaceholder('highlight')}</AnswersBar>
                )
              ) : item <= props.roundNumber - 1 ? (
                props.aiAnswers[item - 1].map(displayAnswers)
              ) : (
                answerBarPlaceholder()
              )}
            </AnswersBar>
          </QuizRow>
        ))}
      </QuizStateContainer>
      {props.roundStartedByAi ? (
        <Button
          onClick={
            props.roundNumber > 5 ? props.startNewGame : props.continueQuiz
          }
        >
          {props.roundNumber > 5 ? 'Start New Game!' : 'Click to Continue!'}
        </Button>
      ) : (
        <Button hide disabled>
          hidden
        </Button>
      )}
    </FlexContainer>
  );
};

export default ResultsTable;
