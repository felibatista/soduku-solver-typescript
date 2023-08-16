import Cell from "./Cell";
import Sodoku from "./Sodoku";

export default class Cube {
    private id:number;

    private rowLength:number;
    private columnLength:number;

    private values:Cell[];

    constructor (id:number, values:Cell[]=[]) {
        this.rowLength = 0
        this.columnLength = 0

        this.id = id;
        this.values = values;
    }

    public generate(sodoku:Sodoku, values:Cell[]=[]):void{
        //set row and column lenght
        this.rowLength = sodoku.getCubeRowLength();
        this.columnLength = sodoku.getCubeColumnLength();
        
        //generate and fill cells
        for (let x = 1; x <= sodoku.getCubeRowLength(); x++){
            for (let y = 1; y <= sodoku.getCubeColumnLength(); y++){
                const findCellsInValues = values.filter((cell:Cell) => cell.getX() === x && cell.getY() === y);
                
                if (findCellsInValues.length === 0) {
                    //const numberRandom:number = Math.floor(Math.random() * 10);
                    this.values.push(new Cell(x, y, this.id));
                }else{
                    this.values.push(findCellsInValues[0]);
                }
            }
        }

        console.log("CUBO #" + this.id + ":", this.getEntrys())
    }
    
    public getCells(): Cell[] {
        return this.values
    }

    public setCells(values: Cell[]): void {
        this.values = values;
    }

    public getRowLength():number {
        return this.rowLength;
    }

    public getColumnLength():number {
        return this.columnLength;
    }

    public getCellByPosition(x:number, y:number):Cell{
        return this.values.filter((cell:Cell) => cell.getX() === x && cell.getY() === y)[0];
    }
        
    public getEntrys():any[] {
        return this.values.map((cell:Cell) => cell.getValue());
    }

    public containsEntry(entry:any):boolean {
        if (this.getEntrys().includes(entry)){
            return true;
        }

        return false;
    }

    public getId():number {
        return this.id;
    }
}