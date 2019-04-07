export type Currency = 'EUR' | 'UAH' | 'USD';

type CurrencyPrices = {
    'EUR': number,
    'UAH': number,
    'USD': number
}

type CurrencyMap = {
    'EUR': CurrencyPrices,
    'UAH': CurrencyPrices,
    'USD': CurrencyPrices
}

interface CurrencyConverter {
    convert(value: number, from: Currency, to: Currency): number;

    toEUR(value: number, currency: Currency): number;

    toUAH(value: number, currency: Currency): number;

    toUSD(value: number, currency: Currency): number;
}


export class Converter implements CurrencyConverter {
    private _map: CurrencyMap;
    /* private  _map: CurrencyMap; */
    /* constructor(usdToUah: number, eurToUah: number) */

    /* private  _createCurrancyMap(usdToUah: number, eurToUah: number): CurrencyMap; */
    constructor(usdToUah: number = 26.5, eurToUah: number = 29.9) {
        this._map = this._createCurrencyMap(usdToUah, eurToUah);
    }

    private _createCurrencyMap(usdToUah: number, eurToUah: number): CurrencyMap {
        const Uah: CurrencyPrices = {'EUR': eurToUah, 'UAH': 1, 'USD': usdToUah};
        const Eur: CurrencyPrices = {'EUR': eurToUah/eurToUah, 'UAH': eurToUah, 'USD': eurToUah/usdToUah};
        const Usd: CurrencyPrices = {'EUR': usdToUah/eurToUah, 'UAH': usdToUah, 'USD': usdToUah/usdToUah};

        return {
            'UAH': Uah,
            'EUR': Eur,
            'USD': Usd,
        }
    }

    toEUR(value: number, currency: Currency): number{
        return this._map[currency]['EUR'] * value
    };

    toUAH(value: number, currency: Currency): number{
        return this._map[currency]['UAH'] * value
    };

    toUSD(value: number, currency: Currency): number{
        return this._map[currency]['USD'] * value
    };

    convert(value: number, from: Currency, to: Currency): number{
        return this._map[from][to] * value
    };
}
