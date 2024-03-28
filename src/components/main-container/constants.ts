import { Investments } from './types';
import miner from '../investments/img/miner.png';
import farm from '../investments/img/farm.png';
import airdrop from '../investments/img/airdrop.png';
import p2p from '../investments/img/p2p.png';
import exchange from '../investments/img/exchange.png';
import tap from './tap.png';
import scyscrapper from './scyscrapper.png';
import thunder from '../../thunder.png';

export const PRICE_MULTIPLIER = 1.2;
export const instrumentsMock: Investments = [
    { name: 'Miner', base_price: 15, pic: miner, base_income: 0.1 },
    { name: 'Mining Farm', base_price: 100, pic: farm, base_income: 1 },
    { name: 'Airdrops business', base_price: 10000, pic: airdrop, base_income: 25 },
    { name: 'P2P/Exchange business', base_price: 1000000, pic: p2p, base_income: 300 },
    { name: 'Coinface Inc.', base_price: 1000000000, pic: exchange, base_income: 4000 },
];
export const upgradesMock: Investments = [
    { name: 'Get more points per tap', base_price: 100, pic: tap, base_income: 1 },
    { name: 'Up energy storage', base_price: 100, pic: thunder, base_income: 15 },
];
export const upgradesRoomMock: Investments = [
    { name: 'Downtown apartment', description: `It's cool apartment with excellent views, which gives you inspiration and motivation`, base_price: 100, pic: scyscrapper, base_income: 2 },
];
