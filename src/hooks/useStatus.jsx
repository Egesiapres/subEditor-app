import { useReducer } from "react";

const initialState = {
  isLoading: false,
  success: false,
  error: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "STATUS_RESET":
      return {
        isLoading: false,
        success: false,
        error: false,
      };

    case "STATUS_LOADING":
      return {
        isLoading: true,
        success: false,
        error: false,
      };

    case "STATUS_SUCCESS":
      return {
        isLoading: false,
        success: action.payload,
        error: false,
      };

    case "STATUS_ERROR":
      return {
        isLoading: false,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const useStatus = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const reset = () => dispatch({ type: "STATUS_RESET" });

  const setLoading = () => dispatch({ type: "STATUS_LOADING" });

  const setSuccess = success =>
    dispatch({ type: "STATUS_SUCCESS", payload: success });

  const setError = error => dispatch({ type: "STATUS_ERROR", payload: error });

  return { ...state, reset, setLoading, setSuccess, setError };
};
