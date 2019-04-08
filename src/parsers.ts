import {Currency} from "./converter";
// @ts-ignore
import CheapBay from "../data/cheap-bay";
// @ts-ignore
import midrangePalms from "../data/midrange-palms";
// @ts-ignore
import randomHotel from "../data/random-hotel";

type room = {
    type: string,
    price: number,
    currency: Currency,
}

export type pricingInformation = {
    [index: string]: room[],
}

function setItem(
    type: string,
    price: number,
    currency: Currency,
    date: string,
    result: pricingInformation,
) {
    const room: room = {
        type,
        price,
        currency,
    };

    const convertedDate: string = new Date(date).toLocaleDateString('en-US');

    if (result[convertedDate]) {
        result[convertedDate].push(room)
    } else {
        result[convertedDate] = [room]
    }
}


export function getMidrangePalmsData(): pricingInformation {
    const result: pricingInformation = {};

    for (const roomType in midrangePalms) {
        for (const {date, price, currency} of midrangePalms[roomType]) {
            setItem(roomType, price, currency, date, result)
        }
    }

    return result;
}

export function getRandomHotelData(): pricingInformation {
    const result: pricingInformation = {};

    for (const {date, prices} of randomHotel) {
        for (const roomType in prices) {
            const {value, currency} = prices[roomType];

            setItem(roomType, value, currency, date, result)
        }
    }

    return result;
}


export function getCheapBayData(): pricingInformation {
    const result: pricingInformation = {};

    for (const date in CheapBay) {
        for (const roomType in CheapBay[date]) {
            const [price, currency] = CheapBay[date][roomType].split(' ');

            setItem(roomType, price, currency, date, result)
        }
    }

    return result;
}

export function getAllHotels() {
    const MidrangePalms = 'MidrangePalms';
    const RandomHotel = 'RandomHotel';
    const CheapBay = 'CheapBay';

    const result = new Map<string, pricingInformation>();
    result.set(CheapBay, getCheapBayData());
    result.set(RandomHotel, getRandomHotelData());
    result.set(MidrangePalms, getMidrangePalmsData());

    return result;
}




