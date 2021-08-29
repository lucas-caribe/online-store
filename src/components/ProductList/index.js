import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Product from '../Product';

import './style.css';

class ProductList extends React.Component {
  render() {
    const { loading, productList, searchTerm } = this.props;

    if (loading) {
      return <p>Loading...</p>;
    }

    if (!productList.length) {
      return (
        <div>
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        </div>
      );
    }

    return (
      <>
        {searchTerm && <p>{`resultados da busca por ${searchTerm}`}</p>}
        <div className="products">
          {productList.map((product) => (
            <Product {...this.props} key={product.id} product={product} />
          ))}
        </div>
      </>
    );
  }
}

ProductList.propTypes = {
  productList: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  searchTerm: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ products }) => ({
  productList: products.productList,
  loading: products.loading,
  searchTerm: products.searchTerm,
});

export default connect(mapStateToProps)(ProductList);
