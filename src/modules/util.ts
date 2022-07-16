import { PaginationInfo } from "../types";

const util = {
  success: (status: number, message: string, data?: any, paginationInfo?: PaginationInfo) => {
    return {
      status,
      success: true,
      message,
      // TODO: change naming of data to newsData or other appropriate name
      data,
      // TODO: refactor for controller function which doesn't use paginationInfo
      paginationInfo,
    };
  },
  fail: (status: number, message: string, data?: any) => {
    return {
      status,
      success: false,
      message,
    };
  },
};

export default util;
