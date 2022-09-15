import { IFootballer } from "./IFootballer";

export interface IForwardFootballer extends IFootballer {
    shoot(): boolean;
}