import {Trade} from "../models/Trade.js";

export class TradeDAO {
    constructor(connection) {
        this._connection = connection;
        this._store = 'trades';
    }

    save(trade) {
        return new Promise((resolve, reject) => {
            let request = this._connection
                .transaction([this._store],'readwrite')
                .objectStore(this._store)
                .add(trade);

            request.onsuccess = e => resolve();
            request.onerror = e => {
                console.log(e.target.error);
                reject('Unexpected error while trying to save a new Trade.');
            };

        });
    }

    list() {
        return new Promise((resolve, reject) => {
            let cursor = this._connection
                .transaction(['trades'],'readwrite')
                .objectStore('trades')
                .openCursor();

            let trades = [];
            cursor.onsuccess = e => {
                let current = e.target.result;
                if(current) {
                    trades.push(new Trade(current.value._date, current.value._quantity, current.value._value));
                    current.continue();
                } else {
                    resolve(trades);
                }
            };

            cursor.onerror = e => {
                console.log('Error:' + e.target.error.name);
                reject('Unexpected error while trying to list all Trades.');
            };
        });
    }

    deleteAll() {
        return new Promise((resolve, reject) => {
            let request = this._connection
                .transaction(['trades'],'readwrite')
                .objectStore('trades')
                .clear();

            request.onsuccess = e => resolve('All Trades were deleted successfully.');
            request.onerror = e => {
                console.log('Error:' + e.target.error.name);
                reject('Unexpected error while trying to delete all Trades.');
            };
        });
    }
}