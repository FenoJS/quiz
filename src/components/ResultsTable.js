import React from 'react';
import styled from 'styled-components';
import AnswersBar from './AnswerBar';

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
  const {
    playerAvatar,
    aiAvatar,
    score,
    roundNumber,
    playerAnswers,
    aiAnswers,
    roundStartedByAi,
  } = props;

  const rounds = [1, 2, 3, 4, 5];

  const pointsAi = () => {
    if (roundStartedByAi) {
      return score[1];
    } else {
      const prevRoundScore = aiAnswers[roundNumber - 1].filter(
        item => item === true
      );
      return score[1] - prevRoundScore.length;
    }
  };

  const showResult = () => {
    if (score[0] > score[1]) return 'You Win!';
    if (score[0] < score[1]) return 'You Lose!';
    return 'Draw!';
  };

  const displayAiColumn = round => {
    if (round === roundNumber) {
      return (
        <AnswersBar highlighted>
          {roundStartedByAi && <Hidden>hidden</Hidden>}
        </AnswersBar>
      );
    } else if (round < roundNumber) {
      return <AnswersBar answersArr={aiAnswers[round - 1]} />;
    }
    return <AnswersBar />;
  };

  return (
    <FlexContainer>
      <ScoreContainer>
        <Avatar playerAvatar={playerAvatar} />
        <Score>
          <Point>{score[0]}</Point>
          <span>-</span>
          <Point>{roundNumber > 1 ? pointsAi() : 0}</Point>
        </Score>
        <Avatar aiAvatar={aiAvatar} />
      </ScoreContainer>
      {roundNumber > 5 && <ResultInfo>{showResult()}</ResultInfo>}
      <QuizStateContainer>
        {rounds.map(round => (
          <QuizRow key={'round' + round}>
            {round <= roundNumber && playerAnswers[round - 1] ? (
              <AnswersBar answersArr={playerAnswers[round - 1]} />
            ) : (
              <AnswersBar />
            )}

            <RoundInfo highlight={round === roundNumber ? true : null}>
              <Round>Round {round}</Round>
              {round <= roundNumber ? (
                <Category>{props.categories[round - 1][1]}</Category>
              ) : (
                <Category />
              )}
            </RoundInfo>

            {displayAiColumn(round)}
          </QuizRow>
        ))}
      </QuizStateContainer>
      {roundStartedByAi ? (
        <Button
          onClick={roundNumber > 5 ? props.startNewGame : props.continueQuiz}
        >
          {roundNumber > 5 ? 'Start New Game!' : 'Click to Continue!'}
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
