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
        const path = __dirname + "/" + this.inputDir + "/" + this.filename + ".jpg";
        const outPath = __dirname + "/" + this.outputDir + "/" + this.filename + "OUT.jpg";
        console.log(path);
        return sharp(path)
            .resize(this.width, this.height)
            .toFile(outPath);
    }

    public setOutputDir(outputDir:string){
        this.outputDir = outputDir;
    }

    public setInputDir(inputDir:string){
        this.inputDir = inputDir;
    }

}