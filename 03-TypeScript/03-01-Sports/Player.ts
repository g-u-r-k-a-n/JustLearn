import { Direction } from "./Direction";
import { IPlayer } from "./IPlayer";

export class Player implements IPlayer {
    constructor(name: string) {
        this.name = name;
    }

    name: string;
    run(): void {
        console.log(`${this.name} running...`);
    }
    stop(): void {
        console.log(`${this.name} stopping...`);
    }
    turn(direction: Direction): void {
        console.log(`${this.name} turning to the ${Direction[direction].toLowerCase()}...`);
    }
}