/**
 * cached image resizing.
 **/

import sharp from "sharp";
import {promises as fsPromises} from "fs";
import mkdirp from "mkdirp";
import {getExtension, getFilename, dirOrFileExists} from "./FileUtils";

export interface IResizeParams {
    width: number;
    height: number;
}

export interface IResizeOutput {
    data: Buffer;
    fromCache: boolean;
}

export class Resizer {
    private inputDir = "./";
    private outputDir = "./";

    constructor(inputDir: string, outputDir: string) {
        this.inputDir = inputDir;
        this.outputDir = outputDir;
        return this;
    }

    private getName(filename: string, width: number, height: number) {
        const base: string = getFilename(filename);
        const ext: string = getExtension(filename);
        return `${base}@${width}x${height}.${ext}`;
    }

    private async saveFile(outputPath: string, data: Buffer): Promise<void> {
        const folderExists = await dirOrFileExists(this.outputDir);
        if(!folderExists) {
            await mkdirp(this.outputDir);
            return fsPromises.writeFile(outputPath, data);
        } else{
            return fsPromises.writeFile(outputPath, data);
        }
    }

    /**
     * Process. If the file exists, return the Buffer as-is. Else, resize it, save and return.
     * @return Promise<IResizeOutput>
     */
    public async getResizedImage(filename: string, params: IResizeParams): Promise<IResizeOutput> {
        const outputPath = this.outputDir + this.getName(filename, params.width, params.height);
        const exists = await dirOrFileExists(outputPath);
        if(exists) {
            // just get the data and return with fromCache: true
            const data: Buffer = await fsPromises.readFile(outputPath);
            return {
                fromCache: true,
                data
            };
        } else{
            // resize the input file, save it and return with fromCache: false
            const data: Buffer = await this.resize(filename, params.width, params.height);
            await this.saveFile(outputPath, data);
            return {
                fromCache: false,
                data
            };
        }
    }

    private async resize(filename: string, width: number, height: number): Promise<Buffer> {
        return sharp(this.inputDir + filename)
            .resize(width, height)
            .toBuffer();
    }
}
