import fs, {promises as fsPromises} from "fs";

function loop(n: number):void{
    for(let i = 0; i < 10; i++){
        console.log(i);
    }
}

export async function dirOrFileExists(dir: string): Promise<boolean>{
    loop(10);
    return fsPromises
        .access(dir, fs.constants.F_OK)
        .then(() => {
            return Promise.resolve(true);
        })
        .catch(() => {
            return Promise.resolve(false);
        });
}