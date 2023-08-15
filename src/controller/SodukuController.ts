import Cell from "../entity/Cell";
import Cube from "../entity/Cube";
import Soduku from "../entity/Soduku";
import { range } from "../utils";

function getCubesFromGrandRow(soduku:Soduku, grandRow:number): Cube[] {
    const cubesInGrandRow:number[] = range(1 + (3 * (grandRow - 1)), Soduku.getNumberDivisibleTable(soduku.getSize()) + (3 * (grandRow - 1)))
    return soduku.getCubes().filter((cube:Cube) => {
        return cubesInGrandRow.includes(cube.getId())
    });
}

export function findNumberInRow(sodoku:Soduku, numberToFind:number, row:number ): [boolean, Cell | null] {
    const grandRow = getGrandRowByRow(sodoku, row);
    const cubesInGrandRow:Cube[] = getCubesFromGrandRow(sodoku, grandRow);

    let lastCellFound:Cell | null = null;
    let found:boolean = false;

    for (let cubeId = 1; cubeId <= cubesInGrandRow.length; cubeId++){
        for (let cellX = 1; cellX <= 3; cellX++){
            const cubeFound:Cube = sodoku.getCubes().filter((cubeUnique:Cube) => cubeUnique.getId() == cubeId)[0];
            const cellFound:Cell = cubeFound.getCells().filter((cellUnique:Cell) => cellUnique.getY() === cellX)[0];
            const valueFound:number = cellFound.getValue()
        
            if (valueFound === numberToFind){
                lastCellFound = cellFound;
                found = true;
                
                break;
            }
        }
    }

    return [found, lastCellFound]
}

function getYFromRow(sodoku:Soduku, row:number):number{
    const grandRow = getGrandRowByRow(sodoku, row);
    return row - (3 * (grandRow - 1))
}


function getGrandRowByRow(soduku:Soduku, row:number): number {
    const large = Soduku.getNumberDivisibleTable(soduku.getSize());

    let rows:any[] = [];
    let grandRow = 1

    for (let rowNumber = 1; rowNumber < soduku.getSize(), rowNumber++;){
        if (rowNumber % large === 0) {
            grandRow += 1
        }
    
        if (rowNumber === row){
            break;
        }
    }

    return grandRow;
}