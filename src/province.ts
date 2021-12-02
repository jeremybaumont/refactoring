import { Producer } from './producer';

export interface ProvinceData {
    name: string;
    demand: number;
    price: number;
    producers: Producer[]
};


export class Province {
    private _name: string;
    private _producers: Producer[];
    private _totalProduction: number;
    private _demand: number;
    private _price: number;

    constructor(aProvinceData: ProvinceData) {
        this._name = aProvinceData.name;
        this._producers = [];
        this._totalProduction = 0;
        this._demand = aProvinceData.demand;
        this._price = aProvinceData.price;
        aProvinceData.producers.forEach(producer => this.addProducer(
            new Producer({
                province: this,
                data: {
                    cost: producer.cost,
                    production: producer.production,
                    name: producer.name,
                }
            })
        ));
    }

    private addProducer(producer: Producer): void {
        this._producers.push(producer);
        this._totalProduction += producer.production;
    }

    public get name(): string { return this._name; }
    public get producers(): Producer[] { return this._producers; }
    public get totalProduction(): number { return this._totalProduction; }
    public set totalProduction(aTotalProduction: number) { this._totalProduction = aTotalProduction; }
    public get demand(): number { return this._demand; }
    public set demand(aDemand: number) { this._demand = aDemand; }
    public get price(): number { return this._price; }
    public set price(aPrice) { this._price = aPrice; }

    public get shortfall(): number {
        return this._demand - this._totalProduction;
    }

    public get profit(): number {
        return this.demandValue - this.demandCost;
    }

    private get demandCost(): number {
        let remainingDemand = this._demand;
        let result = 0;
        this._producers
            .sort((a, b) => a.cost - b.cost)
            .forEach(p => {
                const contribution = Math.min(remainingDemand, p.production);
                remainingDemand -= contribution;
                result += contribution * p.cost;
            });
        return result;
    }

    private get demandValue(): number {
        return this.satisfiedDemand * this._price;
    }

    private get satisfiedDemand() {
        return Math.min(this._demand, this._totalProduction);
    }
}


