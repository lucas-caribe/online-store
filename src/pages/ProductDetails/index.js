import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import HomeIcon from '../../components/HomeIcon';
import EvaluatingForm from '../../components/EvaluatingForm';
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
      evaluations: [],
    };
  }

  componentDidMount() {
    this.fetchProduct();
  }

  // addEvaluation = (evaluation) => {
  //   const items = getItemsFromLocalStorage('evaluations');

  //   const newItems = [...items, evaluation];

  //   saveItemToLocalStorage('evaluations', newItems);

  //   this.setState((prevState) => ({
  //     evaluations: [...prevState.evaluations, evaluation],
  //   }));
  // };

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

  // getEvaluationsById = (id) => {
  //   const evaluations = getItemsFromLocalStorage('evaluations');

  //   const filteredEvaluations = evaluations.filter(
  //     (element) => element.id === id,
  //   );

  //   this.setState({
  //     evaluations: filteredEvaluations,
  //   });
  // };

  handleClick = () => {
    const { setProduct } = this.props;
    const { product } = this.state;

    setProduct(product);
  };

  render() {
    const { loading, product, evaluations } = this.state;

    if (loading) {
      return <p>Loading</p>;
    }

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
          <EvaluatingForm id={product.id} addEvaluation={this.addEvaluation} />
          <EvaluationsZone evaluations={evaluations} />
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
};

const mapDispatchToProps = (dispatch) => ({
  setProduct: (product) => dispatch(setProductThunk(product)),
});

export default connect(null, mapDispatchToProps)(ProductDetails);
