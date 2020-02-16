"use strict";

System.register(["../models/Trade.js", "../models/TradeList.js", "../views/TradeListView.js", "../views/MessageView.js", "../models/Message.js", "../services/TradeService.js", "../helpers/DateHelper.js", "../helpers/Bind.js"], function (_export, _context) {
    "use strict";

    var Trade, TradeList, TradeListView, MessageView, Message, TradeService, DateHelper, Bind, _createClass, TradeController, tradeController;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function currentInstance() {
        return tradeController;
    }

    _export("currentInstance", currentInstance);

    return {
        setters: [function (_modelsTradeJs) {
            Trade = _modelsTradeJs.Trade;
        }, function (_modelsTradeListJs) {
            TradeList = _modelsTradeListJs.TradeList;
        }, function (_viewsTradeListViewJs) {
            TradeListView = _viewsTradeListViewJs.TradeListView;
        }, function (_viewsMessageViewJs) {
            MessageView = _viewsMessageViewJs.MessageView;
        }, function (_modelsMessageJs) {
            Message = _modelsMessageJs.Message;
        }, function (_servicesTradeServiceJs) {
            TradeService = _servicesTradeServiceJs.TradeService;
        }, function (_helpersDateHelperJs) {
            DateHelper = _helpersDateHelperJs.DateHelper;
        }, function (_helpersBindJs) {
            Bind = _helpersBindJs.Bind;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            TradeController = function () {
                function TradeController() {
                    _classCallCheck(this, TradeController);

                    var $ = document.querySelector.bind(document);

                    this._dateInput = $("#date");
                    this._quantityInput = $("#quantity");
                    this._valueInput = $("#value");
                    this._currentOrder = '';
                    this._service = new TradeService();

                    this._tradesList = new Bind(new TradeList(), new TradeListView($('#tradeListContainer')), 'addTrade', 'sort', 'reverse', 'clear');

                    this._message = new Bind(new Message(), new MessageView($('#messageContainer')), 'text');

                    this._init();
                }

                _createClass(TradeController, [{
                    key: "add",
                    value: function add(event) {
                        var _this = this;

                        event.preventDefault();

                        var trade = this._buildTrade();
                        this._service.save(trade).then(function () {
                            _this._tradesList.addTrade(trade);
                            _this._message.text = 'Trade successfully added.';
                            _this._resetForm();
                        }).catch(function (reason) {
                            return _this._message.text = reason;
                        });
                    }
                }, {
                    key: "importTrades",
                    value: function importTrades() {
                        var _this2 = this;

                        this._service.import(this._tradesList.trades).then(function (trades) {
                            trades.forEach(function (trade) {
                                return _this2._tradesList.addTrade(trade);
                            });
                            _this2._message.text = 'Trades imported successfully.';
                        }).catch(function (error) {
                            return _this2._message.text = error;
                        });
                    }
                }, {
                    key: "order",
                    value: function order(column) {
                        if (this._currentOrder === column) {
                            return this._tradesList.reverse();
                        } else {
                            this._tradesList.sort(function (a, b) {
                                return a[column] - b[column];
                            });
                        }
                        this._currentOrder = column;
                    }
                }, {
                    key: "clear",
                    value: function clear() {
                        var _this3 = this;

                        this._service.clear().then(function (message) {
                            _this3._message.text = message;
                            _this3._tradesList.clear();
                        }).catch(function (error) {
                            return _this3._message.text = error;
                        });
                    }
                }, {
                    key: "_init",
                    value: function _init() {
                        var _this4 = this;

                        this._service.list().then(function (trades) {
                            return trades.forEach(function (trade) {
                                return _this4._tradesList.addTrade(trade);
                            });
                        }).catch(function (error) {
                            return _this4._message.text = error;
                        });

                        setInterval(function () {
                            _this4.importTrades();
                        }, 3000);
                    }
                }, {
                    key: "_buildTrade",
                    value: function _buildTrade() {
                        return new Trade(new Date(DateHelper.toDate(this._dateInput.value)), parseInt(this._quantityInput.value), parseFloat(this._valueInput.value));
                    }
                }, {
                    key: "_resetForm",
                    value: function _resetForm() {
                        // Clean Fields
                        this._dateInput.value = '';
                        this._quantityInput.value = 1;
                        this._valueInput.value = 0.0;

                        // Reset focus
                        this._dateInput.focus();
                    }
                }]);

                return TradeController;
            }();

            tradeController = new TradeController();
        }
    };
});
//# sourceMappingURL=TradeController.js.map