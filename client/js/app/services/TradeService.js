"use strict";

System.register(["./HttpService.js", "./ConnectionFactory.js", "../dao/TradeDAO.js", "../models/Trade.js"], function (_export, _context) {
    "use strict";

    var HttpService, ConnectionFactory, TradeDAO, Trade, _createClass, TradeService;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_HttpServiceJs) {
            HttpService = _HttpServiceJs.HttpService;
        }, function (_ConnectionFactoryJs) {
            ConnectionFactory = _ConnectionFactoryJs.ConnectionFactory;
        }, function (_daoTradeDAOJs) {
            TradeDAO = _daoTradeDAOJs.TradeDAO;
        }, function (_modelsTradeJs) {
            Trade = _modelsTradeJs.Trade;
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

            _export("TradeService", TradeService = function () {
                function TradeService() {
                    _classCallCheck(this, TradeService);

                    this._http = new HttpService();
                }

                _createClass(TradeService, [{
                    key: "getTrades",
                    value: function getTrades() {
                        return Promise.all([this.getWeekTrades(), this.getPreviousWeekTrades(), this.getWeekBeforePreviousWeekTrades()]).then(function (trades) {
                            return trades.reduce(function (result, trades) {
                                return result.concat(trades);
                            }, []);
                        }).catch(function (error) {
                            throw new Error(error);
                        });
                    }
                }, {
                    key: "getWeekTrades",
                    value: function getWeekTrades() {
                        return this._http.get('negociacoes/semana').then(function (result) {
                            return result.map(function (item) {
                                return new Trade(new Date(item.data), item.quantidade, item.valor);
                            });
                        }).catch(function (reason) {
                            console.log(reason);
                            throw new Error('Error while trying to get week before previous week trades.');
                        });
                    }
                }, {
                    key: "getPreviousWeekTrades",
                    value: function getPreviousWeekTrades() {
                        return this._http.get('negociacoes/anterior').then(function (result) {
                            return result.map(function (item) {
                                return new Trade(new Date(item.data), item.quantidade, item.valor);
                            });
                        }).catch(function (reason) {
                            console.log(reason);
                            throw new Error('Error while trying to get week before previous week trades.');
                        });
                    }
                }, {
                    key: "getWeekBeforePreviousWeekTrades",
                    value: function getWeekBeforePreviousWeekTrades() {
                        return this._http.get('negociacoes/retrasada').then(function (result) {
                            return result.map(function (item) {
                                return new Trade(new Date(item.data), item.quantidade, item.valor);
                            });
                        }).catch(function (reason) {
                            console.log(reason);
                            throw new Error('Error while trying to get week before previous week trades.');
                        });
                    }
                }, {
                    key: "import",
                    value: function _import(existentTrades) {
                        return this.getTrades().then(function (trades) {
                            return trades.filter(function (trade) {
                                return !existentTrades.some(function (innerTrade) {
                                    return trade.equals(innerTrade);
                                });
                            });
                        }).catch(function (reason) {
                            console.log(reason);
                            throw new Error('Unexpected error while trying to import all Trades.');
                        });
                    }
                }, {
                    key: "save",
                    value: function save(trade) {
                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new TradeDAO(connection);
                        }).then(function (dao) {
                            return dao.save(trade);
                        }).then(function () {
                            return 'Trade saved successfully.';
                        }).catch(function (reason) {
                            throw new Error('Unexpected error while trying to save the Trade.');
                        });
                    }
                }, {
                    key: "list",
                    value: function list() {
                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new TradeDAO(connection);
                        }).then(function (dao) {
                            return dao.list();
                        }).catch(function (reason) {
                            console.log(reason);
                            throw new Error('Unexpected error while trying to list the Trade.');
                        });
                    }
                }, {
                    key: "clear",
                    value: function clear() {
                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new TradeDAO(connection);
                        }).then(function (dao) {
                            return dao.deleteAll();
                        }).then(function () {
                            return 'Trades deleted successfully.';
                        }).catch(function (reason) {
                            console.log(reason);
                            throw new Error('Unexpected error while trying to delete all Trades.');
                        });
                    }
                }]);

                return TradeService;
            }());

            _export("TradeService", TradeService);
        }
    };
});
//# sourceMappingURL=TradeService.js.map