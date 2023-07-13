import { ReactNode, createContext, useReducer } from "react";
import { SliderData } from "../SliderData";
import { InitialStateType, SliderDataListType } from "../types";
import reducer from "./Reducer";

const initialState: InitialStateType = {
  current: 0,
  setCurrent: () => {
    return;
  },
  setSliderData: () => {
    return;
  },
  SliderData: SliderData,
};

const AppContext = createContext(initialState);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setSliderData = (SliderData: SliderDataListType) => {
    dispatch({ type: "SET_SLIDER_DATA", SliderData });
  };

  const setCurrent = (current: number) => {
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

export { AppContext, AppProvider };
