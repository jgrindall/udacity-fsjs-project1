import sharp from "sharp";

export class Resizer{

    private filename:string;
    private width:number;
    private height:number;

    private inputDir:string = "";
    private outputDir:string = "";

    constructor(filename:string, width:number, height:number){
        this.filename = filename;
        this.width = width;
        this.height = height;
    }

    async process() {
        if (!this.inputDir || !this.outputDir) {
            throw new Error("wrong config");
        }
        return sharp(this.inputDir + "/" + this.filename)
            .resize(this.width, this.height)
            .toFile(this.outputDir + "/'output.jpg");
    }

    public setOutputDir(outputDir:string){
        this.outputDir = outputDir;
    }

    public setInputDir(inputDir:string){
        this.inputDir = inputDir;
    }

}