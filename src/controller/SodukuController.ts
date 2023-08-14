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

export function findInRow(sodoku:Soduku, numberToFind:number, row:number ): boolean {
    const grandRow = getGrandRowByRow(sodoku, row);
    const cubesInGrandRow:Cube[] = getCubesFromGrandRow(sodoku, grandRow);

    range(1, cubesInGrandRow.length).forEach((cubeId) =>
        range(1, 3).forEach((cellX) => {
            const cubeFound:Cube = sodoku.getCubes().filter((cubeUnique:Cube) => cubeUnique.getId() == cubeId)[0];
            const cellFound:Cell = cubeFound.getCells().filter((cellUnique:Cell) => cellUnique.getY() === cellX)[0];

            console.log("El valor de Y - X:", getYFromRow(sodoku, row), cellX, "se encuentra en el cubo ID: ", cubeFound.getId(), "con valor de:", cellFound.getValue())
        })
    )

    return false
}

function getYFromRow(sodoku:Soduku, row:number):number{
    const grandRow = getGrandRowByRow(sodoku, row);
    return row - (3 * (grandRow - 1))
}


function getGrandRowByRow(soduku:Soduku, row:number): number {
    const large = Soduku.getNumberDivisibleTable(soduku.getSize());

    let rows:any[] = [];
    let counter = 1

    range(1, soduku.getSize()).forEach((rowNumber:number) => {
        rows.push(
            {rowNumber: rowNumber, grandRow: counter}
        );

        if (rowNumber % large === 0) {
            counter += 1
        }
    })

    let cubeNumber = 0

    rows.forEach(r => {
        const rowNumber = r.rowNumber
        const rowCube = r.grandRow

        if (rowNumber === row) {
            cubeNumber = rowCube;
        }
    });

    return cubeNumber
}