import { makeAutoObservable } from 'mobx';
import { Investments } from '../main-container/types';
import { ACCUM, ACCUM_LIMIT_REFRESH_AMOUNT, DEFAULT_INC_TAP_VALUE, instrumentsLevelsMock } from './constants';
import { instrumentsMock } from '../main-container/constants';

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
    });
};

export default gameStore;
