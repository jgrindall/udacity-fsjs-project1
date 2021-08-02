import resizerConfig from ".././utilities/ResizerConfig";
import supertest from 'supertest';
import app from '../index';
import sizeOf from "buffer-image-size";
import {afterAllHandler, afterEachHandler, beforeAllHandler,  inputPath, fileName} from "./helpers/testutils";
const request = supertest(app);

describe('Test endpoint success', async () => {

    beforeAll(beforeAllHandler);
    afterAll(afterAllHandler);
    afterEach(afterEachHandler);

    it('test file simplest example', async () => {
        const spy = spyOnProperty(resizerConfig, 'inputPath', 'get').and.returnValue(inputPath);
        expect(resizerConfig.inputPath).toBe(inputPath);
        console.log("------------------------------image1");
        const response = await request.get('/api/images?filename=image1&width=100&height=100');
        expect(spy).toHaveBeenCalled();
        expect(response.status).toBe(201);
        expect(response.body as Buffer).toBeTruthy();
        const dimensions = sizeOf(response.body as Buffer);
        expect(dimensions.width).toEqual(100);
        expect(dimensions.height).toEqual(100);
        expect(response.headers["content-type"]).toEqual('image/jpg');
    });


  /*  it('test file cacheing', async () => {
        const spy = spyOnProperty(resizerConfig, 'inputPath', 'get').and.returnValue(inputPath);
        expect(resizerConfig.inputPath).toBe(inputPath);
        console.log("------------------------------image1");
        const response = await request.get('/api/images?filename=image1&width=100&height=100');
        expect(spy).toHaveBeenCalled();
        expect(response.status).toBe(201);
        expect(response.body as Buffer).toBeTruthy();
        const dimensions = sizeOf(response.body as Buffer);
        expect(dimensions.width).toEqual(100);
        expect(dimensions.height).toEqual(100);
        expect(response.headers["content-type"]).toEqual('image/jpg');
    });*/

});

describe('Test endpoint errors', () => {

    beforeAll(beforeAllHandler);
    afterAll(afterAllHandler);
    afterEach(afterEachHandler);

    it('test missing params - filename', async () => {
            const response = await request.get('/api/images');
            expect(response.statusCode).toBe(422);
            expect(response.text).toMatch(/filename error(.*)width error(.*)height error/);
        }
    );

    it('test missing params - w/h', async () => {
            const response = await request.get('/api/images?filename=' + fileName);
            expect(response.status).toBe(422);
            expect(response.text).toMatch(/width error(.*)height error/);
            expect(response.text).not.toMatch(/filename error/);
        }
    );

    it('test missing params - width/height', async () => {
            const response = await request.get('/api/images?filename=' + fileName + '&width');
            expect(response.status).toBe(422);
            expect(response.text).toMatch(/width error(.*)height error/);
            expect(response.text).not.toMatch(/filename error/);
           
        }
    );

    it('test incorrect params - width 0', async () => {
            const response = await request.get('/api/images?filename=' + fileName + '&width=0&height=1000');
            expect(response.status).toBe(422);
            expect(response.text).toMatch(/width error/);
            expect(response.text).not.toMatch(/filename error/);
            expect(response.text).not.toMatch(/height error/);
        }
    );

    it('test incorrect params - height too large', async () => {
            const response = await request.get('/api/images?filename=' + fileName + '&width=10&height=3000');
            expect(response.status).toBe(422);
            expect(response.text).toMatch(/height error/);
            expect(response.text).not.toMatch(/filename error/);
            expect(response.text).not.toMatch(/width error/);
        }
    );

    it('test file does not exist', async () => {

            const spy = spyOnProperty(resizerConfig, 'inputPath', 'get').and.returnValue(inputPath);
            expect(resizerConfig.inputPath).toBe(inputPath);

            const response = await request.get('/api/images?filename=image2&width=100&height=100');
            expect(response.status).toBe(500);
            expect(response.text).toMatch(/Input file is missing/);
            expect(response.text).not.toMatch(/height error/);
            expect(response.text).not.toMatch(/filename error/);
            expect(response.text).not.toMatch(/width error/);
            expect(spy).toHaveBeenCalled();
        }
    );
});


