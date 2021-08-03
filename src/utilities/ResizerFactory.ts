import {Resizer, IResizeOutput, IResizeParams} from "./Resizer";

interface IResizer{
    getResizedImage(filename:string, params:IResizeParams):Promise<IResizeOutput>
}

export default {
    getResizer:(inputPath:string, outputPath:string): IResizer=>{
        return new Resizer(inputPath, outputPath);
    }
}
