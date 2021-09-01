import { ADD_EVALUATION } from '../actions/evaluationActions';

const INITIAL_STATE = {};

const evaluationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_EVALUATION:
      return {
        ...state,
        [action.payload.productId]: action.payload.evaluation,
      };
    default:
      return state;
  }
};

export default evaluationReducer;
