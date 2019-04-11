import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Category from './Category';
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
        console.log(data);
        const filteredCategories = data.trivia_categories.map(item => {
          item.name = item.name.replace('Entertainment: ', '');
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

  render() {
    if (this.state.selectedCategories.length > 0) {
      return (
        <Question
          categoryID={
            this.state.selectedCategories[this.state.roundNumber - 1][0]
          }
          difficulty={this.props.difficulty}
        />
      );
    }
    return (
      <Fragment>
        {this.state.dataLoaded ? (
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
