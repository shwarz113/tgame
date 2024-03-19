export const SOCKET_URL = 'wss://tgame-crypto-coin-kagertanin.amvera.io/connect';
export const DOMAIN = process.env.NODE_ENV === 'production' ? '/tgame/' : '/';

export enum PagesEnum {
    PEOPLE = 'people',
    LOOT = 'loot',
    INVEST = 'invest',
    UPGRADES = 'upgrades',
}