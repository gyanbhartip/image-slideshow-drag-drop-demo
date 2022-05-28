import { createContext, useContext, useReducer } from "react";
import reducer from "./Reducer";
import { SliderData } from "../../utils/SliderData";

const AppContext = createContext();

const initialState = {
  SliderData: SliderData,
  current: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setSliderData = (SliderData) => {
    dispatch({ type: "SET_SLIDER_DATA", SliderData });
  };

  const setCurrent = (current) => {
    dispatch({ type: "SET_CURRENT", current });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        setSliderData,
        setCurrent,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
