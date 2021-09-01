import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchProductsThunk } from '../../redux/actions/productActions';

import './style.css';

class CategoryItem extends React.Component {
  handleCategoryChange = ({ target }) => {
    const { fetchProducts } = this.props;

    if (target.value) {
      fetchProducts(target.value, '');
    }
  };

  render() {
    const { categoryName, categoryId, selectedCategory } = this.props;
    const isSelected = selectedCategory === categoryId;

    return (
      <li>
        <label
          className={isSelected ? 'filter-item selected' : 'filter-item'}
          htmlFor={categoryId}
          data-testid="category"
        >
          <input
            className="item-selector"
            id={categoryId}
            type="radio"
            name="category"
            value={categoryId}
            checked={isSelected}
            onChange={this.handleCategoryChange}
          />
          {categoryName}
        </label>
      </li>
    );
  }
}

CategoryItem.propTypes = {
  categoryName: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  fetchProducts: PropTypes.func.isRequired,
};

const mapStateToProps = ({ products }) => ({
  selectedCategory: products.category,
});

const mapDispatchToProps = (dispatch) => ({
  fetchProducts: (category, searchTerm) =>
    dispatch(fetchProductsThunk(category, searchTerm)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem);
