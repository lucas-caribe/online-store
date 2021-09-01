import React from 'react';
import PropTypes from 'prop-types';
import Evaluation from '../Evaluation';

class EvaluationsZone extends React.Component {
  render() {
    const { evaluations } = this.props;
    return (
      <div>
        {evaluations.map((element, index) => (
          <Evaluation
            key={index}
            email={element.email}
            rating={element.rating}
            comment={element.comment}
          />
        ))}
      </div>
    );
  }
}

EvaluationsZone.propTypes = {
  evaluations: PropTypes.arrayOf(PropTypes.object),
};

EvaluationsZone.defaultProps = {
  evaluations: [],
};

export default EvaluationsZone;
