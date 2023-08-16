import Cell from "./Cell";
import Cube from "./Cube";

export default class Sodoku {
    private cubes: Cube[];

    private grandRowLength: number;
    private grandColumnLength: number;

    private cubeRowLength:number;
    private cubeColumnLength:number;

    private size:number;

    private possibleEntrys: any[]

    constructor(size:number){
        if (size > 16){
            throw new Error ("The size cannot be bigger than 16")
        }

        //init
        this.size = size;
        this.cubes = [];

        this.grandColumnLength = 0
        this.grandRowLength = 0
    
        this.cubeRowLength = 0
        this.cubeColumnLength = 0

        this.possibleEntrys = []

        //calcule columns and rows, and possible entrys
        this.calculateTable();

        //cube generator
        for (let id = 1; id <= size;id++){
            let cube = new Cube(id);
            cube.generate(this)

            this.cubes.push(cube)
        }     
    }

    private calculateTable(){       
        //entrys
        for (let entry = 1; entry <= this.size; entry++){
            if (entry <= 9){
                this.possibleEntrys.push(entry)
            }else if (entry == 10){
                this.possibleEntrys.push(0)
            }else{
                this.possibleEntrys.push(String.fromCharCode(entry + 54))
            }
        }

        //rows, cube size and columns
        if (this.size === 16){
            this.cubeRowLength = 4
            this.cubeColumnLength = this.possibleEntrys.length / 4
            this.grandColumnLength = 4
            this.grandRowLength = this.size / 4
        }else if (this.size % 3 === 0 || this.size === 12){
            this.cubeRowLength = 3
            this.cubeColumnLength = this.possibleEntrys.length / 3
            this.grandColumnLength = 3
            this.grandRowLength = this.size / 3
        }else if (this.size % 2 === 0){
            this.cubeRowLength = 2
            this.cubeColumnLength = this.possibleEntrys.length / 2
            this.grandColumnLength = 2
            this.grandRowLength = this.size / 2
        }else{
            throw new Error("The selected size cannot be generated, try another one.")
        }
    }

    
    public getCubesFromGrandRow(grandRow:number): Cube[] {
        const cubesInGrandRow:number[] = []
    
        if (grandRow > this.grandRowLength){
            throw new Error("The grand row cannot be longer than the length of the Sodoku.")
        }
    
        for (let a = 1 + (this.grandColumnLength * (grandRow - 1));
            a <= (this.grandColumnLength * (grandRow - 1)) + this.grandColumnLength;
            a++){
                cubesInGrandRow.push(a)
        }
    
        return this.getCubes().filter((cube:Cube) => {
            return cubesInGrandRow.includes(cube.getId())
        });
    }

    public getCubesFromGrandColumn(grandColumn:number): Cube[] {
        const cubesInGrandColumn:number[] = []
    
        if (grandColumn > this.grandColumnLength){
            throw new Error("The grand column cannot be longer than the length of the Sodoku.")
        }
    
        for (let a = grandColumn; a <= this.getSize();
            a+=this.grandColumnLength){
                cubesInGrandColumn.push(a)
        }
    
        return this.getCubes().filter((cube:Cube) => {
            return cubesInGrandColumn.includes(cube.getId())
        });
    }

    public getGrandRowByCube(cube:Cube):number{
        return Math.ceil(cube.getId() / this.grandColumnLength)
    }

    public getGrandColumnByCube(cube:Cube):number{
        return cube.getId() % this.grandColumnLength === 0 ? this.grandColumnLength : cube.getId() % this.grandColumnLength
    }

    public isSafeLocation(cell:Cell, entryToFind:any):boolean{
        const cellValue:number = cell.getValue();

        const x = cell.getX();
        const y = cell.getY();
        
        const cubeCell:Cube = this.getCubes().find((cube:Cube) => cell.getCubeId() === cube.getId())!;

        //check cube
        if (cubeCell?.containsEntry(entryToFind)){
            return false;
        }

        //check column
        this.getCubesFromGrandColumn(this.getGrandColumnByCube(cubeCell)).forEach((cube:Cube) => {
            for (let a = 1; a <= this.cubeRowLength; a++){
                if (cube.getCellByPosition(x, a)?.getValue() === entryToFind){
                    return false;
                }
            }
        });

        //check row
        this.getCubesFromGrandRow(this.getGrandRowByCube(cubeCell)).forEach((cube:Cube) => {
            for (let a = 1; a <= this.cubeColumnLength; a++){
                if (cube.getCellByPosition(a, y)?.getValue() === entryToFind){
                    return false;
                }
            }
        });

        return true;
    }


    public printImageConsole(){
        let image = ""

        for (let rows = 1; rows <= this.grandRowLength; rows++){
            for (let columns = 1; columns <= this.grandColumnLength; columns++){
                image += "| 0 (" + columns.toString() + " - "+  rows.toString() + ") "

                if (columns % this.grandColumnLength === 0){
                    image += "|\n"
                }
            }
        }

        this.getCubes().forEach((cube:Cube) => {
            console.log(cube.getId() + " -> x:", this.getGrandRowByCube(cube) + " - y:", this.getGrandColumnByCube(cube))
        })

        console.log(image)
    }

    public getSize(): number {
        return this.size;
    }

    public getCubes(): Cube[] {
        return this.cubes;
    }

    public getGrandColumnLength(): number {
        return this.grandColumnLength;
    }

    public getGrandRowLength(): number {
        return this.grandRowLength;
    }

    public getPossibleEntrys(): any[] {
        return this.possibleEntrys;
    }

    public getCubeRowLength(): number {
        return this.cubeRowLength;
    }

    public getCubeColumnLength(): number {
        return this.cubeColumnLength;
    }

    public toString(): string {
        return `Soduku -> Size:${this.size}x${this.size} - GCxGR:${this.grandColumnLength}x${this.grandRowLength} - CCxCR:${this.cubeColumnLength}x${this.cubeRowLength} - Entrys:${this.possibleEntrys}`
    }
}