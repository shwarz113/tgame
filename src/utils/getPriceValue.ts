import { PRICE_MULTIPLIER } from '../main-container/constants';

type GetPriceValue = {
    base_price: number;
    level: number;
};
export const getPriceValue = ({ base_price, level }: GetPriceValue) =>
    Math.ceil(base_price * PRICE_MULTIPLIER ** level);
