export default class Cell {
    private x:number;
    private y:number;
    private value:number;

    constructor(x:number, y:number) {
        this.x = x;
        this.y = y;
        this.value = 0
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public setValue(value:number) {
        this.value = value;
    }

    public getValue():number{
        return this.value;
    }
}
