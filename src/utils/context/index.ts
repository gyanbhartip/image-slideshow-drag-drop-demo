import { useContext } from 'react';
import { AppContext } from './Context';

export const useGlobalContext = () => {
    return useContext(AppContext);
};
