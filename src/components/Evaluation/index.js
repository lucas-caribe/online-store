import React from 'react';
import PropTypes from 'prop-types';
import StarRatings from 'react-star-ratings';

import './style.css';

class Evaluation extends React.Component {
  render() {
    let { email, comment } = this.props;
    const { rating } = this.props;

    if (email === '') {
      email = 'Anônimo';
    }
    if (comment === '') {
      comment = 'Usuário não teceu comentários';
    }

    console.log(rating);
    return (
      <div className="evaluation">
        <div className="email-rating">
          <p className="email">{email}</p>
          <StarRatings
            rating={Number(rating)}
            starRatedColor="rgb(255, 194, 25)"
            starHoverColor="rgb(255, 194, 25)"
            numberOfStars={5}
            name="rating"
            starDimension="1.5em"
            starSpacing="0.5em"
          />
        </div>
        <p>{comment}</p>
      </div>
    );
  }
}

Evaluation.propTypes = {
  email: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Evaluation;
