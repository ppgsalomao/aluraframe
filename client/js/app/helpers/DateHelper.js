'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, DateHelper;

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

            _export('DateHelper', DateHelper = function () {
                function DateHelper() {
                    _classCallCheck(this, DateHelper);

                    throw new Error('DateHelper should not be instanciated.');
                }

                _createClass(DateHelper, null, [{
                    key: 'toString',
                    value: function toString(date) {
                        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
                    }
                }, {
                    key: 'toDate',
                    value: function toDate(string) {
                        if (!/[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(string)) throw new Error("Invalid date format. Should be YYYY-MM-DD");

                        return new Date(string.split('-'));
                    }
                }]);

                return DateHelper;
            }());

            _export('DateHelper', DateHelper);
        }
    };
});
//# sourceMappingURL=DateHelper.js.map