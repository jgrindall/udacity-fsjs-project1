import resizerConfig from ".././utilities/ResizerConfig";
import supertest from 'supertest';
import app from '../index';
import {afterAllHandler, afterEachHandler, beforeAllHandler} from "./helpers/testutils";

const request = supertest(app);

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
            const response = await request.get('/api/images?filename=hello');
            expect(response.status).toBe(422);
            expect(response.text).toMatch(/width error(.*)height error/);
            expect(response.text).not.toMatch(/filename error/);
        }
    );

    it('test missing params - width/height', async () => {
            const response = await request.get('/api/images?filename=in&width');
            expect(response.status).toBe(422);
            expect(response.text).toMatch(/width error(.*)height error/);
            expect(response.text).not.toMatch(/filename error/);
           
        }
    );

    it('test incorrect params - width 0', async () => {
            const response = await request.get('/api/images?filename=in&width=0&height=1000');
            expect(response.status).toBe(422);
            expect(response.text).toMatch(/width error/);
            expect(response.text).not.toMatch(/filename error/);
            expect(response.text).not.toMatch(/height error/);
        }
    );

    it('test incorrect params - height too large', async () => {
            const response = await request.get('/api/images?filename=in&width=10&height=3000');
            expect(response.status).toBe(422);
            expect(response.text).toMatch(/height error/);
            expect(response.text).not.toMatch(/filename error/);
            expect(response.text).not.toMatch(/width error/);
        }
    );

    it('test file does not exist', async () => {
            const response = await request.get('/api/images?filename=in&width=10&height=3000');
            expect(response.status).toBe(422);
            expect(response.text).toMatch(/height error/);
            expect(response.text).not.toMatch(/filename error/);
            expect(response.text).not.toMatch(/width error/);
        }
    );
});

describe('Test endpoint success', () => {

});

/**
 *
 *

 //const spy = spyOnProperty(resizerConfig, 'inputPath', 'get').and.returnValue("apples"); // to stub and return 1 or any value as needed.
 //expect(resizerConfig.inputPath).toBe("apples");
 //expect(spy).toHaveBeenCalled();
 //const spy = spyOnProperty(resizerConfig, 'inputPath', 'get').and.returnValue("apples"); // to stub and return 1 or any value as needed.
 //expect(resizerConfig.inputPath).toBe("apples");
 //expect(spy).toHaveBeenCalled();
 //spyOn(myApp, "reallyImporatantProcess");

**/