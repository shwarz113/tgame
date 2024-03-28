export type Investment = {
    id: string;
    price: number;
    powerUpAmount: number;
    powerUpGrowth: number;
    level: number;
};
export type CoinPerTap = {
    currentValue: number;
    currentValueRaiser: {
        id: string;
        price: number;
        powerUpAmount: number;
        powerUpGrowth: number;
        level: {
            currentLvl: number | null,
            maxLvl: number | null,
            buysToLvlUp: number | null,
        },
    },
};
export type Room = {
    id: string;
    price: number;
    bought: boolean;
    chosen: boolean;
}
export type CapacityRaiser = {
    id: string;
    price: number;
    powerUpAmount: number;
    powerUpGrowth: number;
    level: {
        currentLvl: number | null;
        maxLvl: number | null;
        buysToLvlUp: number | null;
    },
}
export type Battery = {
    currentValue: number;
    capacity: number;
    availableRecharge: number;
    capacityRaiser: CapacityRaiser;
}
export type UserInfo = {
    userId: string;
    balance: number;
    income: number;
    battery: Battery;
    investments: Investment[];
    coinPerTap: CoinPerTap;
    room: {
        id: 'downtownApartment',
        price: 100,
        bought: false,
        chosen: false,
    }
};

export const userMock: UserInfo = {
    userId: 'sham',
    balance: 1000,
    income: 0,
    battery: {
        currentValue: 1000,
        capacity: 1000,
        availableRecharge: 3,
        capacityRaiser: {
            id: 'capacityRaiser',
            price: 100,
            powerUpAmount: 0,
            powerUpGrowth: 0.15,
            level: {
                currentLvl: null,
                maxLvl: null,
                buysToLvlUp: null,
            },
        },
    },
    investments: [],
    coinPerTap: {
        currentValue: 1,
        currentValueRaiser: {
            id: 'coinTapperRaiser',
            price: 100,
            powerUpAmount: 0,
            powerUpGrowth: 1,
            level: {
                currentLvl: null,
                maxLvl: null,
                buysToLvlUp: null,
            },
        },
    },
    room: {
        id: 'downtownApartment',
        price: 100,
        bought: false,
        chosen: false,
    },
};
