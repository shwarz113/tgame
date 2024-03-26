type NFormatter = { num: number; precision?: number };

export const toFixed = (n: number, fixed: number) => {
    const r = `${n}`.match(new RegExp(`^-?\\d+(?:\.\\d{0,${fixed}})?`))?.[0] || 0;
    // console.log('r', r)
    return r
};
export const nFormatter = ({ num, precision = 1 }: NFormatter) => {
    const lookup = [
        { value: 1, symbol: '' },
        { value: 1e3, symbol: 'k' },
        { value: 1e6, symbol: 'M' },
        { value: 1e9, symbol: 'G' },
        { value: 1e12, symbol: 'T' },
        { value: 1e15, symbol: 'P' },
        { value: 1e18, symbol: 'E' },
    ];
    const item = lookup
        .slice()
        .reverse()
        .find((item) => num >= item.value);
    if (precision === 0) {
        return num.toFixed(0);
    }
    return item ? `${toFixed(num / item.value, precision)}`.concat(item.symbol) : toFixed(num, precision);
};
