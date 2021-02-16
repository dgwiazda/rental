import {
  CHANGE_EMAIL_FAIL,
  CHANGE_EMAIL_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_USERNAME_FAIL,
  CHANGE_USERNAME_SUCCESS,
  DELETE_ORDER,
  SET_MESSAGE,
} from "./types";

import UserService from "../services/user.service";

export const changeUsername = (userId, username) => (dispatch) => {
  return UserService.changeUsername(userId, username).then(
    (response) => {
      dispatch({
        type: CHANGE_USERNAME_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: CHANGE_USERNAME_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const changeEmail = (userId, email) => (dispatch) => {
  return UserService.changeEmail(userId, email).then(
    (response) => {
      dispatch({
        type: CHANGE_EMAIL_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: CHANGE_EMAIL_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const changePassword = (userId, oldPassword, newPassword) => (
  dispatch
) => {
  return UserService.changePassword(userId, oldPassword, newPassword).then(
    (response) => {
      dispatch({
        type: CHANGE_PASSWORD_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: CHANGE_PASSWORD_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const messageDeleteOrder = (orderId) => (dispatch) => {
  return UserService.deleteOrder(orderId).then((response) => {
    dispatch({
      type: DELETE_ORDER,
    });

    dispatch({
      type: SET_MESSAGE,
      payload: response.data.message,
    });
    return Promise.resolve();
  });
};
