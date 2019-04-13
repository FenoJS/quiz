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
      humanPlayerTurn: true,
      roundNumber: 1,
      apiCategoriesList: null,
      selectedCategories: [],
      result: {
        score: [0, 0],
        selectedAnswers: [{}, {}],
      },
    };

    this.addSelectedCategory = this.addSelectedCategory.bind(this);
    this.isQuestionsRoundFinished = this.isQuestionsRoundFinished.bind(this);
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
    });
  }

  isQuestionsRoundFinished() {
    this.setState({
      roundNumber: this.state.roundNumber + 1,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.roundNumber !== this.state.roundNumber) {
      this.setState({
        renderCategory: true,
      });
    }
  }

  render() {
    if (
      this.state.selectedCategories.length > 0 &&
      this.state.roundNumber === 1
    ) {
      return (
        <Question
          isQuestionsRoundFinished={this.isQuestionsRoundFinished}
          categoryID={
            this.state.selectedCategories[this.state.roundNumber - 1][0]
          }
          difficulty={this.props.difficulty}
        />
      );
    }
    if (this.state.roundNumber === 2) {
      return (
        <ResultsTable
          playerAvatar={this.props.playerAvatar}
          aiAvatar={this.props.aiAvatar}
          categories={this.state.selectedCategories}
        />
      );
    }
    return (
      <Fragment>
        {this.state.dataLoaded || this.state.renderCategory ? (
          <Category
            addSelectedCategory={this.addSelectedCategory}
            allCategories={this.state.apiCategoriesList}
          />
        ) : (
          true
        )}
      </Fragment>
    );
  }
}

export default Quiz;
