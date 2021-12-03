import { producerBuilder } from '../support/builders/producer-builder';
import { provinceBuilder } from '../support/builders/province-builder';
import { Province, ProvinceData } from '../../src/province';

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

    it('change production', function() {
        asia.producers[0]!.production = 20;

        expect(asia.shortfall).toBe(-6);
        expect(asia.profit).toBe(292);
    });

    describe('no producers', function() {
        let provinceWithNoProducers: Province;
        beforeEach(() => {
            const data: ProvinceData = {
                name: "no-producers-name",
                demand: 30,
                price: 20,
                producers: []
            };
            provinceWithNoProducers = new Province(data);
        });

        it('shortfall', function() {
            expect(provinceWithNoProducers.shortfall).toBe(30);
        });

        it('profit', function() {
            expect(provinceWithNoProducers.profit).toBe(0);
        });
    });

});
