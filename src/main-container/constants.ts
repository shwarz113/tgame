import {Investments} from "./types";
import miner from './miner.png';

export const PRICE_MULTIPLIER = 1.2;
export const instrumentsMock: Investments = [
    { name: 'Miner', base_price: 1, pic: miner, base_income: 1 },
    { name: 'Mining Farm', base_price: 100, pic: miner, base_income: 50 },
    { name: 'Airdrops business', base_price: 10000, pic: miner, base_income: 2500 },
    { name: 'P2P/Exchange business', base_price: 1000000, pic: miner, base_income: 125000 },
    { name: 'Coinface Inc.', base_price: 1000000000, pic: miner, base_income: 11250000 },
]

export const instrumentsLevelsMock: number[] = [4, 3, 2, 1, 0];