export class View {
    constructor(container) {
        this._container = container;
    }

    _template(data) {
        throw new Error('Views must implement template method.');
    }

    update(data) {
        this._container.innerHTML = this._template(data);
    }
}