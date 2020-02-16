import {currentInstance} from "./controllers/TradeController.js";

let tradeController = currentInstance();
document.querySelector('.form').onsubmit = tradeController.add.bind(tradeController);
document.querySelector('#clearButton').onsubmit = tradeController.clear.bind(tradeController);
