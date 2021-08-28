import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

class PurchaseForm extends React.Component {
  render() {
    const { name, email, cpf, phone, postalCode, adress, onClick, onChange } = this.props;
    return (
      <form className="purchase-form">
        <h3 className="customer-info-header">Informações do comprador</h3>
        <div className="customer-info">
          <input
            required
            name="name"
            type="text"
            data-testid="checkout-fullname"
            onChange={ onChange }
            value={ name }
            placeholder="Nome Completo"
            className="name"
          />

          <input
            required
            name="cpf"
            type="text"
            data-testid="checkout-cpf"
            placeholder="CPF (apenas números)"
            onChange={ onChange }
            value={ cpf }
            className="cpf"
          />

          <input
            required
            name="email"
            type="email"
            data-testid="checkout-email"
            onChange={ onChange }
            value={ email }
            placeholder="Email"
            className="email"
          />

          <input
            required
            name="phone"
            type="text"
            data-testid="checkout-phone"
            onChange={ onChange }
            value={ phone }
            placeholder="Telefone"
            className="phone"
          />

          <input
            required
            name="postalCode"
            type="text"
            data-testid="checkout-cep"
            onChange={ onChange }
            value={ postalCode }
            placeholder="CEP (apenas números)"
            className="cep"
          />

          <input
            required
            name="adress"
            type="text"
            data-testid="checkout-address"
            onChange={ onChange }
            value={ adress }
            placeholder="Endereço"
            className="address"
          />
        </div>
        <button type="submit" onClick={ onClick }>
          Finalizar Compra
        </button>
      </form>
    );
  }
}

PurchaseForm.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  cpf: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  postalCode: PropTypes.string.isRequired,
  adress: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PurchaseForm;
