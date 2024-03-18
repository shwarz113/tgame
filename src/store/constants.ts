import {instrumentsMock, upgradesMock, upgradesRoomMock} from '../components/main-container/constants';

export const ACCUM = 1000;
export const ACCUM_MULTIPLIER = 1.15;
export const ACCUM_LIMIT_REFRESH_AMOUNT = 3;
export const DEFAULT_INC_TAP_VALUE = 1;

export const TURBO_MULTIPLIER_TAP = 5;

export const TURBO_TIME = 10000;

export const instrumentsLevelsMock: Record<string, number> = [...instrumentsMock, ...upgradesMock, ...upgradesRoomMock].reduce(
    (map, { name }) => ({ ...map, [name]: 0 }),
    {}
);
