import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

class PurchaseScreenItem extends React.Component {
  render() {
    const { amount, price, thumbnail, title } = this.props;
    return (
      <div className="purchase-screen-item">
        <img src={ thumbnail } alt={ title } width="50px" />
        <p>{title}</p>
        <p>{amount}</p>
        <p>{`R$ ${price}`}</p>
      </div>
    );
  }
}

PurchaseScreenItem.propTypes = {
  amount: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default PurchaseScreenItem;
