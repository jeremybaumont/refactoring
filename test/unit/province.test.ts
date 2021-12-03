import { producerBuilder } from '../support/builders/producer-builder';
import { provinceBuilder } from '../support/builders/province-builder';
import { Province } from '../../src/province';

describe('province', function() {

    let asia: Province;
    beforeEach(() => {
        asia = provinceBuilder.withName('Asia').withDemand(30).withPrice(20).withProducers(
            producerBuilder.withName('Byzantium').withCost(10).withProduction(9),
            producerBuilder.withName('Attalia').withCost(12).withProduction(10),
            producerBuilder.withName('Synope').withCost(10).withProduction(6),
        ).build();
    });

    it('shortfall', function() {
        expect(asia.shortfall).toBe(5);
    });

    it('profit', function() {
        expect(asia.profit).toBe(230);
    });
});
