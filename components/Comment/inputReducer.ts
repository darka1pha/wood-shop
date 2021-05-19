export const reducer = (state, action) => {
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