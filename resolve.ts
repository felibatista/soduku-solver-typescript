import { findNumberInRow } from "./src/controller/SodukuController";
import Cube from "./src/entity/Cube";
import Soduku from "./src/entity/Soduku";

const soduku = new Soduku(9);

console.log(soduku.getCubes().forEach((cube:Cube) => {
    console.log(cube.getId(), cube.getCells());
}));

console.log(findNumberInRow(soduku, 1, 2));