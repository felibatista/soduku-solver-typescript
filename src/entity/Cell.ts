export default class Cell {
    private x:number;
    private y:number;
    private value:any;
    private cubeId:number;

    constructor(x:number, y:number, cubeId:number, value:any=0) {
        this.x = x;
        this.y = y;
        this.cubeId = cubeId;
        this.value = value
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public getCubeId(): number {
        return this.cubeId;
    }

    public setValue(value:any) {
        this.value = value;
    }

    public getValue():any{
        return this.value;
    }
}
