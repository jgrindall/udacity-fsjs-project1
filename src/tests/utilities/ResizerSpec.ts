import {promises as fsPromises} from "fs";
import sizeOf from "buffer-image-size";
import {Resizer, IResizeOutput} from "../../utilities/Resizer";
import {dirOrFileExists} from "../../utilities/FileUtils";
import {beforeAllHandler, afterAllHandler, afterEachHandler, inputPath, outputPath, fileName} from "../helpers/testutils";

describe("test it resizes an image and returns the relevant buffer", () => {

    beforeAll(beforeAllHandler);
    afterAll(afterAllHandler);
    afterEach(afterEachHandler);

    it('test getResizedImage works and returns a buffer of the right size',  () => {
        const resizer = new Resizer(inputPath, outputPath);
        return resizer
            .getResizedImage(fileName + ".jpg", {width:100, height:100})
            .then((output: IResizeOutput) => {
                expect(output.data).toBeTruthy();
                expect(output.fromCache).toBeFalse();
                const dimensions = sizeOf(output.data);
                expect(dimensions.width).toEqual(100);
                expect(dimensions.height).toEqual(100);
            });
    });

    it('test getResizedImage throws an error when called on an image that does not exist', () => {
        const resizer = new Resizer(inputPath, outputPath);
        return resizer
            .getResizedImage("doesnotexist.jpg", {width:100, height:100})
            .then(()=>{
                fail();
            })
            .catch((e:Error)=>{
                expect(e.message).toEqual("Input file is missing");
            });
    });

    it('test getResizedImage throws an error when called on an image in a folder that does not exist', () => {
        const resizer = new Resizer(inputPath + "/subfolderdoesnotexist/", outputPath);
        return resizer
            .getResizedImage(fileName + ".jpg", {width:100, height:100})
            .then(()=>{
                fail();
            })
            .catch((e:any)=>{
                expect(e.message).toEqual("Input file is missing");
            });
    });

    it('test getResizedImage works and saves the output image in the right place', () => {
        const resizer = new Resizer(inputPath, outputPath);
        return resizer
            .getResizedImage(fileName + ".jpg", {width:100, height:100})
            .then(async () => {
                const newFilename = outputPath + fileName + "@100x100.jpg";
                const exists = await dirOrFileExists(newFilename);
                expect(exists).toEqual(true);
                return fsPromises
                    .readFile(newFilename)
                    .then((data:Buffer)=>{
                        const dimensions = sizeOf(data);
                        expect(dimensions.width).toEqual(100);
                        expect(dimensions.height).toEqual(100);
                    });
            });
    });

    it('test getResizedImage caches correctly',  () => {
        const resizer = new Resizer(inputPath, outputPath);
        spyOn(resizer, "resize").and.callThrough();
        const resizeOnce = (expectCache:boolean)=>{
            return resizer
                .getResizedImage(fileName + ".jpg", {width:100, height:100})
                .then((output: IResizeOutput) => {
                    expect(output.data).toBeTruthy();
                    if(expectCache){
                        expect(output.fromCache).toBeTrue();
                    }
                    else{
                        expect(output.fromCache).toBeFalse();
                    }
                });
        };
        const newFilename = outputPath + fileName + "@100x100.jpg";
        return resizeOnce(false).then(()=>{
            return resizeOnce(true).then(()=>{
                return resizeOnce(true).then(()=>{
                    return dirOrFileExists(newFilename).then((tf)=>{
                        expect(tf).toEqual(true);
                        expect(resizer.resize).toHaveBeenCalled();
                        expect(resizer.resize).toHaveBeenCalledTimes(1); // not 3
                    });
                });
            });
        })
    });

});

