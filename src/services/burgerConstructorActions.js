import { request } from '../constants/request';
import { baseUrl } from '../constants/api';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';
export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT';
export const ADD_INGREDIENT_TO_CONSTRUCTOR = 'ADD_INGREDIENT_TO_CONSTRUCTOR';
export const ADD_BUN_TO_CONSTRUCTOR = 'ADD_BUN_TO_CONSTRUCTOR';
export const REMOVE_INGREDIENT_FROM_CONSTRUCTOR = 'REMOVE_INGREDIENT_FROM_CONSTRUCTOR';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';
export const CHANGE_INGREDIENTS_ORDER = 'CHANGE_INGREDIENTS_ORDER';
export const SEND_ORDER_REQUEST = 'SEND_ORDER_REQUEST';
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS';
export const SEND_ORDER_ERROR = 'SEND_ORDER_ERROR';

export const getIngredients = () => {
  const dataUrl = baseUrl + "/ingredients";

  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    })

    request(dataUrl)
      .then( (responseData) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          payload: responseData.data
        })
      })
      .catch( (error) => {
        dispatch({
          type: GET_INGREDIENTS_ERROR
        })
        alert("Ошибка при загрузке данных: " + error)
      });
  }
}

export const sendOrder = ( constructorIngredients ) => {
  const dataUrl = baseUrl + "/orders";
  const ingredients = constructorIngredients;

  return function(dispatch) {
    dispatch({
      type: SEND_ORDER_REQUEST
    })

    request(dataUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 'ingredients': ingredients })
    })
        .then( (responseData) => {
          dispatch({
            type: SEND_ORDER_SUCCESS,
            payload: responseData.order.number
          })
          dispatch({
            type: CLEAR_CONSTRUCTOR
          })
        })
        .catch( (error) => {
          dispatch({
            type: SEND_ORDER_ERROR
          })
          alert("Ошибка при отправке данных: " + error)
        });
  }
}

export const addIngredientToConstructor = ( item ) => {
  return function(dispatch) {
    dispatch({
      type: ADD_INGREDIENT_TO_CONSTRUCTOR,
      payload: {...item, constructorId: crypto.randomUUID()}
    })
  }
}

export const addBunToConstructor = ( item ) => {
  return function(dispatch) {
    dispatch({
      type: ADD_BUN_TO_CONSTRUCTOR,
      payload: {...item, constructorId: crypto.randomUUID()}
    })
  }
}

export const changeIngredientsSort = ( dragIndex, hoverIndex, constructorIngredients ) => {
  return function(dispatch) {
    const dragItem = constructorIngredients[dragIndex];
    const newSortIngredients = [...constructorIngredients];
    const prevItem = newSortIngredients.splice(hoverIndex, 1, dragItem);
    newSortIngredients.splice(dragIndex, 1, prevItem[0]);

    dispatch({
      type: CHANGE_INGREDIENTS_ORDER,
      payload: newSortIngredients
    })
  }
}
