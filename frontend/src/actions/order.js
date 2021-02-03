import { SET_MESSAGE } from "./types";

import OrderService from "../services/order.service";

export const messageAddOrder = (data) => (dispatch) => {
  return OrderService.add(data).then((response) => {
    dispatch({
      type: SET_MESSAGE,
      payload: response.data.message,
    });
    return Promise.resolve();
  });
};

