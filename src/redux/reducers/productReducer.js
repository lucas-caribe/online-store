import {
  SET_CATEGORY,
  SET_SEARCH_TERM,
  SET_PRODUCTS,
  REQUEST_API,
  FAILED_REQUEST,
} from '../actions/productActions';

const INITIAL_STATE = {
  category: '',
  searchTerm: '',
  productList: [],
  loading: false,
  error: '',
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CATEGORY:
      return { ...state, category: action.payload, loading: false };
    case SET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload, loading: false };
    case SET_PRODUCTS:
      return { ...state, productList: action.payload, loading: false };
    case REQUEST_API:
      return { ...state, loading: true };
    case FAILED_REQUEST:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default productReducer;
