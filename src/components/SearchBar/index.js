import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FaSearch } from 'react-icons/fa';

import { fetchProductsThunk } from '../../redux/actions/productActions';

import './style.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: props.searchTerm,
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      searchTerm: target.value,
    });
  };

  handleClick = (event) => {
    event.preventDefault();
    const { fetchProducts } = this.props;
    const { searchTerm } = this.state;

    this.setState({
      searchTerm: '',
    });
    fetchProducts('', searchTerm);
  };

  render() {
    const { searchTerm } = this.state;

    return (
      <form className="search-form">
        <input
          className="search-input"
          type="text"
          value={searchTerm}
          onChange={this.handleChange}
          data-testid="query-input"
        />
        <button
          className="search-button"
          type="submit"
          onClick={this.handleClick}
          data-testid="query-button"
        >
          <FaSearch />
        </button>
      </form>
    );
  }
}

SearchBar.propTypes = {
  fetchProducts: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchProducts: (category, searchTerm) =>
    dispatch(fetchProductsThunk(category, searchTerm)),
});

export default connect(null, mapDispatchToProps)(SearchBar);
