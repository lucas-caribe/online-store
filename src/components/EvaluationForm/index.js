import React from 'react';
import PropTypes from 'prop-types';
import StarRatings from 'react-star-ratings';
import { connect } from 'react-redux';

import { addEvaluationThunk } from '../../redux/actions/evaluationActions';

import './style.css';

class EvaluationForm extends React.Component {
  constructor() {
    super();

    this.state = {
      rating: 0,
      comment: '',
      email: '',
    };
  }

  handleClick = (event) => {
    event.preventDefault();

    const { id, addEvaluation } = this.props;

    addEvaluation(id, this.state);

    this.setState({
      rating: 0,
      comment: '',
      email: '',
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  handleStarChange = (rating) => {
    this.setState({
      rating,
    });
  };

  render() {
    const { rating, comment, email } = this.state;
    const { addEvaluation } = this.props;

    return (
      <div className="evaluation-section">
        <h1>Avaliações</h1>
        <form className="evaluation-form">
          <div className="email-rating">
            <input
              id="email"
              name="email"
              type="text"
              value={email}
              onChange={this.handleChange}
              placeholder="Email"
            />

            <StarRatings
              rating={rating}
              starRatedColor="rgb(255, 194, 25)"
              starHoverColor="rgb(255, 194, 25)"
              changeRating={this.handleStarChange}
              numberOfStars={5}
              name="rating"
              starDimension="2em"
              starSpacing="0.5em"
            />
          </div>

          <textarea
            id="comment"
            name="comment"
            value={comment}
            onChange={this.handleChange}
            data-testid="product-detail-evaluation"
            placeholder="Comentários"
          />

          <button
            type="submit"
            onClick={(event) => this.handleClick(event, addEvaluation)}
          >
            AVALIAR
          </button>
        </form>
      </div>
    );
  }
}

EvaluationForm.propTypes = {
  id: PropTypes.string.isRequired,
  addEvaluation: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addEvaluation: (productId, evaluation) =>
    dispatch(addEvaluationThunk(productId, evaluation)),
});

export default connect(null, mapDispatchToProps)(EvaluationForm);
