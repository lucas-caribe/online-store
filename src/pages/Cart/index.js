import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CartItem from '../../components/CartItem';
import HomeIcon from '../../components/HomeIcon';

import './style.css';

class Cart extends React.Component {
  render() {
    const { cartItems, totalPrice } = this.props;

    return (
      <div className="cart-content">
        <HomeIcon />
        <div className="cart-items">
          {cartItems.length !== 0 ? (
            cartItems.map((product) => (
              <CartItem key={product.id} product={product} />
            ))
          ) : (
            <p data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </p>
          )}
          <p className="total-price">{`Total: R$ ${totalPrice.toFixed(2)}`}</p>
          <Link
            className="purchase"
            to="/purchase"
            data-testid="checkout-products"
          >
            FINALIZAR COMPRA
          </Link>
        </div>
      </div>
    );
  }
}

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalPrice: PropTypes.number.isRequired,
};

const mapStateToProps = ({ cart }) => ({
  cartItems: cart.items,
  totalPrice: cart.totalPrice,
});

export default connect(mapStateToProps)(Cart);
