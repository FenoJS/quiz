import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import SelectCategory from './SelectCategory';
import Question from './Question';

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
        correctAnswers: [],
      },
    };

    this.addSelectedCategory = this.addSelectedCategory.bind(this);
  }

  async componentDidMount() {
    if (this.state.apiCategoriesList === null) {
      try {
        const res = await fetch('https://opentdb.com/api_category.php');
        const data = await res.json();
        this.setState({
          apiCategoriesList: data.trivia_categories,
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

  render() {
    if (this.state.selectedCategories.length > 0) {
      return (
        <Question
          categoryID={
            this.state.selectedCategories[this.state.roundNumber - 1][0]
          }
        />
      );
    }
    return (
      <Fragment>
        {this.state.dataLoaded ? (
          <SelectCategory
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
