var ConnectionFactory = (function() {
    const database_stores = ['trades'];
    const database_version = 2;
    const database_name = 'aluraframe';
    var connection;
    var close;

    return class ConnectionFactory {
        constructor() {
            throw new Error('It is not possible to create instances of ConnectionFactory.');
        }

        static getConnection() {
            return new Promise((resolve, reject) => {
                if(connection) {
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
                    connection.close = () => {
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

        static closeConnection() {
            if(connection) {
                close();
                connection = null;
            }
        }

        static _recreateStores(connection) {
            database_stores.forEach(store => {
                if (connection.objectStoreNames.contains(store)) {
                    connection.deleteObjectStore(store);
                }
                connection.createObjectStore(store, {autoIncrement: true});
            });
        }
    }
})();