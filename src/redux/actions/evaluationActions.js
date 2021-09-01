export const ADD_EVALUATION = 'ADD_EVALUATION';

const addEvaluation = (productId, evaluation) => ({
  type: ADD_EVALUATION,
  payload: { productId, evaluation },
});

export const addEvaluationThunk = (productId, evaluation) => (dispatch, getState) => {
  const { evaluations } = getState();

  if (evaluations[productId]) {
    dispatch(addEvaluation(productId, [...evaluations[productId], evaluation]));
  } else {
    dispatch(addEvaluation(productId, [evaluation]));
  }
};
