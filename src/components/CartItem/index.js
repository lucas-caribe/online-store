import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ImCross } from 'react-icons/im';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

import {
  removeProduct as removeProductAction,
  incrementThunk,
  decrementThunk,
} from '../../redux/actions/cartActions';

import './style.css';

class CartItem extends React.Component {
  handleClick = ({ target }) => {
    const { product, increment, decrement } = this.props;
    const {
      dataset: { action },
    } = target;

    if (action === 'increment') {
      increment(product);
    } else if (action === 'decrement') {
      decrement(product);
    }
  };

  render() {
    const { product, removeProduct } = this.props;
    const { title, price, thumbnail, quantity } = product;

    const fixedPrice = (price * quantity).toFixed(2);

    return (
      <div className="cart-item">
        <button
          className="remove-item"
          type="button"
          onClick={() => removeProduct(product)}
        >
          <ImCross />
        </button>
        <img className="item-image" src={thumbnail} alt={title} />
        <p className="item-title" data-testid="shopping-cart-product-name">
          {title}
        </p>
        <div className="quantity-container">
          <button
            type="button"
            data-action="decrement"
            onClick={this.handleClick}
            data-testid="product-decrease-quantity"
          >
            <AiOutlineMinus />
          </button>
          <p data-testid="shopping-cart-product-quantity">{quantity}</p>
          <button
            type="button"
            data-action="increment"
            onClick={this.handleClick}
            data-testid="product-increase-quantity"
          >
            <AiOutlinePlus />
          </button>
        </div>
        <p className="item-price">R$ {fixedPrice}</p>
      </div>
    );
  }
}

CartItem.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  removeProduct: PropTypes.func.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  removeProduct: (product) => dispatch(removeProductAction(product)),
  increment: (product) => dispatch(incrementThunk(product)),
  decrement: (product) => dispatch(decrementThunk(product)),
});

export default connect(null, mapDispatchToProps)(CartItem);
