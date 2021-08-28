import {
  SET_PRODUCT,
  REMOVE_PRODUCT,
  INCREMENT,
  DECREMENT,
} from '../actions/cartActions';

const INITIAL_STATE = {
  items: [],
  totalPrice: 0,
  itemCount: 0,
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PRODUCT:
      return {
        ...state,
        items: [...state.items, action.payload],
        totalPrice: state.totalPrice + action.payload.price,
        itemCount: state.itemCount + 1,
      };
    case REMOVE_PRODUCT:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
        totalPrice:
          state.totalPrice - action.payload.price * action.payload.quantity,
        itemCount: state.itemCount - action.payload.quantity,
      };
    case INCREMENT:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
        totalPrice: state.totalPrice + action.payload.price,
        itemCount: state.itemCount + 1,
      };
    case DECREMENT:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
        totalPrice: state.totalPrice - action.payload.price,
        itemCount: state.itemCount - 1,
      };
    default:
      return state;
  }
};

export default cartReducer;
