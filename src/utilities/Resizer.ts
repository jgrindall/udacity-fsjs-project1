import sharp from "sharp";
import {promises as fsPromises} from "fs";
import {getExtension, getFilename, dirOrFileExists} from "./FileUtils";

export interface IResizeParams{
    width:number;
    height:number;
}

export interface IResizeOutput{
   data:Buffer;
   fromCache:boolean;
}

export class Resizer{

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
    public async getResizedImage(filename:string, params:IResizeParams):Promise<IResizeOutput> {
        const output = this.outputDir + this.getName(filename, params.width, params.height);
        const exists = await dirOrFileExists(output);
        if(exists){
            const data:Buffer = await fsPromises.readFile(output);
            return {
                fromCache: true,
                data
            };
        }
        else{
            const data:Buffer = await this.resize(filename, params.width, params.height);
            await fsPromises.writeFile(output, data);
            return {
                fromCache: false,
                data
            };
        }
    }

    public async resize(filename:string, width:number, height:number):Promise<Buffer>{
        return sharp(this.inputDir + filename)
            .resize(width, height)
            .toBuffer();
    }

}
