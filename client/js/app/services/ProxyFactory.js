"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _typeof, _createClass, ProxyFactory;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };

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

            _export("ProxyFactory", ProxyFactory = function () {
                function ProxyFactory() {
                    _classCallCheck(this, ProxyFactory);
                }

                _createClass(ProxyFactory, null, [{
                    key: "create",
                    value: function create(object, properties, action) {
                        return new Proxy(object, {
                            get: function get(target, property, receiver) {
                                if (properties.includes(property) && ProxyFactory.isFunction(target[property])) {
                                    return function () {
                                        var result = Reflect.apply(target[property], target, arguments);
                                        action(target);
                                        return result;
                                    };
                                }
                                return Reflect.get(target, property, receiver);
                            },
                            set: function set(target, property, value, receiver) {
                                var result = Reflect.set(target, property, value, receiver);
                                if (properties.includes(property)) {
                                    action(target);
                                }
                                return result;
                            }
                        });
                    }
                }, {
                    key: "isFunction",
                    value: function isFunction(property) {
                        return (typeof property === "undefined" ? "undefined" : _typeof(property)) === (typeof Function === "undefined" ? "undefined" : _typeof(Function));
                    }
                }]);

                return ProxyFactory;
            }());

            _export("ProxyFactory", ProxyFactory);
        }
    };
});
//# sourceMappingURL=ProxyFactory.js.map