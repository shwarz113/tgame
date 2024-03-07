export type Levels = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
type Miner = {
    id: string;
    name: string;
    initialPerformance: number;
    priceByLevel: { [x in Levels]: number };
};
export type Miners = Miner[];
export const MINERS: Miners = [
    {
        id: 'M1',
        name: 'M1',
        initialPerformance: 1,
        priceByLevel: {
            2: 200,
            3: 400,
            4: 600,
            5: 1000,
            6: 1500,
            7: 2000,
            8: 3000,
            9: 4000,
            10: 5000,
        },
    },
    {
        id: 'M2',
        name: 'M2',
        initialPerformance: 3,
        priceByLevel: {
            2: 20000,
            3: 40000,
            4: 60000,
            5: 100000,
            6: 150000,
            7: 200000,
            8: 300000,
            9: 400000,
            10: 500000,
        },
    },
    {
        id: 'M3',
        name: 'M3',
        initialPerformance: 6,
        priceByLevel: {
            2: 2000000,
            3: 4000000,
            4: 6000000,
            5: 10000000,
            6: 15000000,
            7: 20000000,
            8: 30000000,
            9: 40000000,
            10: 50000000,
        },
    },
    {
        id: 'M4',
        name: 'M4',
        initialPerformance: 12,
        priceByLevel: {
            2: 200000000,
            3: 400000000,
            4: 600000000,
            5: 1000000000,
            6: 1500000000,
            7: 2000000000,
            8: 3000000000,
            9: 4000000000,
            10: 5000000000,
        },
    },
    {
        id: 'M5',
        name: 'M5',
        initialPerformance: 24,
        priceByLevel: {
            2: 20000000000,
            3: 40000000000,
            4: 60000000000,
            5: 100000000000,
            6: 150000000000,
            7: 200000000000,
            8: 300000000000,
            9: 400000000000,
            10: 500000000000,
        },
    },
];

export {};
