import React from 'react';

import CategoryItem from '../CategoryItem';

import * as api from '../../services/api';

import './style.css';

class CategoryList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = async () => {
    const data = await api.getCategories();

    if (data) this.setState({ categories: data });
  };

  render() {
    const { categories } = this.state;

    return (
      <div className="sidebar">
        <ul className="filter">
          {categories.map(({ id, name }) => (
            <CategoryItem key={id} categoryName={name} categoryId={id} />
          ))}
        </ul>
      </div>
    );
  }
}

export default CategoryList;
