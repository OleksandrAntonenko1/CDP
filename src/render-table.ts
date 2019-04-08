import {pricingInformation} from './parsers'

const headers = [
    'type',
    'price',
    'currency',
];

export function renderTable(data: Map<string, pricingInformation>, container: HTMLElement): void {
    const table = document.createElement("table");

    table.appendChild(getHeaders());

    data.forEach((pricingInformation, hotel) => {
        const tr = document.createElement("tr");
        tr.appendChild(getHotelRow(hotel));

        Object.entries(pricingInformation).forEach((data) => {
            tr.appendChild(getDateRow(data[0]));

            data[1].forEach((room) => {
                    const roomRow = document.createElement("tr");
                    Object.values(room).forEach((data) => {
                        const td = document.createElement("td");

                        td.innerText = data.toString();
                        roomRow.appendChild(td);
                    });
                    tr.appendChild(roomRow);
                }
            );
        });
        table.appendChild(tr);
    });


    container.appendChild(table);
}

export function getDateRow(date: string): HTMLElement {
    const result = document.createElement("tr");
    const dataElem = document.createElement("td");

    dataElem.innerText = new Date(date).toDateString();

    result.appendChild(dataElem);

    return result;
}

export function getHotelRow(hotel: string): HTMLElement {
    const result = document.createElement("tr");
    const data = document.createElement("td");
    const strong = document.createElement("strong");

    strong.innerText = hotel;

    data.appendChild(strong);
    result.appendChild(data);

    return result;
}

function getHeaders(): HTMLElement {
    const result = document.createElement("tr");
    const tr = document.createElement("tr");
    for (let header of headers) {
        const th = document.createElement("th");
        th.innerText = header;
        tr.appendChild(th);
    }

    result.appendChild(tr);

    return result;
}
