import {Investments} from "./types";
import miner from './miner.png';
import farm from './farm.png';
import airdrop from './airdrop.png';
import p2p from './p2p.png';
import exchange from './exchange.png';

export const PRICE_MULTIPLIER = 1.2;
export const instrumentsMock: Investments = [
    { name: 'Miner', base_price: 15, pic: miner, base_income: 0.1 },
    { name: 'Mining Farm', base_price: 100, pic: farm, base_income: 1 },
    { name: 'Airdrops business', base_price: 10000, pic: airdrop, base_income: 25 },
    { name: 'P2P/Exchange business', base_price: 1000000, pic: p2p, base_income: 300 },
    { name: 'Coinface Inc.', base_price: 1000000000, pic: exchange, base_income: 4000 },
]
