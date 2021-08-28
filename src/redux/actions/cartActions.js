export const SET_PRODUCT = 'SET_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

const setProduct = (product) => ({ type: SET_PRODUCT, payload: product });

export const removeProduct = (product) => ({
  type: REMOVE_PRODUCT,
  payload: product,
});

const increment = (product) => ({ type: INCREMENT, payload: product });

const decrement = (product) => ({ type: DECREMENT, payload: product });

export const incrementThunk = (product) => (dispatch) => {
  const available = product.availableQuantity || product.available_quantity;

  if (product.quantity < available) {
    dispatch(increment(product));
  }
};

export const decrementThunk = (product) => (dispatch) => {
  if (product.quantity > 1) {
    dispatch(decrement(product));
  }
};

export const setProductThunk = (product) => (dispatch, getState) => {
  const {
    cart: { items },
  } = getState();
  const foundItem = items.find((item) => item.id === product.id);

  if (foundItem) {
    dispatch(incrementThunk(foundItem));
  } else {
    dispatch(setProduct({ ...product, quantity: 1 }));
  }
};
