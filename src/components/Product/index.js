import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FaShippingFast } from 'react-icons/fa';
import { AiOutlineShoppingCart } from 'react-icons/ai';

import { setProductThunk } from '../../redux/actions/cartActions';

import './style.css';

class Product extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAtCart: false,
    };
  }

  componentDidMount() {
    this.checkCart();
  }

  checkCart = () => {
    const { cartItems, product } = this.props;

    this.setState({
      isAtCart: cartItems.some((item) => item.id === product.id),
    });
  };

  handleClick = () => {
    const { setProduct, product } = this.props;

    setProduct(product);

    this.setState({
      isAtCart: true,
    });
  };

  handleProductClick = () => {
    const { product, history } = this.props;

    history.push(`/product/${product.id}`);
  };

  handleProductKeyDown = (event) => {
    const ENTER_CODE = 13;

    if (event.keyCode === ENTER_CODE) {
      this.handleProductClick();
    }
  };

  render() {
    const { isAtCart } = this.state;
    const { product } = this.props;
    
    return (
      <div className="product-card" data-testid="product" key={product.id}>
        <div
          className="product-info"
          data-testid="product-detail-link"
          onClick={this.handleProductClick}
          onKeyDown={this.handleProductKeyDown}
          role="link"
          tabIndex={0}
        >
          <div className="image-container">
            <img
              className="product-image"
              src={product.thumbnail}
              alt={`imagem de ${product.title}`}
            />
          </div>
          <p>{product.title}</p>
          <p>{`R$ ${product.price}`}</p>
        </div>
        <button
          className="cart-button"
          type="button"
          data-testid="product-add-to-cart"
          onClick={this.handleClick}
        >
          ADICIONAR AO CARRINHO
        </button>
        {product.freeShipping && (
          <div className="free-shipping">
            <FaShippingFast className="shipping-icon" />
            <p data-testid="free-shipping">FRETE GRÁTIS</p>
          </div>
        )}
        {isAtCart && (
          <div className="at-cart">
            <AiOutlineShoppingCart className="at-cart-icon" />
          </div>
        )}
      </div>
    );
  }
}

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    freeShipping: PropTypes.bool.isRequired,
  }).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ cart }) => ({
  cartItems: cart.items,
});

const mapDispatchToProps = (dispatch) => ({
  setProduct: (product) => dispatch(setProductThunk(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
