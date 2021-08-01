import resizerConfig from ".././utilities/ResizerConfig";
import supertest from 'supertest';
import app from '../index';

/**

const request = supertest(app);

describe("newArr test", ()=>{

    it('make a new array containing 3', () => {
        const spy = spyOnProperty(resizerConfig, 'inputPath', 'get').and.returnValue("apples"); // to stub and return 1 or any value as needed.
        expect(resizerConfig.inputPath).toBe("apples");
        expect(spy).toHaveBeenCalled();
    });

});


describe('Test endpoint responses', () => {
    it('gets the api endpoint', async (done) => {
            const response = await request.get('/api');
            expect(response.status).toBe(200);
            done();
        }
    )});
**/