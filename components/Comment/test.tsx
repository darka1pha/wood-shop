import { useEffect, useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [...state, ""];
    case "change":
      const newArray = [...state];
      newArray[action.payload.index] = action.payload.value;
      return newArray;
    case "remove":
      return state.filter((_, i) => i !== state.length - 1);

    default:
      return state;
  }
};
const Test = () => {
  const [formState, dispatch] = useReducer(reducer, [""]);
  useEffect(() => {
    if (formState[formState.length - 1]) {
      dispatch({ type: "add" });
    } else if (formState.length > 1 && !formState[formState.length - 2]) {
      dispatch({ type: "remove" });
    }
  }, [formState]);
  return (
    <div className="App">
      {formState?.map((input, index) => (
        <input
          key={index}
          onChange={(e) =>
            dispatch({
              type: "change",
              payload: { index, value: e.target.value }
            })
          }
          value={input}
        />
      ))}
    </div>
  );
}

export default Test;