"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, TradeList;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
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

            _export("TradeList", TradeList = function () {
                function TradeList() {
                    _classCallCheck(this, TradeList);

                    this._trades = [];
                }

                _createClass(TradeList, [{
                    key: "addTrade",
                    value: function addTrade(trade) {
                        this._trades.push(trade);
                    }
                }, {
                    key: "sort",
                    value: function sort(compare) {
                        this._trades.sort(compare);
                    }
                }, {
                    key: "reverse",
                    value: function reverse() {
                        this._trades.reverse();
                    }
                }, {
                    key: "clear",
                    value: function clear() {
                        this._trades = [];
                    }
                }, {
                    key: "trades",
                    get: function get() {
                        return [].concat(this._trades);
                    }
                }, {
                    key: "totalVolume",
                    get: function get() {
                        return this._trades.reduce(function (accumulator, trade) {
                            return accumulator + trade.volume;
                        }, 0);
                    }
                }]);

                return TradeList;
            }());

            _export("TradeList", TradeList);
        }
    };
});
//# sourceMappingURL=TradeList.js.map