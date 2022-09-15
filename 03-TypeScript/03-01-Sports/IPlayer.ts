import { Direction } from "./Direction";

export interface IPlayer {
    name: string;
    run(): void;
    stop(): void;
    turn(direction: Direction): void;
}