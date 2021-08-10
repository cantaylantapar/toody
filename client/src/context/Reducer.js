const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
        errorCode: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
        errorCode: null,
      };

    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: true,
        errorCode: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        isFetcihng: false,
        error: false,
        errorCode: null,
      };
    default:
      return state;
  }
};

export default Reducer;
