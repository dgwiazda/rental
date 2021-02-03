import { SET_MESSAGE } from "./types";

import AdminService from "../services/admin.service";

export const messageChangeAvailiable = (id) => (dispatch) => {
  return AdminService.changeAvailiable(id).then((response) => {
    dispatch({
      type: SET_MESSAGE,
      payload: response.data.message,
    });
    return Promise.resolve();
  });
};
