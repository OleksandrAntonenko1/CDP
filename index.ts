import {Converter} from "./src/converter";
import { getAllHotels} from "./src/parsers";
import {renderTable} from "./src/render-table";

let kek = new Converter();

console.log(kek.toEUR(6, 'UAH'));
console.log(kek.toUAH(6, 'UAH'));
console.log(kek.toUAH(6, 'USD'));



// @ts-ignore
renderTable(getAllHotels(), document.querySelector('#root'));
