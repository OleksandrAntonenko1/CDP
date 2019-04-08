import {getAllHotels} from "./src/parsers";
import {Application} from "./src/Application";
import {renderTable} from "./src/render-table";

// @ts-ignore
renderTable(getAllHotels(), document.querySelector('#root'));
const App = new Application();
