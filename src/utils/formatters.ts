type NFormatter = {num: number; precision?: number};
export const nFormatter = ({ num, precision = 1 }: NFormatter) => {
    const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" }
    ];
    const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
    const item = lookup.slice().reverse().find(item => num >= item.value);
    return item ? (num / item.value).toFixed(precision).replace(regexp, "").concat(item.symbol) : num.toFixed(precision);
}