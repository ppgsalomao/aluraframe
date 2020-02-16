'use strict';

System.register(['../models/Trade.js'], function (_export, _context) {
    "use strict";

    var Trade, _createClass, TradeDAO;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_modelsTradeJs) {
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

            _export('TradeDAO', TradeDAO = function () {
                function TradeDAO(connection) {
                    _classCallCheck(this, TradeDAO);

                    this._connection = connection;
                    this._store = 'trades';
                }

                _createClass(TradeDAO, [{
                    key: 'save',
                    value: function save(trade) {
                        var _this = this;

                        return new Promise(function (resolve, reject) {
                            var request = _this._connection.transaction([_this._store], 'readwrite').objectStore(_this._store).add(trade);

                            request.onsuccess = function (e) {
                                return resolve();
                            };
                            request.onerror = function (e) {
                                console.log(e.target.error);
                                reject('Unexpected error while trying to save a new Trade.');
                            };
                        });
                    }
                }, {
                    key: 'list',
                    value: function list() {
                        var _this2 = this;

                        return new Promise(function (resolve, reject) {
                            var cursor = _this2._connection.transaction(['trades'], 'readwrite').objectStore('trades').openCursor();

                            var trades = [];
                            cursor.onsuccess = function (e) {
                                var current = e.target.result;
                                if (current) {
                                    trades.push(new Trade(current.value._date, current.value._quantity, current.value._value));
                                    current.continue();
                                } else {
                                    resolve(trades);
                                }
                            };

                            cursor.onerror = function (e) {
                                console.log('Error:' + e.target.error.name);
                                reject('Unexpected error while trying to list all Trades.');
                            };
                        });
                    }
                }, {
                    key: 'deleteAll',
                    value: function deleteAll() {
                        var _this3 = this;

                        return new Promise(function (resolve, reject) {
                            var request = _this3._connection.transaction(['trades'], 'readwrite').objectStore('trades').clear();

                            request.onsuccess = function (e) {
                                return resolve('All Trades were deleted successfully.');
                            };
                            request.onerror = function (e) {
                                console.log('Error:' + e.target.error.name);
                                reject('Unexpected error while trying to delete all Trades.');
                            };
                        });
                    }
                }]);

                return TradeDAO;
            }());

            _export('TradeDAO', TradeDAO);
        }
    };
});
//# sourceMappingURL=TradeDAO.js.map