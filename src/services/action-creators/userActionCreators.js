import { baseUrl } from "../../constants/api";
import { getCookie, setCookie } from "../../constants/cookies";
import { request, requestWithRefresh } from "../../constants/request";
import { userActions } from "../actions/userActions";

export const login = (email, password) => {

  const requestUrl = baseUrl + "/auth/login";

  return function(dispatch) {
    dispatch({
      type: userActions.LOGIN_REQUEST
    })

    request(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 'email': email, 'password': password })
    })
        .then( (responseData) => {
          dispatch({
            type: userActions.LOGIN_SUCCESS,
            payload: responseData.user
          });
          localStorage.setItem('refreshToken', responseData.refreshToken);
          let authToken;
          authToken = responseData.accessToken.split('Bearer ')[1];
          if (authToken) {
            setCookie('accessToken', authToken );
          }
        })
        .catch( (error) => {
          dispatch({
            type: userActions.LOGIN_ERROR
          })
          alert("Ошибка при логине: " + error)
        });
  }

}

export const register = (email, password, name) => {

  const requestUrl = baseUrl + "/auth/register";

  return function(dispatch) {
    dispatch({
      type: userActions.REGISTER_REQUEST
    })

    request(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 'email': email, 'password': password, 'name': name })
    })
        .then( (responseData) => {
          dispatch({
            type: userActions.REGISTER_SUCCESS,
            payload: responseData.data
          })
        })
        .catch( (error) => {
          dispatch({
            type: userActions.REGISTER_ERROR
          })
          alert("Ошибка при регистрации: " + error)
        });
  }

}

export const refreshToken = () => {

  const requestUrl = baseUrl + "/auth/token";

  return function(dispatch) {
    dispatch({
      type: userActions.REFRESH_TOKEN_REQUEST
    })

    request(requestUrl)
      .then( (responseData) => {
        dispatch({
          type: userActions.REFRESH_TOKEN_SUCCESS,
          payload: responseData.data
        })
      })
      .catch( (error) => {
        dispatch({
          type: userActions.REFRESH_TOKEN_ERROR
        })
        alert("Ошибка при обновлении токена: " + error)
      });
  }

}

export const forgotPassword = (email) => {

  const requestUrl = baseUrl + "/password-reset";

  return function(dispatch) {
    dispatch({
      type: userActions.FORGOT_PASSWORD_REQUEST
    })

    request(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 'email': email })
    })
      .then( (responseData) => {
        dispatch({
          type: userActions.FORGOT_PASSWORD_SUCCESS
        })
      })
      .catch( (error) => {
        dispatch({
          type: userActions.FORGOT_PASSWORD_ERROR
        })
        alert("Ошибка при запросе на восстановление пароля: " + error)
      });
  }

}

export const resetPassword = (newPassword, resetPasswordCode) => {

  const requestUrl = baseUrl + "/password-reset/reset";

  return function(dispatch) {
    dispatch({
        type: userActions.RESET_PASSWORD_REQUEST
    })

    request(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 'password': newPassword, 'token': resetPasswordCode })
    })
      .then( (responseData) => {
        dispatch({
          type: userActions.RESET_PASSWORD_SUCCESS
        })
      })
      .catch( (error) => {
        dispatch({
          type: userActions.RESET_PASSWORD_ERROR
        })
        alert("Ошибка при восстановлении пароля: " + error)
      });
  }

}

export const logout = () => {

  const requestUrl = baseUrl + "/auth/logout";

  return function(dispatch) {
    dispatch({
      type: userActions.LOGOUT_REQUEST
    })

    request(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 'token': localStorage.getItem('refreshToken') ?? '' })
    })
      .then( (responseData) => {
        dispatch({
          type: userActions.LOGOUT_SUCCESS
        })
      })
      .catch( (error) => {
        dispatch({
          type: userActions.LOGOUT_ERROR
        })
        alert("Ошибка при выходе из системы: " + error)
      });
  }

}

export const getUser = () => {

  const requestUrl = baseUrl + "/auth/user";

  return function(dispatch) {
    dispatch({
      type: userActions.GET_USER_REQUEST
    })

    requestWithRefresh(requestUrl, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + getCookie('accessToken')
      },
    })
      .then( (responseData) => {
        dispatch({
          type: userActions.GET_USER_SUCCESS,
          payload: responseData.user
        })
      })
      .catch( (error) => {
        dispatch({
          type: userActions.GET_USER_ERROR
        })
        alert("Ошибка загрузки пользователя: " + error)
      });
  }

}

export const updateUser = (name, email, password) => {

  const requestUrl = baseUrl + "/auth/user";

  return function(dispatch) {
    dispatch({
      type: userActions.UPDATE_USER_REQUEST
    })

    requestWithRefresh(requestUrl, {
      method: 'PATCH',
      headers: {
        'Authorization': 'Bearer ' + getCookie('accessToken')
      },
      body: JSON.stringify({ 'name': name, 'email': email, 'password': password })
    })
      .then( (responseData) => {
        dispatch({
          type: userActions.UPDATE_USER_SUCCESS,
          payload: responseData.user
        })
      })
      .catch( (error) => {
        dispatch({
          type: userActions.UPDATE_USER_ERROR
        })
        alert("Ошибка обновления пользователя: " + error)
      });
  }

}
