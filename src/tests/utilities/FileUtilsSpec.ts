import {getExtension, getFilename} from "../../utilities/FileUtils";

describe("test fileutils", () => {

    it("test getExtension", () => {
        expect(getExtension("a.jpg")).toEqual("jpg");
        expect(getExtension(" a .jpg")).toEqual("jpg");
        expect(getExtension("a.test.jpg")).toEqual("jpg");
        expect(getExtension("a...jpg")).toEqual("jpg");
        expect(getExtension(".test.jpg")).toEqual("jpg");
    });

    it("test getFilename", () => {
        expect(getFilename("a.jpg")).toEqual("a");
        expect(getFilename(" a .jpg")).toEqual(" a ");
        expect(getFilename("a.test.jpg")).toEqual("a.test");
        expect(getFilename("a...jpg")).toEqual("a..");
        expect(getFilename(".test.jpg")).toEqual(".test");
    });

});
