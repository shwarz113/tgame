import {Investment} from "../hooks/type";

export type BalanceResponse = {
    balance: number;
    batteryValue: number;
};

export type InvestResponse = {
    balance: number;
    income: number;
    investment: Investment;
};
