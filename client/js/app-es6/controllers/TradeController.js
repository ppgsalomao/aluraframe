import {Trade} from "../models/Trade.js";
import {TradeList} from "../models/TradeList.js";
import {TradeListView} from "../views/TradeListView.js";
import {MessageView} from "../views/MessageView.js";
import {Message} from "../models/Message.js";
import {TradeService} from "../services/TradeService.js";
import {DateHelper} from "../helpers/DateHelper.js";
import {Bind} from "../helpers/Bind.js";

class TradeController {

    constructor() {
        let $ = document.querySelector.bind(document);

        this._dateInput = $("#date");
        this._quantityInput = $("#quantity");
        this._valueInput = $("#value");
        this._currentOrder = '';
        this._service = new TradeService();

        this._tradesList = new Bind(
            new TradeList(),
            new TradeListView($('#tradeListContainer')),
            'addTrade', 'sort', 'reverse', 'clear');

        this._message = new Bind(
            new Message(),
            new MessageView($('#messageContainer')),
            'text');

        this._init();
    }

    add(event) {
        event.preventDefault();

        let trade = this._buildTrade();
        this._service
            .save(trade)
            .then(() => {
                this._tradesList.addTrade(trade);
                this._message.text = 'Trade successfully added.';
                this._resetForm();
            })
            .catch(reason => this._message.text = reason);
    }

    importTrades() {
        this._service
            .import(this._tradesList.trades)
            .then(trades => {
                trades.forEach((trade) => this._tradesList.addTrade(trade));
                this._message.text = 'Trades imported successfully.';
            })
            .catch(error => this._message.text = error);
    }

    order(column) {
        if(this._currentOrder === column) {
            return this._tradesList.reverse();
        } else {
            this._tradesList.sort((a, b) => a[column] - b[column]);
        }
        this._currentOrder = column;
    }

    clear() {
        this._service
            .clear()
            .then(message => {
                this._message.text = message;
                this._tradesList.clear();
            })
            .catch(error => this._message.text = error);
    }

    _init() {
        this._service
            .list()
            .then(trades => trades.forEach(trade => this._tradesList.addTrade(trade)))
            .catch(error => this._message.text = error);

        setInterval(() => {
            this.importTrades();
        }, 3000);
    }

    _buildTrade() {
        return new Trade(
            new Date(DateHelper.toDate(this._dateInput.value)),
            parseInt(this._quantityInput.value),
            parseFloat(this._valueInput.value));
    }

    _resetForm() {
        // Clean Fields
        this._dateInput.value = '';
        this._quantityInput.value = 1;
        this._valueInput.value = 0.0;

        // Reset focus
        this._dateInput.focus();
    }
}

let tradeController = new TradeController();
export function currentInstance() {
    return tradeController;
}
