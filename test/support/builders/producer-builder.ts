import cloneDeep from 'lodash.clonedeep';
import { Producer, ProducerData } from '../../../src/producer';
import { Province } from '../../../src/province';
import { provinceBuilder } from './province-builder';

export class ProducerBuilder {

    constructor(private readonly state: ProducerData) { }

    public withProvince(province: Province): ProducerBuilder {
        return new ProducerBuilder({ ...this.state, province });
    }

    public withCost(cost: number): ProducerBuilder {
        let data = cloneDeep(this.state.data);
        data = { ...data, cost };
        return new ProducerBuilder({ ...this.state, data });
    }

    public withName(name: string): ProducerBuilder {
        let data = cloneDeep(this.state.data);
        data = { ...data, name };
        return new ProducerBuilder({ ...this.state, data });
    }

    public withProduction(production: number): ProducerBuilder {
        let data = cloneDeep(this.state.data);
        data = { ...data, production };
        return new ProducerBuilder({ ...this.state, data });
    }

    public build(): Producer {
        return new Producer(cloneDeep(this.state));
    }
}

export const producerBuilder = new ProducerBuilder({
    province: provinceBuilder.build(),
    data: {
        cost: 0,
        name: 'default-name',
        production: 0,
    }

});
