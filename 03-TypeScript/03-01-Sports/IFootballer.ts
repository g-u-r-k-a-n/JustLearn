import { IPlayer } from "./IPlayer";

export interface IFootballer extends IPlayer {
    pass(): void;
    intercept(): void;
}