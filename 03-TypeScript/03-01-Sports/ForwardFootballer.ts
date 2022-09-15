import { Footballer } from "./Footballer";
import { IForwardFootballer } from "./IForwardFootballer";

export class ForwardFootballer extends Footballer implements IForwardFootballer {
    private isGol: boolean;

    shoot(): boolean {
        this.isGol = Math.round(Math.random()) == 1 ? true : false;
        console.log(`${this.name} shoot! And the result is ${this.isGol ? "GOAAAAAAL :)" : "not goal :("}`);
        return this.isGol;
    }
}