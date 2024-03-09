import { makeAutoObservable } from "mobx";
import {Investments} from "../main-container/types";
import {ACCUM, ACCUM_LIMIT_REFRESH_AMOUNT, DEFAULT_INC_TAP_VALUE, instrumentsLevelsMock} from "./constants";
import {instrumentsMock} from "../main-container/constants";

type Store = {
    points: number;
    pointsPerSecond: number;
    levelsByName: Record<string, number>;
    investments: Investments;
    accum: number;
    accumLimitAmount: number;
    incTapValue: number;
    isTurboTapMode: boolean;
}
const gameStore = () => {
    return makeAutoObservable<Store>({
        points: 100,
        pointsPerSecond: 12,
        investments: instrumentsMock,
        levelsByName: instrumentsLevelsMock,
        accum: ACCUM,
        accumLimitAmount: ACCUM_LIMIT_REFRESH_AMOUNT,
        incTapValue: DEFAULT_INC_TAP_VALUE,
        isTurboTapMode: false,
    });
};

export default gameStore;