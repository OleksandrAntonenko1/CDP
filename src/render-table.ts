import {pricingInformation} from './parsers'

const headers = [
    'Hotel',
    'date',
    'type',
    'price',
    'currency',
];

export function renderTable(data: Map<string, pricingInformation>, container: HTMLElement): void {
    const table = document.createElement("table");

    table.appendChild(getHeaders());

    data.forEach((pricingInformation, hotel) => {
        const tr = document.createElement("tr");

        Object.entries(pricingInformation).forEach((data) => {
            const dataElem = document.createElement("td");
            console.log(data[0]);
            dataElem.innerText = data[0];
            tr.appendChild(dataElem);
            data[1].forEach((room) => {
                    Object.values(room).forEach((data) => {
                        const td = document.createElement("td");

                        td.innerText = data.toString();
                        td.appendChild(dataElem);
                    })
                }
            );
        });

        table.appendChild(tr);
    });


    container.appendChild(table);

}

function getHeaders(): HTMLElement {
    const tr = document.createElement("tr");
    for (let header of headers) {
        const th = document.createElement("th");
        th.innerText = header;
        tr.appendChild(th);
    }

    return tr;
}
