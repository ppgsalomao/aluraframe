"use strict";

System.register(["./View.js", "../helpers/DateHelper.js", "../controllers/TradeController.js"], function (_export, _context) {
    "use strict";

    var View, DateHelper, currentInstance, _createClass, TradeListView;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    return {
        setters: [function (_ViewJs) {
            View = _ViewJs.View;
        }, function (_helpersDateHelperJs) {
            DateHelper = _helpersDateHelperJs.DateHelper;
        }, function (_controllersTradeControllerJs) {
            currentInstance = _controllersTradeControllerJs.currentInstance;
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

            _export("TradeListView", TradeListView = function (_View) {
                _inherits(TradeListView, _View);

                function TradeListView(container) {
                    _classCallCheck(this, TradeListView);

                    var _this = _possibleConstructorReturn(this, (TradeListView.__proto__ || Object.getPrototypeOf(TradeListView)).call(this, container));

                    container.addEventListener('click', function (event) {
                        if (event.target.nodeName === 'TH') {
                            currentInstance().order(event.target.textContent.toLowerCase());
                        }
                    });
                    return _this;
                }

                _createClass(TradeListView, [{
                    key: "_template",
                    value: function _template(data) {
                        return "\n            <table class=\"table table-hover table-bordered\">\n                <thead>\n                    <tr>\n                        <th>DATE</th>\n                        <th>QUANTITY</th>\n                        <th>VALUE</th>\n                        <th>VOLUME</th>\n                    </tr>\n                </thead>\n    \n                <tbody>\n                    " + data.trades.map(function (trade) {
                            return "\n                        <tr>\n                            <td>" + DateHelper.toString(trade.date) + "</td>\n                            <td>" + trade.quantity + "</td>\n                            <td>" + trade.value + "</td>\n                            <td>" + trade.volume + "</td>\n                        </tr>\n                    ";
                        }).join('') + "\n                </tbody>\n    \n                <tfoot>\n                    <tr>\n                        <td colspan=\"3\">Total</td>                    \n                        <td>" + data.totalVolume + "</td>\n                    </tr>\n                </tfoot>\n            </table>";
                    }
                }]);

                return TradeListView;
            }(View));

            _export("TradeListView", TradeListView);
        }
    };
});
//# sourceMappingURL=TradeListView.js.map