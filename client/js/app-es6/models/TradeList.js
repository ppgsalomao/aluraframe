export class TradeList {

    constructor() {
        this._trades = [];
    }

    addTrade(trade) {
        this._trades.push(trade);
    }

    get trades() {
        return [].concat(this._trades);
    }

    get totalVolume() {
        return this._trades.reduce((accumulator, trade) => accumulator + trade.volume, 0);
    }

    sort(compare) {
        this._trades.sort(compare);
    }

    reverse() {
        this._trades.reverse();
    }

    clear() {
        this._trades = [];
    }
}