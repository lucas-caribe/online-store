import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import HomeIcon from '../../components/HomeIcon';
import EvaluationForm from '../../components/EvaluationForm';
import EvaluationsZone from '../../components/EvaluationsZone';

import { getProductById } from '../../services/api';

import { setProductThunk } from '../../redux/actions/cartActions';

import './style.css';

class ProductDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      product: {},
    };
  }

  componentDidMount() {
    this.fetchProduct();
  }

  fetchProduct = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    const product = await getProductById(id);

    this.setState({
      product,
      loading: false,
    });
  };

  handleClick = () => {
    const { setProduct } = this.props;
    const { product } = this.state;

    setProduct(product);
  };

  render() {
    const { loading, product } = this.state;
    const { evaluations } = this.props;

    if (loading) {
      return <p>Loading</p>;
    }

    const productEvaluations = evaluations[product.id];

    return (
      <>
        <HomeIcon />
        <div className="product-details">
          <h1 data-testid="product-detail-name">{product.title}</h1>

          <p className="product-price">R$ {product.price}</p>

          <div className="product-main-info">
            <img src={product.pictures[0].url} alt={product.title} />

            <div className="product-attributes">
              <h1>Especificações técnicas</h1>

              {product.attributes.map((attribute) => (
                <p key={attribute.name}>
                  {`${attribute.name}: `}
                  <span>{attribute.value_name}</span>
                </p>
              ))}
            </div>
          </div>
          <button
            data-testid="product-detail-add-to-cart"
            type="button"
            onClick={this.handleClick}
          >
            ADICIONAR AO CARRINHO
          </button>
          <EvaluationForm id={product.id} />
          <EvaluationsZone evaluations={productEvaluations} />
        </div>
      </>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool.isRequired,
    params: PropTypes.objectOf(PropTypes.string).isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  setProduct: PropTypes.func.isRequired,
  evaluations: PropTypes.objectOf(PropTypes.array).isRequired,
};

const mapStateToProps = ({ evaluations }) => ({
  evaluations,
});

const mapDispatchToProps = (dispatch) => ({
  setProduct: (product) => dispatch(setProductThunk(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
