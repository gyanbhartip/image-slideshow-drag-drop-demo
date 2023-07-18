export type ActionType =
    | {
          type: 'SET_CURRENT';
          current: number;
      }
    | {
          type: 'SET_SLIDER_DATA';
          SliderData: SliderDataListType;
      };

export type InitialStateType = {
    current: number;
    setCurrent: (current: number) => void;
    setSliderData: (SliderData: SliderDataListType) => void;
    SliderData: SliderDataListType;
};

export type SliderDataType = {
    id: string;
    image: string;
    shift: number;
};

export type SliderDataListType = SliderDataType[];
