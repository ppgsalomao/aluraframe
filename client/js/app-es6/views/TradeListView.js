import {View} from './View.js';
import {DateHelper} from "../helpers/DateHelper.js";
import {currentInstance} from "../controllers/TradeController.js";

export class TradeListView extends View {

    constructor(container) {
        super(container);
        container.addEventListener('click', function(event) {
            if(event.target.nodeName === 'TH') {
                currentInstance().order(event.target.textContent.toLowerCase());
            }
        })
    }

    _template(data) {
        return `
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>DATE</th>
                        <th>QUANTITY</th>
                        <th>VALUE</th>
                        <th>VOLUME</th>
                    </tr>
                </thead>
    
                <tbody>
                    ${data.trades.map((trade) => `
                        <tr>
                            <td>${DateHelper.toString(trade.date)}</td>
                            <td>${trade.quantity}</td>
                            <td>${trade.value}</td>
                            <td>${trade.volume}</td>
                        </tr>
                    `).join('')}
                </tbody>
    
                <tfoot>
                    <tr>
                        <td colspan="3">Total</td>                    
                        <td>${data.totalVolume}</td>
                    </tr>
                </tfoot>
            </table>`;
    }
}