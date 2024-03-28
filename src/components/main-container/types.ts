export type InvestmentItem = {
    name: string;
    description?: string;
    base_price: number;
    base_income: number;
    pic: string;
};

export type Investments = InvestmentItem[];
