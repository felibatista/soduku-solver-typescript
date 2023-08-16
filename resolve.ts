import { resolve } from "./src/controller/SodukuController";
import Cube from "./src/entity/Cube";
import Soduku from "./src/entity/Sodoku";

const soduku = new Soduku(9);
resolve(soduku);
//console.log(soduku.toString())
//soduku.printImageConsole()
//soduku.getCubesFromGrandRow(2).forEach((cube:Cube) =>  console.log(cube.getId()));

//console.log(soduku.getCubes().forEach((cube:Cube) => {
//    console.log(cube.getId(), cube.getCells());
//}));