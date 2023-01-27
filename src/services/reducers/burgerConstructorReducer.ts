import { burgerConstructorActions } from "../actions/burgerConstructorActions";
import { TConstructorIngredient } from "../../constants/type-check";

const initialState = {
  allIngredients: [],
  constructorIngredients: [],
  constructorBun: null,
  order: null,
  isLoading: false,
  error: ''
}

export const burgerConstructorReducer = (state = initialState, action: any) => {

  switch(action.type) {

    case burgerConstructorActions.GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }

    case burgerConstructorActions.GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        allIngredients: action.payload,
        isLoading: false,
        error: ''
      }
    }

    case burgerConstructorActions.GET_INGREDIENTS_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: 'Не удалось загрузить ингредиенты'
      }
    }

    case burgerConstructorActions.ADD_BUN_TO_CONSTRUCTOR: {
      return {
        ...state,
        constructorBun: action.payload
      }
    }

    case burgerConstructorActions.ADD_INGREDIENT_TO_CONSTRUCTOR: {
      return {
        ...state,
        constructorIngredients: [...state.constructorIngredients, action.payload]
      }
    }

    case burgerConstructorActions.REMOVE_INGREDIENT_FROM_CONSTRUCTOR: {
      return {
        ...state,
        constructorIngredients: [...state.constructorIngredients].filter((item: TConstructorIngredient) => item.constructorId !== action.payload)
      }
    }

    case burgerConstructorActions.CLEAR_CONSTRUCTOR: {
      return {
        ...state,
        constructorIngredients: [],
        constructorBun: null
      }
    }

    case burgerConstructorActions.CHANGE_INGREDIENTS_ORDER: {
      return {
        ...state,
        constructorIngredients: action.payload
      }
    }

    case burgerConstructorActions.SEND_ORDER_REQUEST: {
      return {
        ...state,
      }
    }

    case burgerConstructorActions.SEND_ORDER_SUCCESS: {
      return {
        ...state,
        order: action.payload
      }
    }

    case burgerConstructorActions.SEND_ORDER_ERROR: {
      return {
        ...state,
      }
    }

    default:
      return state;

  }

};
