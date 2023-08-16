import Cell from "../entity/Cell";
import Cube from "../entity/Cube";
import Sodoku from "../entity/Sodoku";

export function resolve(sodoku:Sodoku):Sodoku{
    const possibleEntrysLength:number = sodoku.getSize()

    //per cube check
    for (let cubes = 1; cubes <= sodoku.getCubes().length; cubes++) {
        let cube:Cube = sodoku.getCubes().filter(cube => cube.getId() === cubes)[0];

        for (let x = 1; x <= sodoku.getCubeRowLength() ;x++) {
            for (let y = 1; y <= sodoku.getCubeColumnLength(); y++) {
                    
                //empty cell
                if (cube.getCellByPosition(x, y).getValue() === 0) {
                    //get possible entrys
                    for (let possibleEntry = 1; possibleEntry <= possibleEntrysLength; possibleEntry++) {
                        const entry = sodoku.getPossibleEntrys().find(entry => entry === possibleEntry)[0];

                        if (sodoku.isSafeLocation(new Cell(x, y, cube.getId()), possibleEntry)) {
                            cube.getCellByPosition(x, y).setValue(entry);
                            continue;
                        }
                    }
                }
            }
        }

        sodoku.getCubes().forEach(cube => { console.log("CUBO #" + cube.getId() + ":", cube.getEntrys()) });
    }

    return sodoku;
}