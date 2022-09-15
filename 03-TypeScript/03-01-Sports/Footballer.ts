import { Player } from "./Player";
import { IFootballer } from "./IFootballer"

export class Footballer extends Player implements IFootballer {
    constructor(name: string) {
        super(name);
    }
    intercept(): void {
        console.log(`${this.name} intercepted the ball...`);
    }
    pass(): void {
        console.log(`${this.name} passing...`);
    }
}