const util = {
  success: (status: number, message: string, data?: any, totalCount?: number) => {
    return {
      status,
      success: true,
      message,
      // TODO: change naming of data to newsData or other appropriate name
      data: data[0],
      totalCount
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
