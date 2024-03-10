import { createContext, useContext } from 'react';
import gameStore from './GameStore';

const store = {
    gameStore: gameStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
    return useContext<typeof store>(StoreContext);
};

export default store;
