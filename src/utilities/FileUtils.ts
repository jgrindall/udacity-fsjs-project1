import fs, {promises as fsPromises} from "fs";
import fsExtra from "fs-extra";

export const getExtension = (filename:string):string => {
    return filename.split(".").pop() || "";
};

export const getFilename = (filename:string):string => {
    const parts = filename.split(".");
    parts.pop();
    return parts.join(".");
};

export async function dirOrFileExists(dir:string):Promise<boolean>{
    return fsPromises.access(dir, fs.constants.F_OK)
        .then(() => {
            return Promise.resolve(true);
        })
        .catch(() => {
            return Promise.resolve(false);
        });
}

export async function removeDirectory(dir:string):Promise<void>{
    const exists = await dirOrFileExists(dir);
    if(exists){
        return emptyDirectory(dir).then(()=>{
            return fsPromises.rmdir(dir);
        });
    }
    else{
        return Promise.resolve();
    }
}

export async function emptyDirectory(dir:string):Promise<void>{
    const exists = await dirOrFileExists(dir);
    if(exists){
        return fsExtra.emptyDir(dir);
    }
    else{
        return Promise.resolve();
    }
}
