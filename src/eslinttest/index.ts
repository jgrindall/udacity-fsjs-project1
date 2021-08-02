import {promises as fsPromises} from "fs";

function test() {
    const a = {
        f: () => {
            for(let i = 0; i < 10; i++){
                console.log(i);
            }
        }
    };
    a.f();
}

test();