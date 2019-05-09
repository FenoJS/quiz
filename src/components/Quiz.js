import React, { Component } from 'react';
import { getAiAnswers, getAiCategory } from '../utils/utils';
import Category from './Category';
import Question from './Question';
import ResultsTable from './ResultsTable';
import LoadingScreen from './LoadingScreen';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      renderCategory: true,
      roundStartedByPlayer: true,
      roundNumber: 1,
      renderScore: false,
      apiCategoriesList: null,
      selectedCategories: [],
      score: [0, 0],
      selectedAnswersByPlayer: [],
      selectedAnswersByAi: [],
    };

    this.addSelectedCategory = this.addSelectedCategory.bind(this);
    this.getSelectedAnswers = this.getSelectedAnswers.bind(this);
    this.continueQuiz = this.continueQuiz.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
  }

  async componentDidMount() {
    if (this.state.apiCategoriesList === null) {
      try {
        const res = await fetch('https://opentdb.com/api_category.php');
        const data = await res.json();

        // Remove anime & Manga category
        const filteredCategories = data.trivia_categories.filter(item => {
          item.name = item.name.replace(/Entertainment: |Science: /g, '');
          return item.id !== 31;
        });

        this.setState({
          apiCategoriesList: filteredCategories,
          dataLoaded: true,
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  addSelectedCategory(id, name) {
    this.setState({
      selectedCategories: [...this.state.selectedCategories, [id, name]],
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      roundStartedByPlayer,
      selectedAnswersByPlayer,
      selectedAnswersByAi,
      selectedCategories,
    } = this.state;

    if (roundStartedByPlayer) {
      if (prevState.selectedCategories !== selectedCategories) {
        this.setState({
          renderCategory: false,
          renderQuestion: true,
        });
      }
      if (prevState.selectedAnswersByPlayer !== selectedAnswersByPlayer) {
        const aiAnswers = getAiAnswers(this.props.difficulty);
        this.setState({
          selectedAnswersByAi: [...selectedAnswersByAi, aiAnswers],
          renderScore: true,
          renderQuestion: false,
        });
      }
      if (prevState.renderScore !== this.state.renderScore) {
        const aiAnswers = getAiAnswers(this.props.difficulty);
        const aiCategory = getAiCategory(this.state.apiCategoriesList);
        setTimeout(() => {
          this.setState({
            selectedAnswersByAi: [...selectedAnswersByAi, aiAnswers],
            selectedCategories: [
              ...selectedCategories,
              [aiCategory.id, aiCategory.name],
            ],
            roundStartedByPlayer: false,
            roundNumber: this.state.roundNumber + 1,
            renderScore: false,
            renderScoreAi: true,
          });
        }, 1500);
      }
    } else if (roundStartedByPlayer === false) {
      if (prevState.selectedAnswersByPlayer !== selectedAnswersByPlayer) {
        this.setState({
          roundStartedByPlayer: true,
          roundNumber: this.state.roundNumber + 1,
          renderCategory: true,
        });
      }
    }
    if (
      prevState.selectedAnswersByPlayer !== selectedAnswersByPlayer ||
      (prevState.selectedAnswersByAi !== selectedAnswersByAi &&
        roundStartedByPlayer)
    ) {
      this.updateScore(selectedAnswersByPlayer, selectedAnswersByAi);
    }
  }

  getSelectedAnswers(answers) {
    this.setState({
      selectedAnswersByPlayer: [...this.state.selectedAnswersByPlayer, answers],
    });
  }

  updateScore(playerAnswers, AiAnswers) {
    const playerScore = playerAnswers
      .reduce((arrayOne, arrayTwo) => {
        return arrayOne.concat(arrayTwo);
      }, [])
      .filter(item => item === true);
    const AiScore = AiAnswers.reduce((arrayOne, arrayTwo) => {
      return arrayOne.concat(arrayTwo);
    }, []).filter(item => item === true);
    this.setState({
      score: [playerScore.length, AiScore.length],
    });
  }

  continueQuiz() {
    this.setState({
      roundStartedByPlayer: false,
      renderQuestion: true,
    });
  }

  startNewGame() {
    this.props.startNewGame();
  }

  render() {
    const {
      roundStartedByPlayer,
      renderCategory,
      renderQuestion,
      roundNumber,
      selectedCategories,
    } = this.state;

    if (this.state.dataLoaded) {
      if (roundStartedByPlayer) {
        if (renderCategory)
          return (
            <Category
              addSelectedCategory={this.addSelectedCategory}
              allCategories={this.state.apiCategoriesList}
            />
          );
        if (renderQuestion) {
          return (
            <Question
              getSelectedAnswers={this.getSelectedAnswers}
              categoryID={selectedCategories[roundNumber - 1][0]}
              difficulty={this.props.difficulty}
            />
          );
        }
      }
      if (roundStartedByPlayer === false) {
        if (renderQuestion) {
          return (
            <Question
              getSelectedAnswers={this.getSelectedAnswers}
              categoryID={selectedCategories[roundNumber - 1][0]}
              difficulty={this.props.difficulty}
            />
          );
        }
      }
      if (
        (roundStartedByPlayer === false && this.state.renderScoreAi) ||
        (roundStartedByPlayer && this.state.renderScore)
      ) {
        return (
          <ResultsTable
            playerAvatar={this.props.playerAvatar}
            aiAvatar={this.props.aiAvatar}
            categories={selectedCategories}
            score={this.state.score}
            roundNumber={roundNumber}
            continueQuiz={this.continueQuiz}
            startNewGame={this.startNewGame}
            playerAnswers={this.state.selectedAnswersByPlayer}
            aiAnswers={this.state.selectedAnswersByAi}
            roundStartedByAi={roundStartedByPlayer ? null : true}
          />
        );
      }
    }
    return <LoadingScreen />;
  }
}

export default Quiz;
