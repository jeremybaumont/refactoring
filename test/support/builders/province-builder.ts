import cloneDeep from 'lodash.clonedeep';
import { Province, ProvinceData } from '../../../src/province';
import { Producer } from '../../../src/producer';
import { BuilderOrRaw, buildValue } from './builder-utils';

export class ProvinceBuilder {

    constructor(private readonly state: ProvinceData) { }

    public withName(name: string): ProvinceBuilder {
        return new ProvinceBuilder({ ...this.state, name });
    }

    public withDemand(demand: number): ProvinceBuilder {
        return new ProvinceBuilder({ ...this.state, demand });
    }

    public withPrice(price: number): ProvinceBuilder {
        return new ProvinceBuilder({ ...this.state, price });
    }

    public withProducers(...producers: BuilderOrRaw<Producer>[]): ProvinceBuilder {
        return new ProvinceBuilder({ ...this.state, producers: producers.map((p) => buildValue(p)) });
    }

    public build(): Province {
        return new Province(cloneDeep(this.state));
    }
}

export const provinceBuilder = new ProvinceBuilder(
    {
        name: "default-name",
        demand: 0,
        price: 0,
        producers: []
    }
);
