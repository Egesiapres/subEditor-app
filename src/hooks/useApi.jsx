import { useEffect, useReducer } from "react";

const initialState = {
  loading: false,
  data: [],
  error: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "REQUEST_START":
      return {
        isLoading: true,
        data: [],
        error: false,
      };

    case "REQUEST_SUCCESS":
      return {
        isLoading: false,
        data: action.payload,
        error: false,
      };

    case "REQUEST_ERROR":
      return {
        isLoading: false,
        data: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

export const useApi = api => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = async () => {
    dispatch({ type: "REQUEST_START" });

    try {
      const data = await api();

      dispatch({ type: "REQUEST_SUCCESS", payload: data });

      return data;
    } catch (error) {
      dispatch({ type: "REQUEST_ERROR", payload: error });
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
};
