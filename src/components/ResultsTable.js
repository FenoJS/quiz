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
`;

const QuizRow = styled.div`
  display: flex;
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
`;

const Round = styled.span`
  color: #fff;
  font-size: 2rem;
`;
const Category = styled.span`
  color: #fff;
  font-size: 1.5rem;
`;

const Button = styled.button`
  width: 100%;
`;

const ResultsTable = props => {
  const round = [1, 2, 3, 4, 5];
  console.log(props.roundNumber);
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
              <AnswersBarItem correct />
              <AnswersBarItem wrong />
              <AnswersBarItem correct />
            </AnswersBar>
            <RoundInfo>
              <Round>Round {item}</Round>
              {item <= props.roundNumber - 1 ? (
                <Category>{props.categories[item - 1][1]}</Category>
              ) : (
                <Category>.</Category>
              )}
            </RoundInfo>
            <AnswersBar>
              <AnswersBarItem wrong />
              <AnswersBarItem correct />
              <AnswersBarItem wrong />
            </AnswersBar>
          </QuizRow>
        ))}
      </QuizStateContainer>
      <Button onClick={props.continueQuiz}>Play!</Button>
    </FlexContainer>
  );
};

export default ResultsTable;

// const round = [1, 2, 3, 4, 5];

// {
//   round.map(item => {
//     <QuizRow>
//       <AnswersBar>
//         <AnswersBarItem correct />
//         <AnswersBarItem wrong />
//         <AnswersBarItem correct />
//       </AnswersBar>
//       <RoundInfo>
//         <Round>Round 1</Round>
//         <Category>{props.categories[0][1]}</Category>
//       </RoundInfo>
//       <AnswersBar>
//         <AnswersBarItem wrong />
//         <AnswersBarItem correct />
//         <AnswersBarItem wrong />
//       </AnswersBar>
//     </QuizRow>;
//   });
// }

// const ResultsTable = props => {
//   return (
//     <FlexContainer>
//       <ScoreContainer>
//         <Avatar playerAvatar={props.playerAvatar} />
//         <Score>
//           <Point>{props.score[0]}</Point>:<Point>{props.score[1]}</Point>
//         </Score>
//         <Avatar aiAvatar={props.aiAvatar} />
//       </ScoreContainer>
//       <QuizStateContainer>
//         <QuizRow>
//           <AnswersBar>
//             <AnswersBarItem correct />
//             <AnswersBarItem wrong />
//             <AnswersBarItem correct />
//           </AnswersBar>
//           <RoundInfo>
//             <Round>Round 1</Round>
//             <Category>{props.categories[0][1]}</Category>
//           </RoundInfo>
//           <AnswersBar>
//             <AnswersBarItem wrong />
//             <AnswersBarItem correct />
//             <AnswersBarItem wrong />
//           </AnswersBar>
//         </QuizRow>
//       </QuizStateContainer>
//     </FlexContainer>
//   );
// };

// export default ResultsTable;
