import { combineReducers } from 'redux';

import productReducer from './productReducer';
import cartReducer from './cartReducer';
import evaluationReducer from './evaluationReducer';

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  evaluations: evaluationReducer,
});

export default rootReducer;
