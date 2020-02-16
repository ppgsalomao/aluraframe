import {ProxyFactory} from '../services/ProxyFactory.js'

export class Bind {
    constructor(model, view, ...properties) {
        let proxy = ProxyFactory.create(model, properties, (data) => view.update(data));
        view.update(model);
        return proxy;
    }
}