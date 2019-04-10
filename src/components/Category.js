import React, { Component } from 'react';
import styled from 'styled-components';
import CategoryView from './CategoryView';

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      categoriesList: null,
    };

    this.selectCategory = this.selectCategory.bind(this);
    this.getRandomCategories = this.getRandomCategories.bind(this);
  }

  selectCategory(id, name) {
    this.props.addSelectedCategory(id, name);
  }

  getRandomCategories() {
    const newArr = [];
    while (newArr.length < 3) {
      const randomItem = this.props.allCategories[
        Math.floor(Math.random() * this.props.allCategories.length)
      ];
      if (newArr.includes(randomItem) === false) {
        newArr.push(randomItem);
      }
    }
    this.setState({ categoriesList: newArr, dataLoaded: true });
  }

  componentDidMount() {
    if (this.state.categoriesList === null) {
      this.getRandomCategories();
    }
  }

  render() {
    console.log(this.state);
    return (
      this.state.dataLoaded && (
        <CategoryView
          selectCategory={this.selectCategory}
          categoriesList={this.state.categoriesList}
        />
      )
    );
  }
}

export default Category;
