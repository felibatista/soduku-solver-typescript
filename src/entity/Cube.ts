import { range } from "../utils";
import Cell from "./Cell";

export default class Cube {
    private id:number;
    private values:Cell[];

    constructor (id:number, values: Cell[]) {
        this.id = id;
        this.values = values;
    }

    public getCells(): Cell[] {
        return this.values
    }

    public setCells(values: Cell[]): void {
        this.values = values;
    }
    
    public generateValues():void{
        range(1, 3).forEach((x) => {
            range(1, 3).forEach((y) => {
                this.values.push(new Cell(x, y));
            })
        })
    }

    public getId():number {
        return this.id;
    }
}