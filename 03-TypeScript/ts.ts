import { Direction } from "./03-01-Sports/Direction";
import { ForwardFootballer } from "./03-01-Sports/ForwardFootballer";

namespace TS {
    class Types {
        number: number = 1;
        name: string = "john doe";
        isSuccess: boolean = true;
        anything: any = { aaa: "111" };
        numbers: number[] = [1, 2, 3];
        names: Array<string> = ["john", "jane"];
        everything: [string, number, boolean] = ["a", 1, true]; //tuple
    }

    //Type Conversions
    let number2;
    number2 = "1";
    let numberAsString = (<string>number2);
    numberAsString = (number2 as string);

    function getAvarage(...numbers: number[]): number {
        let total = 0;
        for (const number of numbers) {
            total += number;
        }
        return total / numbers.length;
    }
    console.log(getAvarage(10, 20, 30));

    const start = () => {
        const footballer1 = new ForwardFootballer("Christian Ronaldo");
        footballer1.run();
        footballer1.turn(Direction.Left);
        footballer1.stop();
        footballer1.run();
        footballer1.pass();
        footballer1.turn(Direction.Right);
        footballer1.intercept();
        footballer1.shoot();
    }

    start();
}
