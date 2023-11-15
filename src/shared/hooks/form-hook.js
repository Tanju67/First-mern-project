import React, { useCallback, useEffect, useReducer } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let validArray = [];
      for (const x in state) {
        validArray.push(state[x].isValid);
      }
      const validity = validArray.filter((v) => v === false).length === 0;
      console.log(validArray);
      return {
        ...state,
        [action.id]: { value: action.payload, isValid: action.isValid },
        isValid: validity,
      };

    default:
      return state;
  }
};
export const useForm = (initialState) => {
  const [formState, dispatch] = useReducer(formReducer, initialState);

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      payload: value,
      isValid: isValid,
      id: id,
    });
  }, []);

  // useEffect(() => {
  //   dispatch({ type: "VALID" });
  // }, [formState]);

  return [inputHandler, formState];
};
