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
     * process. If the file exists, return the Buffer as-is. Else, resize it, save and return.
     */
    public async getResizedImage(filename:string, width:number, height:number):Promise<Buffer> {
        const output = this.outputDir + this.getName(filename, width, height);
        return fsPromises.access(output, fs.constants.F_OK)
            .then(() => {
                // file exists
                return fsPromises.readFile(output);
            })
            .catch(async () => {
                const data:Buffer = await this.resize(filename, width, height);
                console.log('data', data);
                await fsPromises.writeFile(output, data);
                return data;
            });
    }

    public async resize(filename:string, width:number, height:number):Promise<Buffer>{
        console.log('resize', filename);
        return sharp(this.inputDir + filename)
            .resize(width, height)
            .toBuffer();
    }

}
