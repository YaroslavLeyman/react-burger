import { userActions } from "../actions/userActions";

const initialState = {
  userName: null,
  userLogin: null,
  isAuthenticated: false,
  isResettingPassword: false,
  isLoading: false,
  error: ''
}

export const userReducer = (state = initialState, action: any ) => {

  switch(action.type) {

    case userActions.LOGIN_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }

    case userActions.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        error: '',
        userName: action.payload.name,
        userLogin: action.payload.email
      }
    }

    case userActions.LOGIN_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: 'Ошибка при входе'
      }
    }

    case userActions.REGISTER_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }

    case userActions.REGISTER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: ''
      }
    }

    case userActions.REGISTER_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: 'Ошибка при регистрации'
      }
    }

    case userActions.REFRESH_TOKEN_REQUEST: {
      return {
        ...state,
      }
    }

    case userActions.REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
      }
    }

    case userActions.REFRESH_TOKEN_ERROR: {
      return {
        ...state,
      }
    }

    case userActions.FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
      }
    }

    case userActions.FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        isResettingPassword: true
      }
    }

    case userActions.FORGOT_PASSWORD_ERROR: {
      return {
        ...state,
      }
    }

    case userActions.RESET_PASSWORD_REQUEST: {
      return {
        ...state,
      }
    }

    case userActions.RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        isResettingPassword: false,
      }
    }

    case userActions.RESET_PASSWORD_ERROR: {
      return {
        ...state,
      }
    }

    case userActions.LOGOUT_REQUEST: {
      return {
        ...state,
      }
    }

    case userActions.LOGOUT_SUCCESS: {
      return {
        ...state,
        userName: null,
        userLogin: null,
        isAuthenticated: false
      }
    }

    case userActions.LOGOUT_ERROR: {
      return {
        ...state,
      }
    }

    case userActions.GET_USER_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }

    case userActions.GET_USER_SUCCESS: {
      return {
        ...state,
        userName: action.payload.name,
        userLogin: action.payload.email,
        isAuthenticated: true,
        isLoading: false,
        error: '',
      }
    }

    case userActions.GET_USER_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: 'Ошибка загрузки данных пользователя',
      }
    }

    case userActions.UPDATE_USER_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }

    case userActions.UPDATE_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: '',
      }
    }

    case userActions.UPDATE_USER_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: 'Ошибка обновления пользователя',
      }
    }

    default:
      return state;

  }

}
