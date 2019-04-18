import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Category from './Category';
import Question from './Question';
import ResultsTable from './ResultsTable';
import { getAiAnswers, getAiCategory } from '../utils/utils';

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
  }

  async componentDidMount() {
    if (this.state.apiCategoriesList === null) {
      try {
        const res = await fetch('https://opentdb.com/api_category.php');
        const data = await res.json();

        // Remove anime & Manga category
        const filteredCategories = data.trivia_categories.filter(item => {
          if (item.id !== 31) {
            item.name = item.name.replace(/Entertainment: |Science: /g, '');
            return item;
          }
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
    console.log(id, name);
    this.setState({
      selectedCategories: [...this.state.selectedCategories, [id, name]],
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.roundStartedByPlayer) {
      if (prevState.selectedCategories !== this.state.selectedCategories) {
        this.setState({
          renderCategory: false,
          renderQuestion: true,
        });
      }
      if (
        prevState.selectedAnswersByPlayer !== this.state.selectedAnswersByPlayer
      ) {
        const aiAnswers = getAiAnswers(this.props.difficulty);
        this.setState({
          selectedAnswersByAi: [...this.state.selectedAnswersByAi, aiAnswers],
          renderScore: true,
          renderQuestion: false,
        });
      }
      if (prevState.renderScore !== this.state.renderScore) {
        const aiAnswers = getAiAnswers(this.props.difficulty);
        const aiCategory = getAiCategory(this.state.apiCategoriesList);
        setTimeout(() => {
          this.setState({
            selectedAnswersByAi: [...this.state.selectedAnswersByAi, aiAnswers],
            selectedCategories: [
              ...this.state.selectedCategories,
              [aiCategory.id, aiCategory.name],
            ],
            roundStartedByPlayer: false,
            roundNumber: this.state.roundNumber + 1,
            renderScore: false,
            renderScoreAi: true,
          });
        }, 1500);
      }
    }
    if (this.state.roundStartedByPlayer === false) {
      if (
        prevState.selectedAnswersByPlayer !== this.state.selectedAnswersByPlayer
      ) {
        this.setState({
          roundStartedByPlayer: true,
          roundNumber: this.state.roundNumber + 1,
          renderCategory: true,
        });
      }
    }
    if (
      prevState.selectedAnswersByPlayer !==
        this.state.selectedAnswersByPlayer ||
      (prevState.selectedAnswersByAi !== this.state.selectedAnswersByAi &&
        this.state.roundStartedByPlayer)
    ) {
      this.updateScore(
        this.state.selectedAnswersByPlayer,
        this.state.selectedAnswersByAi
      );
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

  render() {
    if (this.state.dataLoaded) {
      if (this.state.roundStartedByPlayer) {
        if (this.state.renderCategory)
          return (
            <Category
              addSelectedCategory={this.addSelectedCategory}
              allCategories={this.state.apiCategoriesList}
            />
          );
        if (this.state.renderQuestion) {
          return (
            <Question
              getSelectedAnswers={this.getSelectedAnswers}
              categoryID={
                this.state.selectedCategories[this.state.roundNumber - 1][0]
              }
              difficulty={this.props.difficulty}
            />
          );
        }
      }
      if (this.state.roundStartedByPlayer === false) {
        if (this.state.renderQuestion) {
          return (
            <Question
              getSelectedAnswers={this.getSelectedAnswers}
              categoryID={
                this.state.selectedCategories[this.state.roundNumber - 1][0]
              }
              difficulty={this.props.difficulty}
            />
          );
        }
      }
      if (
        (this.state.roundStartedByPlayer === false &&
          this.state.renderScoreAi) ||
        (this.state.roundStartedByPlayer && this.state.renderScore)
      ) {
        return (
          <ResultsTable
            playerAvatar={this.props.playerAvatar}
            aiAvatar={this.props.aiAvatar}
            categories={this.state.selectedCategories}
            score={this.state.score}
            roundNumber={this.state.roundNumber}
            continueQuiz={this.continueQuiz}
            playerAnswers={this.state.selectedAnswersByPlayer}
            aiAnswers={this.state.selectedAnswersByAi}
            roundStartedByPlayer={this.state.roundStartedByPlayer ? true : null}
            roundStartedByAi={this.state.roundStartedByPlayer ? null : true}
          />
        );
      }
    }
    return null;
  }
}

export default Quiz;
