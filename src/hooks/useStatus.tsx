import { useReducer } from "react";
interface State {
  isLoading: boolean;
  success: boolean;
  error: boolean;
}

interface Action {
  type: string;
  payload?: any;
}

export interface StatusType extends State {
  reset: () => void;
  setLoading: () => void;
  setSuccess: () => void;
  // ?
  setError: (err: any) => void;
}

const initialState: State = {
  isLoading: false,
  success: false,
  error: false,
};

const reducer = (state: State, action: Action) => {
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

  const setSuccess = (success: any) =>
    dispatch({ type: "STATUS_SUCCESS", payload: success });

  const setError = (error: any) => {
    dispatch({ type: "STATUS_ERROR", payload: error });

    console.error(error);
  };

  return { ...state, reset, setLoading, setSuccess, setError };
};
