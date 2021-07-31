import newArr from '../index';

describe("newArr test", ()=>{

    const wordArr = ['cat', 'dog', 'rabbit', 'bird'];

    it('should make a new array containing dog', () => {
        expect(newArr(3, wordArr)).toContain('dog');
    });
    it('make a new array containing 3', () => {
        expect(newArr(3, wordArr)).toContain(3);
    });


});

/**
February 2017, they merged a PR adding this feature, they released in April 2017.

so to spy on getters/setters you use: const spy = spyOnProperty(myObj, 'myGetterName', 'get'); where myObj is your instance, 'myGetterName' is the name of that one defined in your class as get myGetterName() {} and the third param is the type get or set.

    You can use the same assertions that you already use with the spies created with spyOn.

    So you can for example:

const spy = spyOnProperty(myObj, 'myGetterName', 'get'); // to stub and return nothing. Just spy and stub.
const spy = spyOnProperty(myObj, 'myGetterName', 'get').and.returnValue(1); // to stub and return 1 or any value as needed.
const spy = spyOnProperty(myObj, 'myGetterName', 'get').and.callThrough(); // Call the real thing.
Here's the line in the github source code where this method is available if you are interested.

https://github.com/jasmine/jasmine/blob/7f8f2b5e7a7af70d7f6b629331eb6fe0a7cb9279/src/core/requireInterface.js#L199

    And the spyOnProperty method is here

Answering the original question, with jasmine 2.6.1, you would:

    const spy = spyOnProperty(myObj, 'valueA', 'get').andReturn(1);
expect(myObj.valueA).toBe(1);
expect(spy).toHaveBeenCalled();
 **/