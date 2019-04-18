import React from 'react';
import styled from 'styled-components';

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
`;

const Header = styled.h1`
  font-size: 2rem;
  position: absolute;
  top: 2rem;
  color: #fff;
`;

const Button = styled.button`
  width: 100%;
  color: #fff;
  font-size: 2.5rem;
  font-family: 'Varela Round', sans-serif;
  background: transparent;
  cursor: pointer;
  border: 2px solid #fff;
  border-radius: 9rem;
  padding: 2.5rem;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  width: 100%;
`;

const ListItem = styled.li`
  margin-bottom: 5px;
`;

const CategoryView = props => {
  return (
    <FlexContainer>
      <Header>Select Category</Header>
      <List>
        {props.categoriesList.map(item => (
          <ListItem>
            <Button
              onClick={() => {
                props.selectCategory(item.id, item.name);
              }}
            >
              {item.name}
            </Button>
          </ListItem>
        ))}
      </List>
    </FlexContainer>
  );
};

export default CategoryView;
