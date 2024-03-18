import { makeAutoObservable } from 'mobx';
import { Investments } from '../components/main-container/types';
import { ACCUM, ACCUM_LIMIT_REFRESH_AMOUNT, DEFAULT_INC_TAP_VALUE, instrumentsLevelsMock } from './constants';
import { instrumentsMock } from '../components/main-container/constants';
import bg from '../components/main-container/main-bg.png';

export enum PopupsEnum {
    'INVESTMENTS' = 'INVESTMENTS',
    'UPGRADES' = 'UPGRADES',
}

type Store = {
    points: number;
    pointsPerSecond: number;
    levelsByName: Record<string, number>;
    investments: Investments;
    accum: number;
    accumCapacity: number;
    accumLimitAmount: number;
    incTapValue: number;
    isTurboTapMode: boolean;
    isTap: boolean;
    activePopup?: PopupsEnum;
    roomUpgrades: {
        main: string;
    };
};
const gameStore = () => {
    return makeAutoObservable<Store>({
        points: 0,
        pointsPerSecond: 0,
        investments: instrumentsMock,
        levelsByName: instrumentsLevelsMock,
        accum: ACCUM,
        accumCapacity: ACCUM,
        accumLimitAmount: ACCUM_LIMIT_REFRESH_AMOUNT,
        incTapValue: DEFAULT_INC_TAP_VALUE,
        isTurboTapMode: false,
        isTap: false,
        activePopup: undefined,
        roomUpgrades: {
            main: bg,
        }
    });
};

export default gameStore;
