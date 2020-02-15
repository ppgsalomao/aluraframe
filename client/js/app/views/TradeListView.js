class TradeListView extends View {

    _template(data) {
        return `
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th onclick="tradeController.order('date')">DATA</th>
                        <th onclick="tradeController.order('quantity')">QUANTIDADE</th>
                        <th onclick="tradeController.order('value')">VALOR</th>
                        <th onclick="tradeController.order('volume')">VOLUME</th>
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