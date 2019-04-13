import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Category from './Category';
import Question from './Question';
import ResultsTable from './ResultsTable';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      isQuizRunning: true,
      humanPlayerTurn: true,
      roundNumber: 1,
      apiCategoriesList: null,
      isCategoryChosen: false,
      allQuestionsAnswered: false,
      selectedCategories: [],
      score: [0, 0],
      selectedAnswersByPlayer: [],
      selectedAnswersByAi: [],
    };

    this.addSelectedCategory = this.addSelectedCategory.bind(this);
    this.isQuestionsRoundFinished = this.isQuestionsRoundFinished.bind(this);
    this.getSelectedAnswers = this.getSelectedAnswers.bind(this);
    this.continueQuiz = this.continueQuiz.bind(this);
  }

  async componentDidMount() {
    if (this.state.apiCategoriesList === null) {
      try {
        const res = await fetch('https://opentdb.com/api_category.php');
        const data = await res.json();
        console.log(data);
        const filteredCategories = data.trivia_categories.map(item => {
          item.name = item.name.replace(/Entertainment: |Science: /g, '');
          return item;
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
      isCategoryChosen: true,
    });
  }

  isQuestionsRoundFinished() {
    this.setState({
      roundNumber: this.state.roundNumber + 1,
      allQuestionsAnswered: true,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.roundNumber !== this.state.roundNumber) {
      this.setState({
        allQuestionsAnswered: false,
        isCategoryChosen: false,
        isQuizRunning: false,
      });
    }
  }

  getSelectedAnswers(answers) {
    this.setState({
      selectedAnswersByPlayer: [...this.state.selectedAnswersByPlayer, answers],
    });
  }

  continueQuiz() {
    this.setState({
      isQuizRunning: true,
    });
  }

  render() {
    if (this.state.dataLoaded) {
      if (this.state.isQuizRunning && this.state.isCategoryChosen === false) {
        return (
          <Category
            addSelectedCategory={this.addSelectedCategory}
            allCategories={this.state.apiCategoriesList}
          />
        );
      }
      if (
        this.state.isQuizRunning &&
        this.state.allQuestionsAnswered === false
      ) {
        return (
          <Question
            getSelectedAnswers={this.getSelectedAnswers}
            isQuestionsRoundFinished={this.isQuestionsRoundFinished}
            categoryID={
              this.state.selectedCategories[this.state.roundNumber - 1][0]
            }
            difficulty={this.props.difficulty}
          />
        );
      }
      if (this.state.isQuizRunning === false) {
        return (
          <ResultsTable
            playerAvatar={this.props.playerAvatar}
            aiAvatar={this.props.aiAvatar}
            categories={this.state.selectedCategories}
            score={this.state.score}
            roundNumber={this.state.roundNumber}
            continueQuiz={this.continueQuiz}
          />
        );
      }
    }
    return null;
  }
}

export default Quiz;
