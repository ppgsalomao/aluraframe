import {HttpService} from './HttpService.js';
import {ConnectionFactory} from "./ConnectionFactory.js";
import {TradeDAO} from "../dao/TradeDAO.js";
import {Trade} from "../models/Trade.js";

export class TradeService {

    constructor() {
        this._http = new HttpService();
    }

    getTrades() {
        return Promise.all([
            this.getWeekTrades(),
            this.getPreviousWeekTrades(),
            this.getWeekBeforePreviousWeekTrades()
        ]).then(trades => {
            return trades
                .reduce((result, trades) => result.concat(trades), []);
        }).catch(error => {
            throw new Error(error);
        });
    }

    getWeekTrades() {
        return this._http.get('negociacoes/semana')
                .then(result => {
                    return result.map((item) => new Trade(new Date(item.data), item.quantidade, item.valor));
                })
                .catch(reason => {
                    console.log(reason);
                    throw new Error('Error while trying to get week before previous week trades.');
                });
    }

    getPreviousWeekTrades() {
        return this._http.get('negociacoes/anterior')
                .then(result => {
                    return result.map((item) => new Trade(new Date(item.data), item.quantidade, item.valor));
                })
                .catch(reason => {
                    console.log(reason);
                    throw new Error('Error while trying to get week before previous week trades.');
                });
    }

    getWeekBeforePreviousWeekTrades() {
        return this._http.get('negociacoes/retrasada')
                .then(result => {
                    return result.map((item) => new Trade(new Date(item.data), item.quantidade, item.valor));
                })
                .catch(reason => {
                    console.log(reason);
                    throw new Error('Error while trying to get week before previous week trades.');
                });
    }

    import(existentTrades) {
        return this.getTrades()
            .then(trades => trades.filter(trade =>
                !existentTrades.some(innerTrade => trade.equals(innerTrade))))
            .catch(reason => {
                console.log(reason);
                throw new Error('Unexpected error while trying to import all Trades.');
            });
    }

    save(trade) {
        return ConnectionFactory
            .getConnection()
            .then(connection => new TradeDAO(connection))
            .then(dao => dao.save(trade))
            .then(() => 'Trade saved successfully.')
            .catch(reason => {
                throw new Error('Unexpected error while trying to save the Trade.');
            });
    }

    list() {
        return ConnectionFactory
            .getConnection()
            .then(connection => new TradeDAO(connection))
            .then(dao => dao.list())
            .catch(reason => {
                console.log(reason);
                throw new Error('Unexpected error while trying to list the Trade.');
            });
    }

    clear() {
        return ConnectionFactory
            .getConnection()
            .then(connection => new TradeDAO(connection))
            .then(dao => dao.deleteAll())
            .then(() => 'Trades deleted successfully.')
            .catch(reason => {
                console.log(reason);
                throw new Error('Unexpected error while trying to delete all Trades.');
            });
    }
}