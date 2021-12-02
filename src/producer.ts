import { Province } from './province';

export interface ProducerData {
    province: Province;
    data: {
        cost: number;
        name: string;
        production: number;
    }
}

export class Producer {
    private _province: Province;
    private _cost: number;
    private _name: string;
    private _production: number;

    constructor(aProducerData: ProducerData) {
        this._province = aProducerData.province;
        this._cost = aProducerData.data.cost;
        this._name = aProducerData.data.name;
        this._production = aProducerData.data.production || 0;
    }

    public get name(): string { return this._name; }
    public get cost(): number { return this._cost; }
    public set cost(aCost: number) { this._cost = aCost; }
    public get production(): number { return this._production; }
    public set production(amount: number) {
        const newProduction = Number.isNaN(amount) ? 0 : amount;
        this._province.totalProduction += newProduction - this._production;
        this._production = newProduction;
    }

}
