export type InvestmentItem = {
    name: string;
    base_price: number;
    base_income: number;
    pic: string;
};

export type Investments = InvestmentItem[];

export enum UpgradesEnum {
    'TAP' = 'TAP',
    'ACCUM' = 'ACCUM',
}
