import sharp from "sharp";
import {promises as fsPromises} from "fs";
import fs from "fs";
import {getExtension, getFilename} from "./FileUtils";

export default class Resizer{

    private inputDir:string = "./";
    private outputDir:string = "./";

    constructor(inputDir:string, outputDir:string){
        this.inputDir = inputDir;
        this.outputDir = outputDir;
        return this;
    }

    private getName(filename:string, width:number, height:number){
        const base:string = getFilename(filename);
        const ext:string = getExtension(filename);
        return `${base}@${width}x${height}.${ext}`;
    }

    /**
     * process. If the file exists, return the Buffer as-is. Else, resize it and return.
     */
    public async getResizedImage(filename:string, width:number, height:number):Promise<Buffer> {
        const output = this.outputDir + this.getName(filename, width, height);
        console.log("check for", output);
        return fsPromises.access(output, fs.constants.F_OK)
            .then(() => {
                // file exists
                console.log("file exists", output);
                return fsPromises.readFile(output);
            })
            .catch(() => {
                console.log("file does not exist", output);
                return sharp(this.inputDir + filename)
                    .resize(width, height)
                    .toBuffer()
                    .then(async (data:Buffer)=>{
                        // write the file for next time and output it to the browser as well
                        await fsPromises.writeFile(output, data);
                        return data;
                    });
            });
    }


}
