type Perf = {
    playID: string;
    audience: number;
};

interface InvoiceData {
    customer: string;
    performances: Perf[];
}

type PlayData = {
    name: string;
    type: string;
}

interface PlaysData {
    [key: string]: PlayData;
}

export const statement = (invoice: InvoiceData, plays: PlaysData): string => {
    const amountFor = (aPerformance: Perf): number => {
        let result = 0;
        switch (playFor(aPerformance).type) {
            case "tragedy":
                result = 40000;
                if (aPerformance.audience > 30) {
                    result += 1000 * (aPerformance.audience - 30);
                }
                break;
            case "comedy":
                result = 30000;
                if (aPerformance.audience > 20) {
                    result += 10000 + 500 * (aPerformance.audience - 20);
                }
                result += 300 * aPerformance.audience;
                break;
            default:
                throw new Error(`unknown type: ${playFor(aPerformance).type}`);
        }
        return result;
    }

    const playFor = (aPerformance: Perf): PlayData => {
        const result = plays[aPerformance.playID];
        if (result === undefined) throw new Error(`unknown play ID: ${aPerformance.playID}`);
        return result;
    }

    const volumeCreditsFor = (aPerformance: Perf): number => {
        let volumeCredits = 0;
        volumeCredits += Math.max(aPerformance.audience - 30, 0);
        if ("comedy" === playFor(aPerformance).type) volumeCredits += Math.floor(aPerformance.audience / 5);
        return volumeCredits;
    }

    const usd = (aNumber: number): string => {
        return new Intl.NumberFormat("en-US",
            {
                style: "currency", currency: "USD",
                minimumFractionDigits: 2
            }).format(aNumber / 100);
    }

    const totalVolumeCredits = (): number => {
        let volumeCredits = 0;
        for (let perf of invoice.performances) {
            volumeCredits += volumeCreditsFor(perf);
        }
        return volumeCredits;
    }

    let totalAmount = 0;
    let result = `Statement for ${invoice.customer}\n`;
    for (let perf of invoice.performances) {
        result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`;
        totalAmount += amountFor(perf);
    }
    result += `Amount owed is ${usd(totalAmount)}\n`;
    result += `You earned ${totalVolumeCredits()} credits\n`;
    return result;
}


