import Cell from "../entity/Cell";
import Cube from "../entity/Cube";
import Sodoku from "../entity/Sodoku";

interface EntrysByStep{
    step:number;
    entrys:number[];
}

export function addNumber(sodoku:Sodoku, cubeId:number, x:number, y:number, value:number):Sodoku{
    const cube:Cube = sodoku.getCubes().filter(cube => cube.getId() === cubeId)[0];
    const cell:Cell = cube.getCells().filter(cell => cell.getX() === x && cell.getY() === y)[0];

    cell.setValue(value);

    return sodoku;
}

export function resolve(sodoku:Sodoku):Sodoku{
    addNumber(sodoku, 2, 1, 1, 1);
    addNumber(sodoku, 6, 2, 1, 2);
    
    //sodoku.getCubes().forEach(cube => { console.log("CUBO #" + cube.getId() + ":", cube.getEntrys()) });

    const possibleEntrysLength:number = sodoku.getSize()

    let maxY:number = sodoku.getCubeColumnLength() * sodoku.getCubesFromGrandRow(1).length;
    let maxX:number = sodoku.getCubeRowLength() * sodoku.getCubesFromGrandColumn(1).length;
    
    let copyEntrys:EntrysByStep[] = []
    let counterSteps:number = 0;

    //first entrys
    copyEntrys.push({step:0, entrys:sodoku.getCubes().map(cube => cube.getEntrys()).flat()});

    for (let cubes = 1; cubes <= sodoku.getCubes().length; cubes++) {
        let cube:Cube = sodoku.getCubes().filter(cube => cube.getId() === cubes)[0];
    
        for (let xInCube = 1; xInCube <= sodoku.getCubeRowLength(); xInCube++) {
            for (let yInCube = 1; yInCube <= sodoku.getCubeColumnLength(); yInCube++) {
                counterSteps++
                
                let cell:Cell = cube.getCells().filter(cell => cell.getX() === xInCube && cell.getY() === yInCube)[0];

                if (cell.getValue() != 0){
                    continue;
                }

                for (let possibleEntry = 1; possibleEntry <= possibleEntrysLength; possibleEntry++) {
                    const entry = sodoku.getPossibleEntrys().filter(entry => entry === possibleEntry)[0]

                    if (sodoku.isSafeLocation(cell, entry)){               
                        cell.setValue(entry);
                        copyEntrys.push({step:counterSteps, entrys:sodoku.getCubes().map(cube => cube.getEntrys()).flat()});
                        //console.log("Cubo #" + cell.getCubeId() + " - X:", xInCube, "Y:", yInCube, "- NUEVO VALOR:", entry);
                        break;
                    }else{
                        //console.log("Cubo #" + cell.getCubeId() + " - X:", xInCube, "Y:", yInCube, "- NO PASO EL VALOR:", entry);
                    }
                }

                //check again is value is 0
            }
        }
    }



    console.log(copyEntrys)


    return sodoku;
}