const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT":
      return { ...state, current: action.current };
    case "SET_SLIDER_DATA":
      return { ...state, SliderData: action.SliderData };
    default:
      return state;
  }
};

export default reducer;
