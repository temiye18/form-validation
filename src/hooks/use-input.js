import { useReducer } from "react";

const initialInputState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  /*
  switch (action.type) {
    case "INPUT__CHANGE":
      return {
        value: action.value,
        isTouched: state.isTouched,
      };
    case "RESET":
      return {
        value: "",
        isTouched: false,
      };
    case "BLUR":
      return {
        value: state.value,
        isTouched: true,
      };
    default:
      return state;
  }
*/
  if (action.type === "INPUT__CHANGE") {
    return {
      value: action.value,
      isTouched: state.isTouched,
    };
  }
  if (action.type === "BLUR") {
    return {
      value: state.value,
      isTouched: true,
    };
  }
  if (action.type === "RESET") {
    return {
      value: "",
      isTouched: false,
    };
  }
  return state;
};

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({ type: "INPUT__CHANGE", value: event.target.value });
  };
  const inputBlurHandler = () => {
    dispatch({ type: "BLUR" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    reset,
    inputBlurHandler,
  };
};

export default useInput;
