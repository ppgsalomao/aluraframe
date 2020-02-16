'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, database_stores, database_version, database_name, connection, close, ConnectionFactory;

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

            database_stores = ['trades'];
            database_version = 2;
            database_name = 'aluraframe';

            _export('ConnectionFactory', ConnectionFactory = function () {
                function ConnectionFactory() {
                    _classCallCheck(this, ConnectionFactory);

                    throw new Error('It is not possible to create instances of ConnectionFactory.');
                }

                _createClass(ConnectionFactory, null, [{
                    key: 'getConnection',
                    value: function getConnection() {
                        return new Promise(function (resolve, reject) {
                            if (connection) {
                                resolve(connection);
                                return;
                            }

                            var openRequest = window.indexedDB.open(database_name, database_version);

                            openRequest.onupgradeneeded = function (e) {
                                ConnectionFactory._recreateStores(e.target.result);
                            };

                            openRequest.onsuccess = function (e) {
                                connection = e.target.result;
                                close = connection.close.bind(connection);
                                connection.close = function () {
                                    throw new Error('You cannot close a connection directly.');
                                };
                                resolve(e.target.result);
                            };

                            openRequest.onerror = function (e) {
                                console.log(e.target.error);
                                reject(e.target.error.name);
                            };
                        });
                    }
                }, {
                    key: 'closeConnection',
                    value: function closeConnection() {
                        if (connection) {
                            close();
                            connection = null;
                        }
                    }
                }, {
                    key: '_recreateStores',
                    value: function _recreateStores(connection) {
                        database_stores.forEach(function (store) {
                            if (connection.objectStoreNames.contains(store)) {
                                connection.deleteObjectStore(store);
                            }
                            connection.createObjectStore(store, { autoIncrement: true });
                        });
                    }
                }]);

                return ConnectionFactory;
            }());

            _export('ConnectionFactory', ConnectionFactory);
        }
    };
});
//# sourceMappingURL=ConnectionFactory.js.map