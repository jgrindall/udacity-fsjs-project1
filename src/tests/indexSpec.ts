import ResizerFactory from ".././utilities/ResizerFactory";
import supertest from "supertest";
import app from "../index";
import sizeOf from "buffer-image-size";
import {afterAllHandler, afterEachHandler, beforeAllHandler, inputPath, outputPath, fileName} from "./helpers/testutils";
import {Resizer} from "../utilities/Resizer";

const request = supertest(app);

describe("Test endpoint success", async () => {

    beforeAll(beforeAllHandler);
    afterAll(afterAllHandler);
    afterEach(afterEachHandler);

    it("test file simplest example", async () => {
        const spy = spyOn(ResizerFactory, "getResizer").and.returnValue(new Resizer(inputPath, outputPath));
        const response = await request.get("/api/images?filename=image1&width=100&height=100");
        expect(spy).toHaveBeenCalled();
        expect(response.status).toBe(201);
        expect(response.body as Buffer).toBeTruthy();
        const dimensions = sizeOf(response.body as Buffer);
        expect(dimensions.width).toEqual(100);
        expect(dimensions.height).toEqual(100);
        expect(response.headers["content-type"]).toEqual("image/jpg");
    });

    it("test file simplest example", async () => {
        const spy = spyOn(ResizerFactory, "getResizer").and.returnValue(new Resizer(inputPath, outputPath));
        const response = await request.get("/api/images?filename=image1&width=100&height=100");
        expect(response.status).toBe(201);
        expect(response.headers["content-type"]).toEqual("image/jpg");
        const dimensions = sizeOf(response.body as Buffer);
        expect(dimensions.width).toEqual(100);
        expect(dimensions.height).toEqual(100);
        expect(spy).toHaveBeenCalled();

        const response2 = await request.get("/api/images?filename=image1&width=100&height=100");
        expect(response2.status).toBe(200);
        expect(response2.headers["content-type"]).toEqual("image/jpg");
        const dimensions2 = sizeOf(response2.body as Buffer);
        expect(dimensions2.width).toEqual(100);
        expect(dimensions2.height).toEqual(100);

        const response3 = await request.get("/api/images?filename=image1&width=100&height=100");
        expect(response3.status).toBe(200);
        expect(response3.headers["content-type"]).toEqual("image/jpg");
        const dimensions3 = sizeOf(response3.body as Buffer);
        expect(dimensions3.width).toEqual(100);
        expect(dimensions3.height).toEqual(100);
    });

});

describe("Test endpoint errors", () => {

    beforeAll(beforeAllHandler);
    afterAll(afterAllHandler);
    afterEach(afterEachHandler);

    it("test missing params - filename", async () => {
            const response = await request.get("/api/images");
            expect(response.statusCode).toBe(422);
            expect(response.text).toMatch(/filename error(.*)width error(.*)height error/);
        }
    );

    it("test missing params - w/h", async () => {
            const response = await request.get("/api/images?filename=" + fileName);
            expect(response.status).toBe(422);
            expect(response.text).toMatch(/width error(.*)height error/);
            expect(response.text).not.toMatch(/filename error/);
        }
    );

    it("test missing params - width/height", async () => {
            const response = await request.get("/api/images?filename=" + fileName + "&width");
            expect(response.status).toBe(422);
            expect(response.text).toMatch(/width error(.*)height error/);
            expect(response.text).not.toMatch(/filename error/);
           
        }
    );

    it("test incorrect params - width 0", async () => {
            const response = await request.get("/api/images?filename=" + fileName + "&width=0&height=1000");
            expect(response.status).toBe(422);
            expect(response.text).toMatch(/width error/);
            expect(response.text).not.toMatch(/filename error/);
            expect(response.text).not.toMatch(/height error/);
        }
    );

    it("test incorrect params - height too large", async () => {
            const response = await request.get("/api/images?filename=" + fileName + "&width=10&height=3000");
            expect(response.status).toBe(422);
            expect(response.text).toMatch(/height error/);
            expect(response.text).not.toMatch(/filename error/);
            expect(response.text).not.toMatch(/width error/);
        }
    );

    it("test file does not exist", async () => {
            const spy = spyOn(ResizerFactory, "getResizer").and.returnValue(new Resizer(inputPath, outputPath));
            const response = await request.get("/api/images?filename=image2&width=100&height=100");
            expect(response.status).toBe(500);
            expect(response.text).toMatch(/Input file is missing/);
            expect(response.text).not.toMatch(/height error/);
            expect(response.text).not.toMatch(/filename error/);
            expect(response.text).not.toMatch(/width error/);
            expect(spy).toHaveBeenCalled();
        }
    );
});


