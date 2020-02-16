"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, Trade;

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

            _export("Trade", Trade = function () {
                function Trade(date, quantity, value) {
                    _classCallCheck(this, Trade);

                    this._date = new Date(date.getTime());
                    this._quantity = quantity;
                    this._value = value;

                    Object.freeze(this);
                }

                _createClass(Trade, [{
                    key: "equals",
                    value: function equals(otherTrade) {
                        return JSON.stringify(this) === JSON.stringify(otherTrade);
                    }
                }, {
                    key: "date",
                    get: function get() {
                        return new Date(this._date.getTime());
                    }
                }, {
                    key: "quantity",
                    get: function get() {
                        return this._quantity;
                    }
                }, {
                    key: "value",
                    get: function get() {
                        return this._value;
                    }
                }, {
                    key: "volume",
                    get: function get() {
                        return this._quantity * this._value;
                    }
                }]);

                return Trade;
            }());

            _export("Trade", Trade);
        }
    };
});
//# sourceMappingURL=Trade.js.map