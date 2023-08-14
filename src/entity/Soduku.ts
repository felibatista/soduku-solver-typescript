import { range } from "../utils";
import Cube from "./Cube";

export default class Soduku {
    private size: number;
    private cubes: Cube[];

    public static getNumberDivisibleTable(size: number): number {
        if (size % 2 === 0) {
            return size / 2
        }
    
        if (size % 3 === 0) {
            return size / 3
        }
    
        if (size % 5 === 0) {
            return size / 5
        }
    
        return 0;
    }

    constructor(size:number){
        this.size = size;
        this.cubes = [];

        range(1, size).forEach((id) => {
            let cube = new Cube(id, []);
            cube.generateValues();

            this.cubes.push(cube)
        })
    }

    public getSize(): number {
        return this.size;
    }

    public getCubes(): Cube[] {
        return this.cubes;
    }
}