import { getProductsFromCategoryAndQuery } from '../../services/api';

export const SET_CATEGORY = 'SET_CATEGORY';
export const SET_SEARCH_TERM = 'SET_SEARCH_TERM';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const REQUEST_API = 'REQUEST_API';
export const FAILED_REQUEST = 'FAILED_REQUEST';


const requestApi = () => ({ type: REQUEST_API });
const failedRequest = (error) => ({ type: FAILED_REQUEST, payload: error });

const setCategory = (category) => ({ type: SET_CATEGORY, payload: category });

const setSearchTerm = (searchTerm) => ({
  type: SET_SEARCH_TERM,
  payload: searchTerm,
});

const setProducts = (productList) => ({
  type: SET_PRODUCTS,
  payload: productList,
});

export const fetchProductsThunk = (category, searchTerm) => async (dispatch) => {
  dispatch(requestApi());

  try {
    const response = await getProductsFromCategoryAndQuery(category, searchTerm);
    const productList = response.results.map((product) => ({
      id: product.id,
      title: product.title,
      thumbnail: product.thumbnail,
      price: product.price,
      attributes: product.attributes,
      availableQuantity: product.available_quantity,
      freeShipping: product.shipping.free_shipping,
    }));

    dispatch(setCategory(category));
    dispatch(setSearchTerm(searchTerm));
    dispatch(setProducts(productList));
  } catch (error) {
    dispatch(failedRequest(error));
  }
}
