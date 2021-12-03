import { producerBuilder } from '../support/builders/producer-builder';
import { provinceBuilder } from '../support/builders/province-builder';
import { Province } from '../../src/province';

describe('province', function() {

    let asiaProvince: Province;
    beforeEach(() => {
        asiaProvince = provinceBuilder.withName('Asia').withDemand(30).withPrice(20).withProducers(
            producerBuilder.withName('Byzantium').withCost(10).withProduction(9),
            producerBuilder.withName('Attalia').withCost(12).withProduction(10),
            producerBuilder.withName('Synope').withCost(10).withProduction(6),
        ).build();
    });

    it('shortfall', function() {
        expect(asiaProvince.shortfall).toBe(5);
    });

    it('profit', function() {
        expect(asiaProvince.profit).toBe(230);
    });

});
