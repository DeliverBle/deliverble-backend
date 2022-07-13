const util = {
  success: (status: number, message: string, data?: any) => {
    return {
      status,
      success: true,
      message,
      // TODO: change naming of data to newsData or other appropriate name
      data: data[0],
      totalCount: data[1]
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
