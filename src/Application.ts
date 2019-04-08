import {Converter, Currency} from "./converter";
import {
    getAllHotels,
    pricingInformation,
} from "./parsers";
import {getHotelRow} from "./render-table";

export class Application {
    private readonly dateElement: HTMLInputElement;
    private readonly currencyElement: HTMLInputElement;
    private readonly appTable: HTMLElement;
    private readonly data: Map<string, pricingInformation>;
    private converter: Converter;

    constructor() {
        this.dateElement = document!.querySelector<HTMLInputElement>('#date')!;
        this.appTable = document!.querySelector<HTMLInputElement>('#appTable')!;
        this.currencyElement = document!.querySelector<HTMLInputElement>('#currency')!;

        if (!(this.dateElement && this.appTable && this.currencyElement)) {
            throw new Error('Cant find elements')
        }

        this.dateElement.addEventListener('change', this.handleChange);
        this.currencyElement.addEventListener('change', this.handleChange);
        this.data = getAllHotels();
        this.converter = new Converter();
    }

    handleChange = (): void => {
        const date = new Date(this.dateElement.value).toLocaleDateString('en-US');
        // @ts-ignore
        const currency: Currency = this.currencyElement.value;
        this.appTable.innerHTML = '';

        this.data.forEach((pricingInformation, hotel) => {
            const tr = document.createElement("tr");
            tr.appendChild(getHotelRow(hotel));

            if (pricingInformation[date]) {
                pricingInformation[date].forEach((room) => {
                    const roomRow = document.createElement("tr");

                    addTd(room.type, roomRow);
                    addTd(this.converter.convert(room.price, room.currency, currency).toString(), roomRow);
                    addTd(currency, roomRow);

                    tr.appendChild(roomRow);
                });
            }
            this.appTable.appendChild(tr);
        });
    };
}

function addTd(value: string, container: HTMLElement): void {
    const td = document.createElement("td");

    td.innerText = value.toString();
    container.appendChild(td);
}