'use strict';

System.register(['./controllers/TradeController.js'], function (_export, _context) {
  "use strict";

  var currentInstance, tradeController;
  return {
    setters: [function (_controllersTradeControllerJs) {
      currentInstance = _controllersTradeControllerJs.currentInstance;
    }],
    execute: function () {
      tradeController = currentInstance();

      document.querySelector('.form').onsubmit = tradeController.add.bind(tradeController);
      document.querySelector('#clearButton').onsubmit = tradeController.clear.bind(tradeController);
    }
  };
});
//# sourceMappingURL=boot.js.map