import { statement } from '../../src/statement';
import * as fs from 'fs';

test('example statement', () => {
    const invoice = JSON.parse(fs.readFileSync('test/unit/data/invoice.json', 'utf8'));
    const plays = JSON.parse(fs.readFileSync('test/unit/data/plays.json', 'utf8'));

    const statement_string = statement(invoice, plays);

    expect(statement_string).toMatchSnapshot();
});
