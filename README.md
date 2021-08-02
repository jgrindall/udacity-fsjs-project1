Commands:
----
- Start dev server
    - npm run start
    
- Build (to dist folder)
    - npm run build
    
- Run tests
    - npm run test
    
- Run lint
    - npm run tslint
        
- Run production server
    - npm run prod    


Example URLS to test in browser:
----

    - localhost:3000/api/images?filename=fjord&width=100&height=100 (201 status code OK)
    
    - localhost:3000/api/images?filename=fjord&width=100&height=100 (200 status code - cached OK)
    
    - localhost:3000/api/images?filename=fjord&width=0&height=100 (500 - error, width <= 0)
    
    - localhost:3000/api/images?filename=fjord&width=100&height=10000 (500 - error, height > 2048)
    
    - localhost:3000/api/images?filename=nothere&width=100&height=100 (500 - error, image not found)
    
    
API:
----

/api/images:
    get:
        description: Gets a resized image
        parameters:
            filename:
                required: true
                type: string
                description: The name of the image
                in: query
            width:
                required: true
                type: number in [1...2048]
                description: The desired width
                in: query
            height:
                required: true
                type: number in [1...2048]
                description: The desired height
                in: query
        produces:
            image/jpg  
        responses:
            200:
                description: OK (returned fron cache)
            201:
                description: OK (created new image)
            422:
                description: Incorrect input
            500:
                description: Error (file not found)
                
                
                
          

Notes:
-------

- This code handles only .jpg files.  .jpeg, .JPG, .png etc are not supported.

- Input files are in the folder ./assets.

- Output files are in the folder ./assets/out. They are stored in the format <filename>@<width>x<height>.jpg. Eg. fjord@100x100.jpg

- 200 status code is returned if the image is served from cache and 201 otherwise (new image created)

- 422 if parameters are incorrect

- 500 if image is not found

- I have removed prettier from the config - I am using only tslint. See git history for my prettier config. It does not play nicely with the coding standard I use (nor the one used by my team at work)
 
Notable files for code review:
----

- Main application:
    - src/routes/api/index.ts
    - src/utilities/Resizer.ts
 
- Middleware:
    - src\routes\middleware\logger.ts
    - src\routes\middleware\validator.ts - validates query params using "express-validator"
   
- Tests:
    - src/tests/indexSpec.ts - uses supertest for endpoint testing and caching
    - src/tests/utilities/ResizerSpec.ts - tests sharp Resizing code and caching
    - src/tests/utilities/FileUtilsSpec.ts - tests utils
    
   





